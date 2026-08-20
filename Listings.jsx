import React,{useMemo} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import MapView from './MapView'
const money=n=>'$'+Number(n).toLocaleString()
export default function Listings({listings,query,setQuery,filters,setFilters}){
 const navigate=useNavigate()
 const filtered=useMemo(()=>listings.filter(l=>{
  if(filters.minPrice&&+l.price<+filters.minPrice)return false
  if(filters.maxPrice&&+l.price>+filters.maxPrice)return false
  if(filters.beds&&+l.beds<+filters.beds)return false
  if(filters.baths&&+l.baths<+filters.baths)return false
  if(query){const q=query.toLowerCase();if(!(l.title.toLowerCase().includes(q)||l.address.toLowerCase().includes(q)||l.description.toLowerCase().includes(q)))return false}
  return true
 }),[listings,query,filters])
 return <div className="listings-page">
  <aside className="search-panel"><input placeholder="Search city, neighborhood, keyword" value={query} onChange={e=>setQuery(e.target.value)}/>
   <div className="filters"><label>Min Price<input type="number" value={filters.minPrice} onChange={e=>setFilters(s=>({...s,minPrice:e.target.value}))}/></label>
   <label>Max Price<input type="number" value={filters.maxPrice} onChange={e=>setFilters(s=>({...s,maxPrice:e.target.value}))}/></label>
   <label>Beds<input type="number" min="0" value={filters.beds} onChange={e=>setFilters(s=>({...s,beds:e.target.value}))}/></label>
   <label>Baths<input type="number" min="0" value={filters.baths} onChange={e=>setFilters(s=>({...s,baths:e.target.value}))}/></label></div>
   <button onClick={()=>{setFilters({minPrice:'',maxPrice:'',beds:'',baths:''});setQuery('')}}>Reset</button>
  </aside>
  <section className="results"><h2>Available Rentals ({filtered.length})</h2>
   <div className="grid">{filtered.map(l=><article className="card" key={l.id} onClick={()=>navigate('/listing/'+l.id)}>
    <img src={l.image} alt={l.title}/><div className="card-body"><div className="card-row"><h3>{l.title}</h3><span className="price">{money(l.price)}</span></div>
    <div className="meta">{l.beds} bd • {l.baths} ba • {l.sqft} sqft</div><div>{l.address}</div><Link to={'/listing/'+l.id}>View details</Link></div>
   </article>)}</div><div className="map-wrapper"><MapView listings={filtered}/></div>
  </section>
 </div>
}