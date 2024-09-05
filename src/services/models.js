export function getProductsFromDatabase({ offset }) {
  return fetch(`http://localhost:3000/product/10/${offset}`)
    // return fetch(`https://sn9g91g0-3000.brs.devtunnels.ms/product/10/${offset}`)
    .then((res) => res.json())
    .then(data => {
      return data
    }).catch(error => error)
}