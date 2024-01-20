import { useState } from "react"

function App() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [userAddress, setUserAddress] = useState("")

  const [GPSLatitude, setGPSLatitude] = useState()
  const [GPSLongitude, setGPSLongitude] = useState()

  const geo = navigator.geolocation

  // Get user current location
  geo.getCurrentPosition(userCoords)
  function userCoords(position) {
    let userLatitude = position.coords.latitude
    let userLongitude = position.coords.longitude

    // console.log("Latitude: ", userLatitude)
    // console.log("Longitude: ", userLongitude)

    setLatitude(userLatitude)
    setLongitude(userLongitude)
  }

  // Get user GPS current location
  const watchID = geo.watchPosition(userGPSCoords)
  function userGPSCoords(position) {
    let userGPSLatitude = position.coords.latitude
    let userGPSLongitude = position.coords.longitude

    console.log("Latitude: ", userGPSLatitude)
    console.log("Longitude: ", userGPSLongitude)

    setGPSLatitude(userGPSLatitude)
    setGPSLongitude(userGPSLongitude)
  }

  const getUserAddress = async () => {
    let url = `https://api.opencagedata.com/geocode/v1/json?key=${
      import.meta.env.VITE_OPENCAGE_API_KEY
    }&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`

    const loc = await fetch(url)
    const data = await loc.json()
    console.log("User Address: ", data)
    setUserAddress(data.results[0].formatted)
  }

  const handleGetUserAddress = () => {
    getUserAddress()
  }

  // const stopGPS = () => {
  //   geo.clearWatch(watchID)
  // }

  return (
    <>
      <h1>Current Location</h1>
      <h2>latitude- {latitude}</h2>
      <h2>longitude- {longitude}</h2>
      <h2>User Address: {userAddress}</h2>
      <button onClick={handleGetUserAddress}>Get User Address</button>
      <hr />
      <h1>GPS Tracking</h1>
      <h2>GPS Latitude:- {GPSLatitude}</h2>
      <h2>GPS Longitude:- {GPSLongitude}</h2>
    </>
  )
}

export default App
