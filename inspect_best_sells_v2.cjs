const axios = require('axios');

const BASE_URL = 'https://grocery.newcinderella.online';
const credentials = {
  login: 'abanoubtalaat5252@gmail.com',
  password: 'P@ssword12'
};

async function testBestSells() {
  let token;
  try {
    const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
    token = loginRes.data.token || loginRes.data.data?.token;
  } catch (err) {
    console.error('❌ LOGIN: Failed', err.response?.data || err.message);
    return;
  }

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const res = await axios.get(`${BASE_URL}/api/best-sells`, authHeader);
    console.log('Keys in response:', Object.keys(res.data));
    
    if (res.data.data) {
        console.log('Type of data:', Array.isArray(res.data.data) ? `Array (${res.data.data.length} items)` : typeof res.data.data);
    }
    
    if (res.data.products) {
        console.log('Type of products:', Array.isArray(res.data.products) ? `Array (${res.data.products.length} items)` : typeof res.data.products);
    }

    // List categories present in best sells
    const prodArray = res.data.data || res.data.products || [];
    if (Array.isArray(prodArray)) {
        const categories = [...new Set(prodArray.map(p => {
             if (typeof p.category === 'object') return p.category.name;
             return p.category;
        }))];
        console.log('Categories present in best sells:', categories);
    }

  } catch (err) {
    console.error('❌ GET BEST SELLS: Failed', err.response?.data || err.message);
  }
}

testBestSells();
