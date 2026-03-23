const axios = require('axios');

const BASE_URL = 'https://grocery.newcinderella.online';
const credentials = {
  login: 'abanoubtalaat5252@gmail.com',
  password: 'P@ssword12'
};

async function checkAllCategories() {
  let token;
  try {
    const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
    token = loginRes.data.token || loginRes.data.data?.token;
  } catch (err) { return; }

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };
  const categories = new Set();

  const endpoints = ['/api/best-sells', '/api/new-products'];
  
  for (const ep of endpoints) {
    try {
        const res = await axios.get(`${BASE_URL}${ep}`, authHeader);
        const products = res.data.data || [];
        products.forEach(p => {
             const catName = typeof p.category === 'object' ? p.category.name : p.category;
             if (catName) categories.add(catName.trim());
        });
    } catch (err) {}
  }

  console.log('All categories found:', Array.from(categories));
}

checkAllCategories();
