const axios = require('axios');

async function debug() {
  try {
    const loginRes = await axios.post('https://grocery.newcinderella.online/api/auth/login', {
      email: 'abanoubtalaat5252@gmail.com',
      password: 'P@ssword12'
    });
    const token = loginRes.data.token || loginRes.data.access_token || loginRes.data.data?.token || loginRes.data.data?.access_token;
    console.log('Got token:', token ? 'yes' : 'no');

    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    // Fetch Best Sells
    const bestSells = await axios.get('https://grocery.newcinderella.online/api/best-sells', config).catch(() => ({data: null}));
    console.log('best-sells sample:', bestSells.data ? JSON.stringify(bestSells.data).substring(0, 300) : 'failed');

    // Fetch Hot Deals
    const hotDeals = await axios.get('https://grocery.newcinderella.online/api/meals/hot', config).catch(() => ({data: null}));
    console.log('\nhot-deals sample:', hotDeals.data ? JSON.stringify(hotDeals.data).substring(0, 300) : 'failed');

    // Fetch New Products
    const newProducts = await axios.get('https://grocery.newcinderella.online/api/new-products', config).catch(() => ({data: null}));
    console.log('\nnew-products sample:', newProducts.data ? JSON.stringify(newProducts.data).substring(0, 300) : 'failed');
    
  } catch (err) {
    if (err.response) {
      console.log('Error data:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

debug();
