import { useEffect } from "react";
import { getProductsFromDatabase } from "../services/models";
import { useState } from "react";

const getProducts = async ({ offset }) => {
  const offsetToUse = offset ? offset : 0
  try {
    const products = await getProductsFromDatabase({ offset: offsetToUse })
    products.map(p => {
      fetch('https://random.imagecdn.app/150/150')
        .then(res => res.blob())
        .then(img => p.img = URL.createObjectURL(img).slice(5)
        )
    })
    return products
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts({ offset })
      setProducts(products)
    };

    fetchProducts();
  }, [offset]);

  const fetchMoreProducts = async () => {
    setOffset(offset + 10)
    const moreProducts = await getProducts({ offset })
    setProducts(prevProducts => [...prevProducts, ...moreProducts])
  }

  return { products, fetchMoreProducts }
}