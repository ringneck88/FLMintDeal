// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      console.log('🚀 Setting up admin user, Deal permissions and sample data...');

      // Wait a moment for all plugins to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if admin user exists, create one if not
      const adminUsers = await strapi.db.query('admin::user.user').findMany();
      console.log(`👤 Found ${adminUsers.length} admin users`);
      
      if (adminUsers.length === 0) {
        console.log('🔧 Creating first admin user...');
        try {
          const adminUser = await strapi.db.query('admin::user.user').create({
            data: {
              firstname: 'Kelly',
              lastname: 'Sharp',
              email: 'kelly@phiti.com',
              password: await strapi.admin.services.auth.hashPassword('admin123'),
              isActive: true,
              blocked: false,
              roles: [1] // Super Admin role ID
            }
          });
          console.log('✅ Admin user created successfully!');
          console.log('📧 Email: kelly@phiti.com');
          console.log('🔑 Password: admin123');
        } catch (error) {
          console.log('⚠️ Admin user creation failed:', error.message);
        }
      } else {
        console.log('✅ Admin users already exist');
      }

      // Set up public permissions for Deal API
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' }
      });

      if (publicRole) {
        console.log('📋 Setting up public permissions for Deal API...');
        
        // Find or create permissions for Deal API
        const dealPermissions = [
          'api::deal.deal.find',
          'api::deal.deal.findOne'
        ];

        for (const action of dealPermissions) {
          const existingPermission = await strapi.query('plugin::users-permissions.permission').findOne({
            where: { action, role: publicRole.id }
          });

          if (!existingPermission) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action,
                role: publicRole.id,
                enabled: true
              }
            });
            console.log(`✅ Created permission: ${action}`);
          } else {
            await strapi.query('plugin::users-permissions.permission').update({
              where: { id: existingPermission.id },
              data: { enabled: true }
            });
            console.log(`✅ Updated permission: ${action}`);
          }
        }
      }

      // Create sample data if deals collection is empty
      const dealCount = await strapi.entityService.count('api::deal.deal');
      
      if (dealCount === 0) {
        console.log('📦 Creating sample deals...');
        
        // Your original deals data from SQLite migration
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

      console.log('🎉 Bootstrap completed successfully - Deal API should now be accessible!');
    } catch (error) {
      console.error('Bootstrap error:', error.message);
    }
  },
};
