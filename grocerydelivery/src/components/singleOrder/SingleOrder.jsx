import "./list.scss"
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  DistanceMatrixService
} from '@react-google-maps/api'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { publicRequest } from "../../ApiRequest"

const center = { lat: 41.878876, lng: -87.635918 }
const google = window.google;

const SingleOrder = () => {
  let test = null;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDzJvc9AR2ArCqrRW4wNzvW7hhRpO06BtQ"
  })

  const id = useLocation().pathname.split("/orders/")[1];
  const lat = id.split("&")[0].split("=")[1]
  const long = id.split("&")[1].split("=")[1]
  const orderId = id.split("&")[2].split("=")[1]
  console.log(orderId);
  const navigate = useNavigate();

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  useEffect(() => {
    if(test !== null)
    {
      console.log("test is set");
    }
    
  }, [directionsResponse]);


  useEffect(() => {
    const getDistance = async () => {
      {console.log("getDistance")}
      calculateRoute();
    };
    getDistance();
}, [lat,long]);

const markDelivered = async () => {
       
  try {
    const res = await publicRequest.post(`/orders/updateDelivery?id=${orderId}`);
    if(res.status === 200)
    alert("Order marked as delivered");
    navigate("/");
  } catch {}
};

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    console.log("Loading");
    return <div >Map is loading</div>
  }

  async function calculateRoute() {
    // if (originRef.current.value === '' || destiantionRef.current.value === '') {
    //   return
    // }
    {console.log("calculateRoute")}
   
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const origin = new google.maps.LatLng(41.878876, -87.635918);
    const dest = new google.maps.LatLng(Number(lat), Number(long));
    const results = await directionsService.route({
      origin: origin,
      destination: dest,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    // setDistance(results.routes[0].legs[0].distance.text)
    // setDuration(results.routes[0].legs[0].duration.text)
  }



  return (
    <div
    style={{position:"relative",flexDirection:"column",alignItems:"center"}}
  >

    <DistanceMatrixService
      options={{
        destinations: [{ lat: 41.878876, lng: -87.635918 }],
        origins: [{ lat: Number(lat), lng: Number(long) }],
        travelMode: "DRIVING",
      }}
      callback={(res) => {
        
        console.log("RESPONSE", res);
        test = res.rows[0];
        //setDirectionsResponse(res);
      //   this.setState({
      //     totalTime: res.rows[0].elements[0].duration.text,
      //     totalDistance: res.rows[0].elements[0].distance.text,
      //   });
      }}/>
    <div position='absolute' left={0} top={0} h='100%' w='100%'>
      {/* Google Map Box */}
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '2000px', height: '900px' }}
        // options={{
        //   zoomControl: false,
        //   streetViewControl: false,
        //   mapTypeControl: false,
        //   fullscreenControl: false,
        // }}
        // onLoad={map => setMap(map)}
      >
        {/* <Marker position={center} />
        <Marker position={{lat: Number(lat),lng :Number(long)}} /> */}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      <br />
      <div style={{alignContent:"center",justifyContent:'center',display:'flex'}}>
      <button style={{fontSize:'26px',fontWeight:'bold',backgroundColor:'lightgreen'}} onClick ={markDelivered}> Mark as delivered</button>
      </div>
    </div>
    {/* <div
      p={4}
      borderRadius='lg'
      m={4}
      bgColor='white'
      shadow='base'
      minW='container.md'
      zIndex='1'
    >
      <div spacing={2} justifyContent='space-between'>
        <div flexGrow={1}>
          <Autocomplete>
            <input type='text' placeholder='Origin' ref={originRef} />
          </Autocomplete>
        </div>
        <div flexGrow={1}>
          <Autocomplete>
            <input
              type='text'
              placeholder='Destination'
              ref={destiantionRef}
            />
          </Autocomplete>
        </div>

        <div>
          <button colorScheme='pink' type='submit' onClick={calculateRoute}>
            Calculate Route
          </button>
          <button
            aria-label='center back'
            icon={<FaTimes />}
            onClick={clearRoute}
          />
        </div>
      </div>
      <div spacing={4} mt={4} justifyContent='space-between'>
        <h3>Distance: {distance} </h3>
        <h3>Duration: {duration} </h3>
        <button
          aria-label='center back'
          icon={<FaLocationArrow />}
          isRound
          onClick={() => {
            map.panTo(center)
            map.setZoom(15)
          }}
        />
      </div>
    </div> */}
  </div>
)
}

export default SingleOrder  