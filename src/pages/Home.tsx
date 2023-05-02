import React, { useEffect, useState } from 'react'
import { Product } from '../@types/product'
import ProductCard from '../components/ProductCard'
import { Grid, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  filterByPrice,
  filterByTitleAndDescription,
  incrementAsync,
  selectProducts
} from '../features/products/productsSlice'

export default function Home() {
  const products = useAppSelector(selectProducts)
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    dispatch(incrementAsync())
  }, [dispatch])

  function filterProducts(value: string) {
    // Price filtration. Implements a simple filter to find products where its price is equal to input value.
    if (!isNaN(parseInt(value))) {
      setInputValue(value)
      dispatch(filterByPrice(value))
      // Title and description filtration. Implements a simple filter to find products where input value is a part of title or description.
    } else {
      setInputValue(value)
      dispatch(filterByTitleAndDescription(value))
    }
  }

  if (products.status === 'failed')
    return <div>Произошла ошибка при загрузке данных</div>
  if (products.status === 'loading') return <div>Загрузка...</div>

  return (
    <>
      <div className="wrapper">
        <TextField
          sx={{ text: 'black' }}
          id="outlined-basic"
          label="Поиск"
          variant="outlined"
          value={inputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            filterProducts(event.target.value)
          }}
        />
      </div>

      <Grid container spacing={2} sx={{ padding: '20px' }}>
        {products.products.map((product: Product) => {
          return (
            <Grid key={product.id} item xs={12} md={3} lg={3}>
              <ProductCard
                title={product.title}
                id={product.id}
                description={product.description}
                price={product.price}
                thumbnail={product.thumbnail}
              />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
