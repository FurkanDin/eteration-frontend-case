export const getProducts = async (page = 1, filter = {}) => {
    const response = await fetch(
      `https://5fc9346b2af77700165ae514.mockapi.io/products?page=${page}&${new URLSearchParams(filter)}`
    );
    const data = await response.json();
    return data;  
  };