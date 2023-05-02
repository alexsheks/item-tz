import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa'

type Props = {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  thumbnail
}: Props) {
  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <CardMedia sx={{ height: 140 }} image={thumbnail} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/edit/${id}`}>
          <IconButton aria-label="edit product">
            <FaRegEdit />
          </IconButton>
        </Link>
        <Typography sx={{ marginLeft: 'auto' }} variant="h6" component="div">
          {price + ' ₽'}
        </Typography>
      </CardActions>
    </Card>
  )
}
