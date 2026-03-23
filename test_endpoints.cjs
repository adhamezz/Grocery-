const axios = require('axios');

const BASE_URL = 'https://grocery.newcinderella.online';
const credentials = {
  login: 'abanoubtalaat5252@gmail.com',
  password: 'P@ssword12'
};

async function testEndpoints() {
  console.log('--- STARTING ENDPOINT TEST ---');
  let token;

  // 1. LOGIN
  try {
    const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
    token = loginRes.data.token || loginRes.data.data?.token;
    console.log('✅ LOGIN: Success');
  } catch (err) {
    console.error('❌ LOGIN: Failed', err.response?.data || err.message);
    return;
  }

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // 2. GET BEST SELLS
  try {
    console.log('\nTesting Home API...');
    const bestSells = await axios.get(`${BASE_URL}/api/best-sells`, authHeader);
    console.log(`✅ GET BEST SELLS: Success (${bestSells.data?.products?.length || 0} items)`);
  } catch (err) {
    console.error('❌ GET BEST SELLS: Failed', err.response?.data || err.message);
  }

  // 3. GET HOT DEALS
  try {
    const hotDeals = await axios.get(`${BASE_URL}/api/meals/hot`, authHeader);
    console.log(`✅ GET HOT DEALS: Success (${hotDeals.data?.products?.length || 0} items)`);
  } catch (err) {
    console.error('❌ GET HOT DEALS: Failed', err.response?.data || err.message);
  }

  // 4. GET NEW PRODUCTS
  try {
    const newProducts = await axios.get(`${BASE_URL}/api/new-products`, authHeader);
    console.log(`✅ GET NEW PRODUCTS: Success (${newProducts.data?.products?.length || 0} items)`);
  } catch (err) {
    console.error('❌ GET NEW PRODUCTS: Failed', err.response?.data || err.message);
  }

  // 5. CART OPERATIONS
  console.log('\nTesting Cart API...');
  
  // A. CLEAR CART (Start fresh)
  try {
    await axios.delete(`${BASE_URL}/api/cart/clear`, authHeader);
    console.log('✅ DELETE CLEAR CART: Success');
  } catch (err) {
    console.warn('⚠️ DELETE CLEAR CART: Failed (Might be empty already)', err.response?.data || err.message);
  }

  // B. ADD ITEM
  let cartItemId;
  try {
    const addRes = await axios.post(`${BASE_URL}/api/cart/items`, { meal_id: 1, quantity: 1 }, authHeader);
    console.log('✅ POST ADD ITEM: Success');
    // Note: Checking where ID is returned
    cartItemId = addRes.data.id || addRes.data.data?.id;
  } catch (err) {
    console.error('❌ POST ADD ITEM: Failed', err.response?.data || err.message);
  }

  // C. GET CART
  try {
    const cartRes = await axios.get(`${BASE_URL}/api/cart`, authHeader);
    console.log(`✅ GET CART: Success (${cartRes.data?.items?.length || 0} items)`);
    if (!cartItemId && cartRes.data?.items?.length > 0) {
        cartItemId = cartRes.data.items[0].id;
    }
  } catch (err) {
    console.error('❌ GET CART: Failed', err.response?.data || err.message);
  }

  // D. UPDATE ITEM
  if (cartItemId) {
    try {
      await axios.put(`${BASE_URL}/api/cart/items/${cartItemId}`, { quantity: 2 }, authHeader);
      console.log(`✅ PUT UPDATE ITEM (${cartItemId}): Success`);
    } catch (err) {
      console.error(`❌ PUT UPDATE ITEM (${cartItemId}): Failed`, err.response?.data || err.message);
    }

    // E. DELETE ITEM
    try {
      await axios.delete(`${BASE_URL}/api/cart/items/${cartItemId}`, authHeader);
      console.log(`✅ DELETE ITEM (${cartItemId}): Success`);
    } catch (err) {
        // Some backends might not return 200 on delete if item is already gone
      console.error(`❌ DELETE ITEM (${cartItemId}): Failed`, err.response?.data || err.message);
    }
  }

  console.log('\n--- ENDPOINT TEST COMPLETE ---');
}

testEndpoints();
