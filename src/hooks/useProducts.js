import { useEffect } from "react";
import { getProductsFromDatabase } from "../services/models";
import { useState } from "react";

const getProducts = async ({ offset }) => {
  const offsetToUse = offset ? offset : 0
  try {
    const products = await getProductsFromDatabase({ offset: offsetToUse })
    return products
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export function useProducts() {
  const [hasMoreProducts, setHasMoreProducts] = useState(1)
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts({ offset })
      setProducts(products)
    }

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreProducts = async () => {
    if (hasMoreProducts) {
      setOffset(offset + 10)
      const moreProducts = await getProducts({ offset })
      if (!moreProducts.length) setHasMoreProducts(0)
      setProducts(prevProducts => [...prevProducts, ...moreProducts])
    }
  }

  return { products, fetchMoreProducts }
}