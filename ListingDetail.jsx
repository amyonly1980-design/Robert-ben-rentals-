import React from 'react'
import {useParams,Link} from 'react-router-dom'
const money=n=>'$'+Number(n).toLocaleString()
export default function ListingDetail({listings}){
 const {id}=useParams(), l=listings.find(x=>String(x.id)===String(id))
 if(!l)return <div className="detail-page">Listing not found. <Link to="/">Back</Link></div>
 return <div className="detail-page"><Link to="/" className="back">← Back to listings</Link>
  <div className="detail-grid"><div><img className="hero-image" src={l.image} alt={l.title}/></div>
  <div className="detail-info"><h2>{l.title}</h2><div className="price">{money(l.price)}</div><div className="meta">{l.beds} bd • {l.baths} ba • {l.sqft} sqft</div><div>{l.address}</div>
   <h3>Description</h3><p>{l.description}</p><h3>Amenities</h3><ul>{l.amenities.map(a=><li key={a}>{a}</li>)}</ul>
   <h3>Contact</h3><p>Contact Robert Ben Rental Property for availability and application information.</p>
  </div></div>
 </div>
}