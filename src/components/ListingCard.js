
import { useNavigate, useLocation, generatePath, Link } from 'react-router-dom'
import ImgThumbnail from './ImgThumbnail.js'

import couch_pic from './couch.jpeg'
import './Card.css'

function EditBar() {

  return(
    <div className="mt-4">
      <Link to="">SOLD</Link>
      <Link to="/signup">Edit</Link>
      <Link to="">Delete</Link>

      
      
    </div>
  );


}



function ListingCard(props){

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const path = generatePath("/listings/:id", { id: props.id })
    navigate(path);
  }


  return(


    <div className="lcard" onClick={handleClick}>
      <ImgThumbnail imgID={props.imgID}></ImgThumbnail>
      {/* <img src={couch_pic} alt={couch_pic}></img> */}
      <p className="lcard-title">{props.title}</p>
      <div className="lcard-price">${props.price}</div>
      {/* <div className="lcard-desc">{props.description}</div> */}
      {location.pathname === "/mylistings" ? EditBar() : <></>}
    </div>
  );
}

export default ListingCard