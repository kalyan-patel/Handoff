import { useEffect, useState } from 'react'
import { useLocation, generatePath } from 'react-router-dom'

function ItemPage() {

    const location = useLocation();
    const [listing, setListing] = useState("");

    useEffect(() => {
        let path;
        if (location) {
            path = generatePath("/api/:endPath", { endPath: location.pathname.substring(1) });
        }
        console.log(path)

        fetch(path)
        .then(res => res.json())
        .then(data => setListing(data));
 
    }, [location]);


    return (
        <div className="main">
            <h2>{listing.title}</h2>
            <h3>${listing.price}</h3>
            <p>{listing.description}</p>
        </div>
    );

}

export default ItemPage;