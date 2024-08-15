import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { generatePath } from 'react-router-dom'

import ListingCard from '../components/ListingCard'
// import { Card } from 'react-bootstrap'
// import Listing from '../../server/models/Listing';



function MyListings() {

    const [listings, setListings] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        let path;
        if (currentUser) {
          path = generatePath("/api/listings/user/:user", { user: currentUser.email });
        }

        fetch(path)
        .then(res => res.json())
        .then(data => setListings(data));
    }, [currentUser]);
    
    function renderListings() {
        return listings.map((listing, i) => {
            return (
              <ListingCard key={i} title={listing.title} description={listing.description}
              price={listing.price} id={listing._id} imgID={listing.imgPaths ? listing.imgPaths[0] : null} />
            );
        });
    }

    return(
        <div className="main">
            <h2>My Listings: </h2>
            <span style={{backgroundColor: "lightgreen"}}>
                    <a href="/newlisting">Create New Listing</a>
            </span>
            <br></br>
            <div className="cards">
                {renderListings()}
            </div>
        </div>
    );
}


export default MyListings;
