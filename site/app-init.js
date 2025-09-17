let allProducts = [];

// === Your exact init (names unchanged) ===
async function fetchProducts() {
  const response = await fetch('https://dummyjson.com/products?limit=0');
  const data = await response.json();
  allProducts = data.products || [];

  // expose for main script functions that read window.allProducts
  window.allProducts = allProducts;

  const categories = ['groceries', 'womens-jewellery'];
  const displayCategoryProducts = allProducts.filter(p =>
    categories.includes(p.category)
  );

  // Call section functions (must be loaded before this file)
  displayLightningProducts(displayCategoryProducts); // main
  setupHeaderFromProducts(allProducts);              // header
  startBannerSameDiscount(allProducts);              // banner
  displayFirstProducts();                            // main
  startShowMoreButton();                             // main
  updateShowMoreButton();                            // main
}

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts().catch(console.error);
});
