import { useState, useEffect } from 'react'
import React from 'react'
import arrow from './images/icon-arrow.svg'
import { MapContainer, TileLayer} from 'react-leaflet' 
import "leaflet/dist/leaflet.css"
import './App.css'
import Markercontainer from './Markercontainer'
const App = () => {
  const [address, setAddress] = useState(null)
    const [ipAddress, setIpAddress] = useState('')
    const checkAddress = 
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
    const checkDomain =
    /^[a-zA-z0-9][a-zA-z0-9-]{1,61}[a-zA-z0-9](?:\.[a-zA-Z]{2,})+/ 
    useEffect(() => {
      try{
          const getData = async ()=>{
          const response = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_DQp26GHq0dV1S2PJZsrJuvcadeyVq&
            ipAddress=8.8.8.8`
          )
          const data = await response.json()
          setAddress(data)
          console.log(data)
      }

      getData();
    }catch(error){
          console.trace(error)
    }
  
  }, [])

  async function getAddress(){
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_DQp26GHq0dV1S2PJZsrJuvcadeyVq&
      ${checkAddress.test(ipAddress) ? `ipAddress=${ipAddress}` :  checkDomain.test (ipAddress) ? `domain=${ipAddress}` : ''}`
    )
    const data = await response.json()
    setAddress(data)

  }

  function handleSubmit(e){
    e.preventDefault()
    getAddress()
    setIpAddress('')
  }



  return (
    <div>
    <div className='top'>
      <h1>IP Address Tracker</h1>
      <form onSubmit={handleSubmit}
        autoComplete='off'>
        <input type='text' placeholder='Search for any IP address or domain' name='search' value={ipAddress} onChange={(e)=>setIpAddress(e.target.value)}></input>
        <button type='button'>
          <img src={arrow} alt="arrow" className='arrow' onClick={handleSubmit}></img>
        </button>
      </form>
    </div>
    {address && <><div className='container'>
          <span>
            <div className='items'>
              <h2>IP ADDRESS</h2>
              <p>{address.ip}</p>
            </div>
          </span>
          <span>
            <div className='items'>
              <h2>LOCATION</h2>
              <p>{address.location.city}, {address.location.region}</p>
            </div>
          </span>
          <span>
            <div className='items'>
              <h2>TIMEZONE</h2>
              <p>UTC {address.location.timezone}</p>
            </div>
          </span>
          <span>
            <div>
              <h2>ISP</h2>
              <p>{address.isp}</p>
            </div>
          </span>
        </div><MapContainer
          center={[address.location.lat, address.location.lng]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100vh', width: '100vw' }}
        >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Markercontainer address={address}/>
          </MapContainer></>}
  </div>
  )
}

export default App