// Script to set up development database with proper admin user
const strapi = require('@strapi/strapi');

async function setupDevDatabase() {
  try {
    console.log('🔧 Setting up development database...');
    
    // Initialize Strapi
    const app = await strapi().load();
    
    // Check current admin users
    const adminUsers = await strapi.db.query('admin::user.user').findMany();
    console.log(`👤 Found ${adminUsers.length} admin users`);
    
    if (adminUsers.length === 0) {
      console.log('🆕 Creating first admin user...');
      
      // Create admin user
      const adminUser = await strapi.db.query('admin::user.user').create({
        data: {
          firstname: 'Kelly',
          lastname: 'Sharp',
          email: 'kelly@phiti.com',
          password: await strapi.admin.services.auth.hashPassword('admin123'),
          isActive: true,
          blocked: false,
          roles: [1] // Super Admin role
        }
      });
      
      console.log('✅ Admin user created!');
      console.log('📧 Email: kelly@phiti.com');
      console.log('🔑 Password: admin123');
    } else {
      console.log('🔄 Updating existing admin user password...');
      
      // Update the first admin user's password
      const firstAdmin = adminUsers[0];
      await strapi.db.query('admin::user.user').update({
        where: { id: firstAdmin.id },
        data: {
          password: await strapi.admin.services.auth.hashPassword('admin123'),
          email: 'kelly@phiti.com',
          isActive: true,
          blocked: false
        }
      });
      
      console.log('✅ Admin user updated!');
      console.log('📧 Email: kelly@phiti.com');
      console.log('🔑 Password: admin123');
    }
    
    // Check deals
    const deals = await strapi.entityService.findMany('api::deal.deal');
    console.log(`🛍️ Found ${deals.length} deals in database`);
    
    if (deals.length === 0) {
      console.log('📦 Creating sample deals...');
      
      const sampleDeals = [
        {
          title: 'Gaming Laptop Deal',
          description: 'High-performance gaming laptop with RTX graphics card',
          price: 899.99,
          originalPrice: 1299.99,
          discount: 30,
          category: 'Electronics',
          featured: true,
          publishedAt: new Date()
        },
        {
          title: 'Wireless Headphones',
          description: 'Premium noise-canceling wireless headphones',
          price: 149.99,
          originalPrice: 249.99,
          discount: 40,
          category: 'Electronics',
          featured: false,
          publishedAt: new Date()
        },
        {
          title: 'Smart Watch',
          description: 'Fitness tracking smart watch with heart rate monitor',
          price: 199.99,
          originalPrice: 299.99,
          discount: 33,
          category: 'Electronics',
          featured: true,
          publishedAt: new Date()
        }
      ];

      for (const deal of sampleDeals) {
        await strapi.entityService.create('api::deal.deal', {
          data: deal
        });
      }

      console.log(`✅ Created ${sampleDeals.length} sample deals`);
    }
    
    console.log('🎉 Development database setup complete!');
    console.log('🌐 You can now log in at: https://flmintdeal-dev.fly.dev/admin');
    
    await app.destroy();
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  setupDevDatabase();
}