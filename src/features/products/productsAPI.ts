import { ProductsData } from '../../@types/product'

export async function fetchProducts() {
  const response = await fetch('https://dummyjson.com/products')
  const data: ProductsData = await response.json()
  return data.products
}
