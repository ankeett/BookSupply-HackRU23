import React , {useState,useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  logout , loadUser} from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { TextField, Card, CardActionArea,CardMedia,CardContent, Typography,Container, Paper,Button} from '@mui/material'
import {Link} from 'react-router-dom';
import MetaData from '../../MetaData'
const Home = () => {
  const {user} = useSelector(state=>state.user)
  
  return (
  <>
  <MetaData title = "BookSupply"/>
  <Container component="main" >
    <Paper className='shadow-none'>
    {
    user ? <h1>Welcome {user.name},</h1>: ''
    }


    <div className ='flex gap-[30px] justify-center mt-[200px]'>
      <Card className='max-w-[345px]'>
      <CardActionArea component={Link} to={'/buy'}>
      <CardMedia
        component="img"
        height="230"
        image={require('../../images/buy.png')}
        alt="Buy"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Buy
        </Typography>
        <Typography variant="body2" color="text.secondary">
        lorem ipsum dolor sit amet consectetur adipiscing elit aenean placerat tortor aptent mus efficitur ad conubia pretium quis dui id eleifend laoreet curae sollicitudin turpis vehicula hendrerit mattis interdum facilisis
        </Typography>
      </CardContent>
    </CardActionArea>
    
  </Card>
    <Card className='max-w-[345px]'>
    <CardActionArea component={Link} to="/sell">
        <CardMedia
          component="img"
          height="230"
          image={require('../../images/sell.png')}
          alt="Sell"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sell
          </Typography>
          <Typography variant="body2" color="text.secondary">
          lorem ipsum dolor sit amet consectetur adipiscing elit aenean placerat tortor aptent mus efficitur ad conubia pretium quis dui id eleifend laoreet curae sollicitudin turpis vehicula hendrerit mattis interdum facilisis
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>
      </div>
    </Paper>
  </Container>
</>   
  )
}

export default Home