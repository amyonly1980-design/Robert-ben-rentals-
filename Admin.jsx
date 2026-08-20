import React,{useState} from 'react'
import sampleData from '../data/listings.json'
export default function Admin({listings,setListings}){
 const [text,setText]=useState(JSON.stringify(listings,null,2)),[msg,setMsg]=useState('')
 const save=()=>{try{const p=JSON.parse(text);setListings(p);setMsg('Saved to this browser.')}catch(e){setMsg('Invalid JSON: '+e.message)}}
 const restore=()=>{setListings(sampleData);setText(JSON.stringify(sampleData,null,2));setMsg('Restored sample data.')}
 return <div className="admin-page"><h2>Admin — Listings</h2><p>Development editor. Changes are stored in this browser only.</p><button onClick={save}>Save</button> <button onClick={restore}>Restore sample data</button> <span>{msg}</span><textarea value={text} onChange={e=>setText(e.target.value)} rows="24"/></div>
}