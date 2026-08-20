import React,{useEffect,useRef} from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
export default function MapView({listings}){
 const ref=useRef(null),map=useRef(null)
 useEffect(()=>{
  if(!ref.current)return
  if(!map.current){map.current=L.map(ref.current,{scrollWheelZoom:false}).setView([40.73,-73.93],11);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors'}).addTo(map.current)}
  const markers=[]; listings.forEach(l=>{if(l.lat&&l.lng){const m=L.marker([l.lat,l.lng]).addTo(map.current).bindPopup(`<b>${l.title}</b><br>${l.address}<br>$${l.price}`);markers.push(m)}})
  if(markers.length)map.current.fitBounds(L.featureGroup(markers).getBounds().pad(.2))
  return ()=>{markers.forEach(m=>map.current.removeLayer(m))}
 },[listings])
 return <div ref={ref} style={{height:400,width:'100%'}}/>
}