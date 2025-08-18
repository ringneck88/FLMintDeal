// This file will run during Strapi bootstrap to import the migrated data

module.exports = async ({ strapi }) => {
  try {
    console.log('🔄 Starting data migration...');

    // Check if data already exists to avoid duplicates
    const existingDeals = await strapi.db.query('api::deal.deal').findMany();
    const existingAdminUsers = await strapi.db.query('admin::user.user').findMany();

    if (existingDeals.length > 0 || existingAdminUsers.length > 0) {
      console.log('📋 Data already exists, skipping migration');
      return;
    }

    console.log('📦 Importing admin user...');
    
    // Import admin user
    await strapi.db.query('admin::user.user').create({
      data: {
        firstname: 'Kelly',
        lastname: 'Sharp',
        email: 'kelly@phiti.com',
        username: null,
        password: '$2a$10$TK/HZYMmPBH243G2VGeon.qpOmim6h/Qw3OmdGQecchLQqsWmeNse',
        isActive: true,
        blocked: false,
        roles: [1] // Super Admin role
      }
    });

    console.log('🛍️ Importing deals...');

    // Import deals data
    const dealsData = [
      {
        title: 'Gaming Laptop Deal',
        description: 'High-performance gaming laptop with RTX graphics card',
        price: 899.99,
        originalPrice: 1299.99,
        discount: 30,
        category: 'Electronics',
        featured: true
      },
      {
        title: 'Wireless Headphones',
        description: 'Premium noise-canceling wireless headphones', 
        price: 149.99,
        originalPrice: 249.99,
        discount: 40,
        category: 'Electronics',
        featured: false
      },
      {
        title: 'Smart Watch',
        description: 'Fitness tracking smart watch with heart rate monitor',
        price: 199.99,
        originalPrice: 299.99,
        discount: 33,
        category: 'Electronics',
        featured: true
      }
    ];

    for (const dealData of dealsData) {
      await strapi.db.query('api::deal.deal').create({
        data: dealData
      });
    }

    console.log('✅ Data migration completed successfully!');
    console.log(`   - Imported 1 admin user`);
    console.log(`   - Imported ${dealsData.length} deals`);

  } catch (error) {
    console.error('❌ Error during data migration:', error);
  }
};