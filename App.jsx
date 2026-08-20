import React,{useEffect,useState} from 'react'
import {Routes,Route,Link} from 'react-router-dom'
import Listings from './components/Listings'
import ListingDetail from './components/ListingDetail'
import Admin from './components/Admin'
import sampleData from './data/listings.json'

function useListings(){
 const [listings,setListings]=useState(()=>{try{const r=localStorage.getItem('rb_listings');return r?JSON.parse(r):sampleData}catch{return sampleData}})
 useEffect(()=>localStorage.setItem('rb_listings',JSON.stringify(listings)),[listings])
 return [listings,setListings]
}
export default function App(){
 const [listings,setListings]=useListings()
 const [query,setQuery]=useState('')
 const [filters,setFilters]=useState({minPrice:'',maxPrice:'',beds:'',baths:''})
 return <div className="app">
  <header className="site-header"><div><h1>Robert Ben Rentals</h1><p>Find your next rental</p></div><nav><Link to="/">Listings</Link><Link to="/admin">Admin</Link></nav></header>
  <main><Routes>
   <Route path="/" element={<Listings listings={listings} query={query} setQuery={setQuery} filters={filters} setFilters={setFilters}/>}/>
   <Route path="/listing/:id" element={<ListingDetail listings={listings}/>}/>
   <Route path="/admin" element={<Admin listings={listings} setListings={setListings}/>}/>
  </Routes></main>
  <footer>© {new Date().getFullYear()} Robert Ben Rental Property</footer>
 </div>
}