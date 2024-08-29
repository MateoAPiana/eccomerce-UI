import { useEffect } from "react";
import { getProductsFromDatabase } from "../services/models";
import { useState } from "react";

const getProducts = async () => {
  try {
    const products = await getProductsFromDatabase({ offset: 0 });
    return products
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts()
      setProducts(products)
    };

    fetchProducts();
  }, []);
  return { products }
}