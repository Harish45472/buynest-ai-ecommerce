import api from './client';

/**
 * Decoupled Product Service Layer for BUYNEST
 * Provides standardized methods for fetching, filtering, and retrieving products.
 * This abstraction layer allows seamless drop-in replacement with real external e-commerce
 * APIs (Shopify, WooCommerce, Medusa, or custom headless APIs) without touching frontend components.
 */

export const productService = {
  /**
   * Fetch products with multi-faceted filtering and sorting
   */
  async getProducts(filterParams = {}) {
    const response = await api.get('/products', { params: filterParams });
    return {
      products: response.data.products || [],
      total: response.data.total || 0
    };
  },

  /**
   * Fetch single product with complementary related products
   */
  async getProductById(productId) {
    const response = await api.get(`/products/${productId}`);
    return {
      product: response.data.product || null,
      related: response.data.related || []
    };
  },

  /**
   * Fetch dynamic filter facets (brands, subcategories, price bounds)
   */
  async getFacets(category = 'all') {
    const params = category && category !== 'all' ? { category } : {};
    const response = await api.get('/products/facets', { params });
    return {
      brands: response.data.brands || [],
      subCategories: response.data.subCategories || [],
      priceRange: response.data.priceRange || { min: 0, max: 100000 }
    };
  },

  /**
   * Fetch "Frequently Bought Together" bundle with bundle discount
   */
  async getBundle(productId) {
    const response = await api.get(`/products/${productId}/bundle`);
    return response.data;
  },

  /**
   * Fetch AI similar recommendations
   */
  async getSimilarRecommendations(productId) {
    const response = await api.get(`/ai/recommend-similar/${productId}`);
    return response.data.products || [];
  }
};

export default productService;
