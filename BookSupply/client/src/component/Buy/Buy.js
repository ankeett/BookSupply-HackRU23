import React, { useState,useEffect } from 'react'
import {Grid} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {fetchProducts} from '../../actions/productAction'
import Post from './Post'
import { TextField, Card, CardActionArea,CardMedia,CardContent, Typography,Container, Paper,Button,InputAdornment,IconButton, FormControlLabel, Switch} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import Slider from '@mui/material/Slider';
import Review from '../Review/Review'
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import { useParams, useNavigate } from 'react-router-dom'
import GoogleMapReact from 'google-map-react';
import Marker from 'google-map-react';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Loading from '../Loader/loading'
import MetaData from '../../MetaData'

const AnyReactComponent = ({ text }) => <LocationOnIcon />;

const DummyBuy = () => {
  const dispatch = useDispatch();
  const [advanced,setAdvanced] = useState(false);
  const [price,setPrice] = useState([0,5000])
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lat,setLat] = useState();
  const [long, setLong] = useState();
  const [radius,setRadius] = useState(30000);
  const [selectedLat, setSelectedLat] = useState(0.0);
  const [selectedLong, setSelectedLong] = useState(0.0);
  const [search, setSearch] = useState(false)
  const [keyword,setKeyword] = useState("");
  const [keywordFinal, setKeywordFinal] = useState("");
  const [map,setMap] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeywordFinal(keyword);
    setSearch(true);

    setMap(false);
    setChecked(false);
    
  }

  const handleChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  }
  const handleAdvanced = (e)=>{
    e.preventDefault();
    setAdvanced((prevAdvanced)=>!prevAdvanced);
    setMap(false);
    setChecked(false);
  }

  const handleCancelSearch = (e) => {
    e.preventDefault();
    setKeywordFinal("")
    setKeyword("");
    setSearch(false)
    setMap(false)
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
    setCurrentPage(1);
}
  const {isLoading, error, success, product, count, productLocation} = useSelector(state=>state.productRed);
  const {user}=useSelector(state=>state.user);

  useEffect(()=>{    

   
      if (!advanced){

      
      dispatch(fetchProducts(keyword, currentPage, price, category, rating, radius, selectedLat, selectedLong));

    }
    
  },[keywordFinal, advanced])
  
  const onOptionChange = e => {
    setCategory(e.target.value);
  }

  const handleReset = () =>{
    setPrice([0,5000]);
    setCategory("");
    setRating(0);
    setRadius(30000);
  }
  const handleLocation = () =>{
      navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      setSelectedLat(lat);
      setSelectedLong(long);
      setMap((prevMap)=>!prevMap);

    })
    setChecked((prevState)=>!prevState);

  }
  
  const defaultProps = {
    center: {
      lat: lat,
      lng: long
    },
    zoom: 11,
    size:{width:300,height:140}
  };

  const renderMarkers = (map, maps, latt, long,title) => {
    
    let marker = new maps.Marker({
    position: { lat: latt, lng: long },
    map,
    title: title
    });
    return marker;
   };

   const [selectedOption, setSelectedOption] = useState('all');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  
  return (
    <>
    
    <MetaData title = "Buy Products"/>    

    <div className='m-[50px]'>
      <TextField className='text-center' value={keyword}  onChange={handleChange} fullWidth varient ="outlined" label='Search'
      InputProps={{
        endAdornment:(
            <InputAdornment position="end">
                <IconButton        
                >
                  
                    <Button onClick = {handleSearch}>
                      
                      <SearchIcon /> 
                    </Button>
                    
                </IconButton>
            {search ?     <IconButton> 
                    <Button onClick={handleCancelSearch}>
                    <CancelIcon/>

                    </Button>
                    
                    
                </IconButton>
                : <></>
            }
            </InputAdornment>
        )
    }}        
    />
    <div className='flex flex-row float-right m-[20px] gap-5'>
    <FormControlLabel
          value="bottom"
          control={<Switch checked = {checked} onClick={handleLocation} color="primary" />}
          label="Map"
          labelPlacement="end"
        />    </div>
    <Button className='float-right m-[20px] text-white bg-blue-700 normal-case' onClick = {handleAdvanced} >Advanced Search?</Button>
    {
      advanced ? 
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-[99] w-full h-full'>
        <Paper className="m-[50px] p-[50px] rounded-[15px] " elevation={6}>
          <div className='text-end cursor-pointer' onClick={handleAdvanced}><CancelIcon/></div>   
          <nav className='text-center'>
            <strong>Filters</strong>
            <Divider className='m-5'/>
          </nav>

          <div className='m-auto'>
          <div className='flex flex-col mt-[10px]'>
            Price Range

            <Slider className ='w-80'
              getAriaLabel={() => 'Price range'}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              max={5000}
            />

            <div className='flex flex-row gap-[30px]'>
              <TextField label='min' value={price[0]}
                InputProps={{
                  startAdornment:(
                      <InputAdornment position="start">  
                        $
                      </InputAdornment>
                  )
                }}
              />
        
              <TextField label='max' value={price[1]}
                InputProps={{
                  startAdornment:(
                      <InputAdornment position="start">  
                        $
                      </InputAdornment>
                  )
                }}
              />
            </div>
          </div>
          <TextField className='mr-[10px] mt-[10px]' label="Radius" type= 'number' value={radius} onChange={(e)=>{
            
            setRadius(e.target.value)
            navigator.geolocation.getCurrentPosition((position) => {
              setLat(position.coords.latitude);
              setLong(position.coords.longitude);
              setSelectedLat(lat);
              setSelectedLong(long);
        
            })
            }} InputProps={{inputProps:{min:0}}}/>
          <div className='mt-[20px] flex flex-col gap-2'>
            <p>Item type</p>
          <div>
              <input
              type="radio"
              name="category"
              value="General Books"
              id="General Books"
              checked={category === "General Books"}
              onChange={onOptionChange}
              />
            <label htmlFor="General Books">General Books</label>
          </div>
          
          <div>
          <input
            type="radio"
            name="category"
            value="Notes"
            id="Notes"
            checked={category === "Notes"}
            onChange={onOptionChange}
          />
          <label htmlFor="Notes">Notes</label>
          </div>

          <div>
            <input
              type="radio"
              name="category"
              value="Merch"
              id="Merch"
              checked={category === "Merch"}
              onChange={onOptionChange}
            />
            <label htmlFor="Merch">Merch</label>
          </div>

          <div>
            <input
              type="radio"
              name="category"
              value="Accesories"
              id="Accesories"
              checked={category === "Accesories"}
              onChange={onOptionChange}
            />
            <label htmlFor="Accesories">Accesories</label>
          </div>

          <div>
            <input
              type="radio"
              name="category"
              value="Clothing"
              id="Clothing"
              checked={category === "Clothing"}
              onChange={onOptionChange}
            />
            <label htmlFor="Clothing">Clothing</label>
          </div>
       
          <div>   
          <input
            type="radio"
            name="category"
            value="All"
            id="All"
            checked={category === ""}
            onChange={()=> setCategory("")}
          />
          <label htmlFor="All">All</label>
          </div> 
          </div>

          <Review rating={rating}  setRating = {setRating} />
          <div className=' flex flex-row gap-5 float-right'>
          <Button className=' text-white bg-blue-700 rounded-lg normal-case' onClick={handleReset}>Reset</Button>
          <Button className=' text-white bg-blue-700 rounded-lg normal-case' onClick={handleAdvanced}>Show results</Button>
          </div>
          </div>
        </Paper>
      </div>
      : ""
    }

  {
map ? 
<div className = 'mt-[80px] mb-9 grid grid-flow-row-dense grid-cols-2 grid-rows-1 shadow-black w-full gap-7' style={{ height: '80vh' }}>
  {/* add api key here */}
    <GoogleMapReact className="w-[300px]" bootstrapURLKeys={{ key: ""}} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} 
      onClick={(e) => {
        setSelectedLat(e.lat);
        setSelectedLong(e.lng);
        
      <AnyReactComponent lat={e.lat} lng={e.lng} text="Marker" />;
    }}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => {
        
         renderMarkers(map, maps, lat, long, "My Location")

          //TODO RENDER ALL THE MARKERS FOR PRODUCTS HERE
         for (let i = 0; i < product.length; i++){
            renderMarkers(map, maps, productLocation[i][1],productLocation[i][0] ,product[i].name )

         }
      
      }}
    >       
    
          
      </GoogleMapReact>

      <div>

        
       { isLoading? <Loading/>:
   <Grid container component='main' className='flex flex-row gap-8 items-right justify-right h-[600px] overflow-y-auto '>        {
          product && product.map((p)=>(
            <Post key = {p._id} user = {user || ''} p = {p}/>
            ))
          }

      </Grid>}
      </div>

      </div>
      : 
      

      isLoading? <Loading/>:
      <Grid container component='main' className='flex flex-row gap-8 items-right justify-right'>
      {
        Array.isArray(product) && product.map((p)=>(
          <Post key = {p._id} user = {user || ''} p = {p}/>
          ))
        }

    </Grid>
  }
    </div>

    </>
  )
}

export default DummyBuy