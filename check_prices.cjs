const axios = require('axios');

const BASE_URL = 'https://grocery.newcinderella.online';
const credentials = {
  login: 'abanoubtalaat5252@gmail.com',
  password: 'P@ssword12'
};

async function checkPrices() {
  let token;
  try {
    const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
    token = loginRes.data.token || loginRes.data.data?.token;
  } catch (err) { return; }

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const res = await axios.get(`${BASE_URL}/api/best-sells`, authHeader);
    const prodArray = res.data.data || [];
    console.log('--- BEST SELLS PRODUCTS ---');
    prodArray.forEach(p => {
        console.log(`Title: ${p.title}, Price: ${p.price}, Discount Price: ${p.discount_price}`);
    });
  } catch (err) { }
}

checkPrices();
