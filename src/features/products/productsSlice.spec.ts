import productsReducer, {
  ProductsState,
  filterByPrice,
  filterByTitleAndDescription
} from './productsSlice'

describe('products reducer', () => {
  const initialState: ProductsState = {
    products: [
      {
        id: 0,
        title: 'Apple',
        description: 'Yep',
        price: 1300,
        thumbnail: 'image'
      },
      {
        id: 1,
        title: 'Xiaomi',
        description: 'Nope',
        price: 100,
        thumbnail: 'image'
      }
    ],
    allProducts: [
      {
        id: 0,
        title: 'Apple',
        description: 'Yep',
        price: 1300,
        thumbnail: 'image'
      },
      {
        id: 1,
        title: 'Xiaomi',
        description: 'Nope',
        price: 100,
        thumbnail: 'image'
      },
      {
        id: 2,
        title: 'MacBook',
        description: 'YepNope',
        price: 500,
        thumbnail: 'image'
      }
    ],
    status: 'idle'
  }

  it('should handle initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual({
      products: [],
      allProducts: [],
      status: 'idle'
    })
  })

  it('should handle filter by price', () => {
    const actual = productsReducer(initialState, filterByPrice('1300'))
    expect(actual.products[0].price).toEqual(1300)
  })

  it('should handle filter by title', () => {
    const actual = productsReducer(
      initialState,
      filterByTitleAndDescription('Mac')
    )
    expect(actual.products[0].title).toMatch('MacBook')
  })

  it('should handle filter by description', () => {
    const actual = productsReducer(
      initialState,
      filterByTitleAndDescription('ope')
    )
    expect(actual.products[0].description).toMatch('Nope')
  })
})
