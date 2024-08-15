import { useEffect, useState } from 'react'

import ListingCard from '../components/ListingCard'


import './Home.css'



function Home() {

    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetch("/api/listings")
        .then(res => res.json())
        .then(data => setListings(data));
    }, []);
    
    function renderListings() {
        return listings.map((listing, i) => {
            return (
                <ListingCard key={i} title={listing.title} description={listing.description}
                    price={listing.price} id={listing._id} imgID={listing.imgPaths ? listing.imgPaths[0] : null} />
            );
        });
    }

    return(
        <div className="home">
            <h2 align="center"><u>Listings: </u></h2>
            <span style={{backgroundColor: "lightgreen"}}>
                    <a href="/newlisting">Create New Listing</a>
            </span>
            <br></br>
            <div className="items">
                {renderListings()}
            </div>
        </div>
    );
}


export default Home;