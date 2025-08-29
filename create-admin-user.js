const strapi = require('@strapi/strapi');

async function createAdminUser() {
  const app = strapi({ distDir: './dist' });
  await app.load();
  await app.start();

  console.log('Creating admin user...');
  
  try {
    // Check if admin user already exists
    const existingAdmin = await strapi.db.query('admin::user').findOne({
      where: { email: 'admin@flmintdeal.com' }
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      await app.destroy();
      return;
    }

    // Create new admin user
    const adminUser = await strapi.db.query('admin::user').create({
      data: {
        firstname: 'Admin',
        lastname: 'User',
        email: 'admin@flmintdeal.com',
        password: await strapi.service('admin::auth').hashPassword('FLMintDeal2024!'),
        isActive: true,
        blocked: false,
        preferedLanguage: 'en'
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@flmintdeal.com');
    console.log('🔐 Password: FLMintDeal2024!');
    console.log('🌐 Login at: https://flmintdeal-dev.fly.dev/admin');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }

  await app.destroy();
  process.exit(0);
}

createAdminUser();
