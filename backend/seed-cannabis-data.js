const strapi = require('@strapi/strapi');

async function seedData() {
  const app = strapi({ distDir: './dist' });
  await app.load();
  await app.start();

  console.log('🌱 Starting to seed cannabis product data...');

  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await strapi.db.query('api::dosage-product.dosage-product').deleteMany({});
    await strapi.db.query('api::dosage-form.dosage-form').deleteMany({});
    await strapi.db.query('api::unit-type.unit-type').deleteMany({});
    await strapi.db.query('api::cannaboid-type.cannaboid-type').deleteMany({});
    await strapi.db.query('api::ingredient.ingredient').deleteMany({});

    // Create Unit Types
    console.log('Creating unit types...');
    const gramUnit = await strapi.db.query('api::unit-type.unit-type').create({
      data: {
        unitType: 'Gram',
        publishedAt: new Date()
      }
    });

    const milligramUnit = await strapi.db.query('api::unit-type.unit-type').create({
      data: {
        unitType: 'MilliGram', 
        publishedAt: new Date()
      }
    });

    // Create Cannaboid Types
    console.log('Creating cannaboid types...');
    const thcType = await strapi.db.query('api::cannaboid-type.cannaboid-type').create({
      data: {
        Title: 'THC',
        Description: null,
        slug: null,
        publishedAt: new Date()
      }
    });

    // Create Dosage Forms
    console.log('Creating dosage forms...');
    const inhalationForm = await strapi.db.query('api::dosage-form.dosage-form').create({
      data: {
        Title: 'Inhalation',
        Description: 'Serving size for inhalants is a three (3) second inhale. Please note THC and CBD content will vary by strain. Please see the Patient label for testing results and consult your doctor on what is the right dose for you.',
        SEO_Title_Slug: 'inhalation',
        publishedAt: new Date()
      }
    });

    const sublinalForm = await strapi.db.query('api::dosage-form.dosage-form').create({
      data: {
        Title: 'Sublingal',
        Description: 'Enclosed dropper is marked at 0.25mL increments. The maximum amount the dropper can hold is 1mL. The recommended serving size is 0.5mL. Please use as directed and determine with your doctor if the directed serving size is right for you.',
        SEO_Title_Slug: 'sublingal',
        publishedAt: new Date()
      }
    });

    const oralCapsuleForm = await strapi.db.query('api::dosage-form.dosage-form').create({
      data: {
        Title: 'Oral Capsule',
        Description: 'The serving size is one (1) capsule. Please use as directed and determine with your doctor if the directed serving size is right for you.',
        SEO_Title_Slug: 'oral-capsule',
        publishedAt: new Date()
      }
    });

    const ediblesForm = await strapi.db.query('api::dosage-form.dosage-form').create({
      data: {
        Title: 'Edibles',
        Description: 'Serving Size is one (1) piece or one (1) individually wrapped packet. Please use as directed and determine with your doctor if the directed serving size is right for you.',
        SEO_Title_Slug: 'edibles',
        publishedAt: new Date()
      }
    });

    // Create Ingredients
    console.log('Creating ingredients...');
    const cannabisOil = await strapi.db.query('api::ingredient.ingredient').create({
      data: {
        Name: 'Cannabis Oil',
        slug: 'cannabis-oil',
        Description: null,
        publishedAt: new Date()
      }
    });

    const terpenes = await strapi.db.query('api::ingredient.ingredient').create({
      data: {
        Name: 'Terpenes',
        slug: 'terpenes-1',
        Description: null,
        publishedAt: new Date()
      }
    });

    const cannabisFlower = await strapi.db.query('api::ingredient.ingredient').create({
      data: {
        Name: 'Cannabis Flower',
        slug: 'cannabis-flower', 
        Description: 'Cannabis Flower',
        publishedAt: new Date()
      }
    });

    const mctOil = await strapi.db.query('api::ingredient.ingredient').create({
      data: {
        Name: 'Medium Chain Triglycerides',
        slug: 'medium-chain-triglycerides',
        Description: null,
        publishedAt: new Date()
      }
    });

    const hpmcCapsules = await strapi.db.query('api::ingredient.ingredient').create({
      data: {
        Name: 'HPMC Capsules',
        slug: 'hpmc-capsules',
        Description: 'HPMC Capsules',
        publishedAt: new Date()
      }
    });

    // Create Cannabis Products
    console.log('Creating cannabis products...');

    // All in One - Distillate
    await strapi.db.query('api::dosage-product.dosage-product').create({
      data: {
        Name: 'All in One - Distillate',
        Description: 'All in One - Distillate',
        Quanity: 2,
        unit_type: gramUnit.id,
        cannaboid_type: thcType.id,
        dosage_form: inhalationForm.id,
        ingredients: [cannabisOil.id, terpenes.id],
        publishedAt: new Date()
      }
    });

    // Bubble Hash
    await strapi.db.query('api::dosage-product.dosage-product').create({
      data: {
        Name: 'Bubble Hash',
        Description: 'Bubble Hash',
        Quanity: 1,
        unit_type: gramUnit.id,
        cannaboid_type: thcType.id,
        dosage_form: inhalationForm.id,
        ingredients: [cannabisOil.id],
        publishedAt: new Date()
      }
    });

    // Preroll - 1g
    await strapi.db.query('api::dosage-product.dosage-product').create({
      data: {
        Name: 'Preroll - 1g',
        Description: 'Preroll - 1g',
        Quanity: 1,
        unit_type: gramUnit.id,
        cannaboid_type: thcType.id,
        dosage_form: inhalationForm.id,
        ingredients: [cannabisFlower.id],
        publishedAt: new Date()
      }
    });

    // Rosin Sauce
    await strapi.db.query('api::dosage-product.dosage-product').create({
      data: {
        Name: 'Rosin Sauce',
        Description: 'Rosin Sauce',
        Quanity: 1,
        unit_type: gramUnit.id,
        cannaboid_type: thcType.id,
        dosage_form: inhalationForm.id,
        ingredients: [cannabisOil.id],
        publishedAt: new Date()
      }
    });

    // THC Capsules 30 Capsules
    await strapi.db.query('api::dosage-product.dosage-product').create({
      data: {
        Name: 'THC Capsules 30 Capsules',
        Description: 'THC Capsules 30 Capsules',
        Quanity: 10,
        unit_type: milligramUnit.id,
        cannaboid_type: thcType.id,
        dosage_form: oralCapsuleForm.id,
        ingredients: [cannabisOil.id, mctOil.id, hpmcCapsules.id],
        publishedAt: new Date()
      }
    });

    console.log('✅ Successfully seeded cannabis product data!');
    console.log('📊 Created:');
    console.log('  - 2 Unit Types (Gram, MilliGram)');
    console.log('  - 1 Cannaboid Type (THC)');
    console.log('  - 4 Dosage Forms (Inhalation, Sublingual, Oral Capsule, Edibles)');
    console.log('  - 5 Ingredients');
    console.log('  - 5 Cannabis Products');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }

  await app.destroy();
  process.exit(0);
}

seedData();