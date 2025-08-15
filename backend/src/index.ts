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
      // Create sample data if deals collection is empty
      const dealCount = await strapi.entityService.count('api::deal.deal');
      
      if (dealCount === 0) {
        console.log('Creating sample deals...');
        
        const sampleDeals = [
          {
            title: 'Gaming Laptop Deal',
            description: 'High-performance gaming laptop with RTX graphics card',
            price: 899.99,
            originalPrice: 1299.99,
            discount: 31,
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

      console.log('🎉 Bootstrap completed successfully');
    } catch (error) {
      console.error('Bootstrap error:', error.message);
    }
  },
};
