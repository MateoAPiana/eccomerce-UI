export function getProductsFromDatabase({ offset }) {
  return fetch(`http://localhost:3000/product/10/${offset}`)
    .then((res) => res.json())
    .then(data => {
      return data
    })
}