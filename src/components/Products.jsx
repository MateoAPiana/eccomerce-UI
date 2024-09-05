import { useEffect } from "react";
import { useProducts } from "../hooks/useProducts"
export function Products() {
  const { products, fetchMoreProducts } = useProducts()

  useEffect(() => {
    const productsContainer = document.querySelector('.products_container')
    const lastProduct = productsContainer.lastElementChild;
    const observer = new IntersectionObserver(entry => {
      if (entry[0].isIntersecting) {
        fetchMoreProducts()
      }
    })

    if (lastProduct) {
      observer.observe(lastProduct);
      return () => observer.unobserve(lastProduct);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  return (
    <div className="products_container">
      {products.error ? products.error : products?.map(product => (
        <article className="product" key={product.ProductID}>
          <h2>{product.ProductName}</h2>
          <h3>{product.category.CategoryName}</h3>
          <b>Price - ${parseFloat(product.Price)}</b>
          {/* <img src={product.img} alt="" /> */}
          {/* <img src={'https://random.imagecdn.app/150/150'} alt="" /> */}
        </article>
      ))}
    </div>
  )
}