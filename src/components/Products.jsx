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
      {products?.map(product => (
        <article className="product" key={product.id}>
          <h2>{product.product_name}</h2>
          <h3><b>Category</b> - {product.category}</h3>
          <b>Price - ${product.price}</b>
          <p>{product.product_description}</p>
          {/* <img src={product.img} alt="" /> */}
          <img src={'https://random.imagecdn.app/150/150'} alt="" />
        </article>
      ))}
    </div>
  )
}