import { useProducts } from "../hooks/useProducts"

export function Products() {
  const { products } = useProducts()

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          {product.product_name}
        </div>
      ))}
    </div>
  )
}