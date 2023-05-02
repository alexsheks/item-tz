import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { incrementAsync } from '../features/products/productsSlice'
import { useAppDispatch } from '../app/hooks'

type Inputs = {
  title: string
  description: string
  price: number
  thumbnail: string
}

export default function Edit() {
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const params = useParams()
  const productId = params.id
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch(
      `https://dummyjson.com/products/${productId}`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    )

    console.log(response)

    if (errors) {
      setOpen(true)
    } else {
      dispatch(incrementAsync())
      window.location.replace('/')
    }
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <section className="form-wrapper">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Не получилось сохранить данные!
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          {...register('title')}
          className="form-input"
          type="text"
          placeholder="Title"
        />
        <textarea
          {...register('description')}
          className="form-input"
          placeholder="Description"
        ></textarea>
        <input
          {...register('price')}
          className="form-input"
          type="number"
          placeholder="Price"
        />
        <input
          {...register('thumbnail')}
          className="form-input"
          type="text"
          placeholder="Image source"
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <button type="submit" style={{ marginRight: '10px' }}>
            Отправить
          </button>
          <Link to="/">
            <button>Отменить</button>
          </Link>
        </div>
      </form>
    </section>
  )
}
