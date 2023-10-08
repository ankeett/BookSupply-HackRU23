import React, { useEffect } from 'react'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import {  loadUser} from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { showCartItems } from '../../actions/cartActions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const dispatch = useDispatch();
  const {isAuthenticated,user}  = useSelector(state => state.user);
  useEffect(() => {
    console.log(window.location)
    if (window.location.pathname !== '/signin' && window.location.pathname !== '/seller/register'){
      dispatch(loadUser());
      dispatch(showCartItems());

    }
   
  },[dispatch])
  
  const {cartItems, gross} = useSelector((state)=>state.cart);
  
  //creating custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ba000d",
      },
      secondary: {
        main: '#4f46e5',
      },
    },
  });

  const navLink = user?.role === 'company' ? "/sell" : "/sell/home";

  return (
    <div className='shadow-md-full static top-0 left-0 shadow-md mb-[80px]'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
        <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
          <span className='text-3xl mr-1 pt-2'>
          <Link to='/home' className='no-underline text-black'><LibraryBooksIcon fontSize='large' className='text-indigo-600'/> BookSupply</Link>
          </span>
        </div>
        <ul className='md:flex md:items-center list-none '>
          <li className='md:ml-8 text-xl'>
            <a className='text-gray-800 hover:underline underline-offset-[16px] hover:text-indigo-600 duration-500 no-underline font-bold' href='/home'>Home</a>
          </li>
          <li className='md:ml-8 text-xl'>
          <a className='text-gray-800 hover:underline underline-offset-[16px] hover:text-indigo-600 duration-500 no-underline font-bold' href='/buy'>Buy</a>

          </li>
          <li className='md:ml-8 text-xl'>
          <a className='text-gray-800 hover:underline underline-offset-[16px] hover:text-indigo-600 duration-500 no-underline font-bold' href={navLink}>Sell</a>
          </li>
          {/* {isAuthenticated ?
          <li className='md:ml-8 text-xl'>
            
            <a className='text-gray-800 hover:underline underline-offset-[16px] hover:text-indigo-600 duration-500 no-underline font-bold' href={user.role ==="user"? '/settings':'/settings'}>Settings</a>
          </li>
          : <></>} */}
          <li>
            {user?.role === 'user' ?
            <a href='/cart'>
              <div className='text-3xl text-black-600 mr-1 md:ml-6 text-inherit'>
              <ThemeProvider theme={theme}>
              <Badge badgeContent={cartItems.length} color="primary" className='' >
                  <ShoppingCartIcon fontSize='xl' color='secondary'/>
              </Badge>
              </ThemeProvider>
              </div>
              </a> : ""
            }
          </li>
          <li className='md:ml-8 text-xl'>
          {isAuthenticated ?  <a className='text-gray-800 hover:underline underline-offset-[16px] hover:text-indigo-600 duration-500 no-underline font-bold' href='/settings'><AccountCircleIcon fontSize='large' className='text-indigo-600'/></a> : <a className='text-gray-800 hover:underline underline-offset-[16px] hover:text-indigo-600 duration-500 no-underline font-bold' href='/signin'>Sign In</a>}
          </li>
          
        </ul>
      </div>
    </div>
  )
}

export default Navbar