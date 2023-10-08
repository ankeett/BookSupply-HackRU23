import React from 'react'
import {Container, Paper,CardMedia,Grid} from '@mui/material'

const Welcome = () => {
  return (
    <Grid container component="main" className='items-center justify-center' >
  <Paper  className=' shadow-none max-w-3xl'>
    <h2 className='text-center'>Welcome to BookSupply!</h2>
      <CardMedia className='object-contain'
                    component="img"
                    height={300}
                    width={10}
                    image={require('../../images/construction.png')}
                    alt="Construction"
                />
        <p className='text-center'>Let's get you signed in and start building with BookSupply.</p>
    </Paper>
    </Grid>

  )
}

export default Welcome