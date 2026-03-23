const axios = require('axios');

const BASE_URL = 'https://grocery.newcinderella.online';
const credentials = {
  login: 'abanoubtalaat5252@gmail.com',
  password: 'P@ssword12'
};

async function testBestSells() {
  console.log('--- STARTING BEST SELLS INSPECTION ---');
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
    console.log('\nFetching /api/best-sells...');
    const res = await axios.get(`${BASE_URL}/api/best-sells`, authHeader);
    console.log('✅ Status:', res.status);
    console.log('--- Body ---');
    console.log(JSON.stringify(res.data, null, 2));
    
    // Check where the products are
    const prodArray = res.data.data || res.data.products || (Array.isArray(res.data) ? res.data : null);
    if (Array.isArray(prodArray)) {
        console.log(`\nFound ${prodArray.length} products in array.`);
        prodArray.slice(0, 2).forEach((p, i) => {
            console.log(`\nProduct ${i+1}:`, {
                id: p.id,
                title: p.title || p.name,
                category: p.category,
                price: p.price
            });
        });
    } else {
        console.log('\n❌ Could not find an array of products in the response.');
    }
    
  } catch (err) {
    console.error('❌ GET BEST SELLS: Failed', err.response?.data || err.message);
  }

  console.log('\n--- INSPECTION COMPLETE ---');
}

testBestSells();
