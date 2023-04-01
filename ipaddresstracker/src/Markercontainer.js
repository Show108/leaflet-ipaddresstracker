import React from 'react'
import icon from './icon'
import { useEffect, useMemo } from 'react'
import { Marker, Popup , useMap} from 'react-leaflet'

export default function Markercontainer({address}){
  const position = useMemo(()=>{
    return [address.location.lat, address.location.lng]
  }, [address.location.lat, address.location.lng])
  const map = useMap()

  useEffect(()=>{
    map.flyTo(position, 13,{
        animate:true
    })
}, [map, position])
  return (
  
    <>
        <Marker icon={icon} position={position}>
          <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
       </Marker>
    </>
  )
}
