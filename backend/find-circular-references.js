#!/usr/bin/env node

/**
 * Find Circular References in Content Types
 * Identify circular dependencies that cause stack overflow in admin permissions
 */

const fs = require('fs');
const path = require('path');

function findCircularReferences() {
  console.log('🔍 Finding Circular References in Content Types');
  console.log('==============================================\n');

  // Get all content type schemas
  const contentTypesDir = path.join(__dirname, 'src', 'api');
  const componentsDir = path.join(__dirname, 'src', 'components');

  const contentTypes = {};
  const components = {};

  // Load content types
  if (fs.existsSync(contentTypesDir)) {
    const apiDirs = fs.readdirSync(contentTypesDir);
    apiDirs.forEach(apiDir => {
      const schemaPath = path.join(contentTypesDir, apiDir, 'content-types', apiDir, 'schema.json');
      if (fs.existsSync(schemaPath)) {
        try {
          const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
          contentTypes[`api::${apiDir}.${apiDir}`] = schema;
          console.log(`📄 Loaded content type: api::${apiDir}.${apiDir}`);
        } catch (e) {
          console.log(`❌ Failed to load ${schemaPath}: ${e.message}`);
        }
      }
    });
  }

  // Load components
  if (fs.existsSync(componentsDir)) {
    const walkComponents = (dir, prefix = '') => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
          walkComponents(itemPath, prefix + item + '.');
        } else if (item.endsWith('.json')) {
          try {
            const schema = JSON.parse(fs.readFileSync(itemPath, 'utf8'));
            const componentName = prefix + path.basename(item, '.json');
            components[componentName] = schema;
            console.log(`🧩 Loaded component: ${componentName}`);
          } catch (e) {
            console.log(`❌ Failed to load ${itemPath}: ${e.message}`);
          }
        }
      });
    };
    walkComponents(componentsDir);
  }

  console.log(`\n📊 Summary: ${Object.keys(contentTypes).length} content types, ${Object.keys(components).length} components\n`);

  // Build relationship graph
  const relationships = new Map();

  const addRelationship = (from, to, type) => {
    if (!relationships.has(from)) {
      relationships.set(from, []);
    }
    relationships.get(from).push({ to, type });
  };

  // Analyze content types
  Object.entries(contentTypes).forEach(([typeName, schema]) => {
    console.log(`🔍 Analyzing ${typeName}:`);

    if (schema.attributes) {
      Object.entries(schema.attributes).forEach(([attrName, attr]) => {
        if (attr.type === 'relation' && attr.target) {
          console.log(`   → ${attr.target} (${attr.relation})`);
          addRelationship(typeName, attr.target, `relation:${attr.relation}`);
        } else if (attr.type === 'component' && attr.component) {
          console.log(`   → ${attr.component} (component)`);
          addRelationship(typeName, attr.component, 'component');
        }
      });
    }
    console.log('');
  });

  // Analyze components
  Object.entries(components).forEach(([componentName, schema]) => {
    console.log(`🔍 Analyzing component ${componentName}:`);

    if (schema.attributes) {
      Object.entries(schema.attributes).forEach(([attrName, attr]) => {
        if (attr.type === 'relation' && attr.target) {
          console.log(`   → ${attr.target} (${attr.relation})`);
          addRelationship(componentName, attr.target, `relation:${attr.relation}`);
        } else if (attr.type === 'component' && attr.component) {
          console.log(`   → ${attr.component} (component)`);
          addRelationship(componentName, attr.component, 'component');
        }
      });
    }
    console.log('');
  });

  // Detect cycles using DFS
  console.log('🔄 Detecting Circular References:\n');

  const visited = new Set();
  const recursionStack = new Set();
  const cycles = [];

  const detectCycle = (node, path = []) => {
    if (recursionStack.has(node)) {
      // Found a cycle
      const cycleStart = path.indexOf(node);
      const cycle = path.slice(cycleStart);
      cycle.push(node);
      cycles.push(cycle);
      return true;
    }

    if (visited.has(node)) {
      return false;
    }

    visited.add(node);
    recursionStack.add(node);
    path.push(node);

    const relations = relationships.get(node) || [];
    for (const relation of relations) {
      if (detectCycle(relation.to, [...path])) {
        // Continue to find all cycles
      }
    }

    recursionStack.delete(node);
    return false;
  };

  // Check all nodes
  for (const node of [...Object.keys(contentTypes), ...Object.keys(components)]) {
    if (!visited.has(node)) {
      detectCycle(node);
    }
  }

  if (cycles.length === 0) {
    console.log('✅ No circular references found!');
  } else {
    console.log(`❌ Found ${cycles.length} circular reference(s):\n`);
    cycles.forEach((cycle, index) => {
      console.log(`   ${index + 1}. ${cycle.join(' → ')}`);
    });

    console.log('\n🔧 These circular references likely cause the "Maximum call stack size exceeded" error.');
    console.log('   Consider breaking the cycles by:');
    console.log('   - Removing unnecessary bidirectional relations');
    console.log('   - Using unidirectional relations where possible');
    console.log('   - Restructuring component hierarchies');
  }

  console.log('\n📋 Full Relationship Map:');
  relationships.forEach((relations, from) => {
    console.log(`   ${from}:`);
    relations.forEach(rel => {
      console.log(`     → ${rel.to} (${rel.type})`);
    });
  });
}

findCircularReferences();