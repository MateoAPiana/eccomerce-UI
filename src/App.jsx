import { useState } from 'react';
import './App.css'
import { getProductsFromDatabase } from './services/models'
import { useEffect } from 'react';

const getProducts = async () => {
  const products = await getProductsFromDatabase({ offset: 0 })
  return products
}

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProductsFromDatabase({ offset: 0 });
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <main>
      <h1>Ecommerce</h1>
      {products?.map((p) => p.id)}
    </main>
  )
}

export default App
