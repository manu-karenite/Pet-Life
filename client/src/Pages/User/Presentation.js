import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Divider, ListItemIcon, MenuItem, Box, Icon, Toolbar, Typography, Button, IconButton, Menu,} from "@mui/material";
import bgImage from "../../Assets/backgr.jpeg";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DefaultReviewCard from "../../Components/Helpers/DefaultReviewCard";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FeedBack from "../../Components/Helpers/Feedback";
import Booking from "../../Components/Helpers/Booking";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetails } from "../../Axios/User/Authentication.js";


function Presentation(props) {

  const location = useLocation()
  const { id } = location.state;
  
  const { hotels } = useSelector((state) => ({ ...state }))

  const [name,setName]=useState("");
  const [contact,setContact]=useState("");
  const [desc, setDesc] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [data, setData] = useState("")
  const [services, setServices] = useState([])

  
  const getData = () => {
    getDetails(id)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setContact(res.data.contact);
        setDesc(res.data.description);
        setShortDesc(res.data.shortDesc);
        setServices(res.data.services)
        setData({
          ...data,
          address1: res.data.address1,
          address2: res.data.address2,
          city: res.data.city,
          landmark: res.data.landmark,
          state: res.data.state,
          pin: res.data.pin,
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, [hotels]);

  return (
    <>
        {/* Top Image with text */}
        <Box
            minHeight="75vh"
            width="100%"
            sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            display: "grid",
            placeItems: "center",
            }}
        >
            <Container style={{color: "white" }}>
                <center>
                    <h1 style={{color: "white" }}><strong> {name} </strong></h1>
                    <p><strong> {data?.address1},{data?.address2},{data?.city},{data?.state}, Pincode: {data?.pin}</strong></p>
                    <p><strong>{contact}</strong></p>
                    {/*<button 
                    style={{ color: "black",
                        border: "none",
                        justifyContent: "center",
                        backgroundColor: "#121619",
                        height: "50px",
                        width: "180px",
                        color: "white",
                        fontSize: "20px" }}
                    type="submit"
          > BOOK NOW </button>*/}
                    <Booking className="BookApp" />
                </center>
            
            
            </Container>
        </Box>
        {/* End Top Image with text */}

        {/*Services*/}
        <Box component="section" py={3} style={{height: "150px"}}>
        <Container>
            <Grid container item xs={12} lg={9} sx={{ mx: "auto" }}>
              {services?.map(service => (
                <Grid item xs={12} md={4}>
                  <h3>service name = {service.serviceName}</h3>
                  <h3>service charge = {service.serviceCharge}</h3>
                  <h3>service desc = {service.description}</h3>
               </Grid>
              ))}
            {/* <Grid item xs={12} md={4}>
                <h3>service 1</h3>
            </Grid>
            <Grid item xs={12} md={4} display="flex">
                <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, mx: 0 }} />
                <h3>service 1</h3>
                <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, ml: 0 }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <h3>service 1</h3>
            </Grid> */}
            </Grid>
        </Container>
        </Box>
        {/*End of Services*/}

        {/*Desc*/}
        <Container sx={{ mt: 6 }} style={{backgroundColor: "gray"}}>
            <Container>
                <center>
                <Grid container item xs={12} lg={6} sx={{ ml: { xs: 0, lg: 6 } }}>
                <Typography variant="h1" color="white" mb={1}> DESC </Typography>
                <Typography variant="p" color="white" mb={1} noWrap="false"> {desc} </Typography>
                <Typography variant="body1" color="white" opacity={0.8} mb={2}> {shortDesc} </Typography>
                </Grid>
                </center>
            </Container>
        </Container>
        {/*End of Desc */}
            <br></br><br></br>
        {/*Image gallery*/}  
        <center>   
        <Typography variant="h1" color="black" mb={1}> Our Images </Typography>
        <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={3} gap={8}>
                {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                    />
                </ImageListItem>
                ))}
            </ImageList>
        </Box>
        </center> 
        {/* End image gallery */}

        {/* Reviews and ratings */}
        <Box component="section" py={12}>
            <Container style={{backgroundColor: "gray"}}>
                <Grid
                container
                item
                xs={12}
                lg={6}
                justifyContent="center"
                sx={{ mx: "auto", textAlign: "center" }}
                >
                    <Typography variant="h2">Reviews and Ratings</Typography>
                </Grid>

                <Grid container spacing={3} sx={{ mt: 8 }}>
                    <Grid item xs={12} md={6} lg={4}>
                        <DefaultReviewCard
                        name="Nick Willever"
                        review="This is an excellent product, the documentation is excellent and helped me get things done more efficiently."
                        />

                        <Stack spacing={1}>
                        <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
                        </Stack>
                        
                    </Grid>
                
                    <Grid item xs={12} md={6} lg={4}>
                        <DefaultReviewCard
                        name="Samuel Kamuli"
                        review="Great product. Helped me cut the time to set up a site. I used the components within instead of starting from scratch. I highly recommend for developers who want to spend more time on the backend!."
                        />
                        <Stack spacing={1}>
                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <DefaultReviewCard
                        name="Samuel Kamuli"
                        review="Great product. Helped me cut the time to set up a site. I used the components within instead of starting from scratch. I highly recommend for developers who want to spend more time on the backend!."
                        />
                        <Stack spacing={1}>
                        <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
                        </Stack>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 6 }} />




                <Grid container spacing={3} justifyContent="center">
                    <br></br>
                    <br></br>
                <div>   
                    <FeedBack
                    style = {{position: "relative"}}
                    numberOfStars={5}
                    headerText="Give your rating"
                    buttonText="Rate Now"
                    handleClose={() => console.log("handleclose")}
                    
                    handleButtonClick={() => console.log("handleButtonClick")}
                    />
                </div> 

                </Grid>
            </Container>
        </Box>
        {/* End of Reviews and ratings */}
    </>
  );
}


{/*Image List */}
const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Bed',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: 'Books',
    },
    {
      img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
      title: 'Sink',
    },
    {
      img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
      title: 'Kitchen',
    },
    {
      img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
      title: 'Blinds',
    },
    {
      img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
      title: 'Chairs',
    },
    {
      img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
      title: 'Laptop',
    },
    {
      img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
      title: 'Doors',
    },
    {
      img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
      title: 'Storage',
    },
    {
      img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
      title: 'Candle',
    },
    {
      img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      title: 'Coffee table',
    },
  ];

export default Presentation;