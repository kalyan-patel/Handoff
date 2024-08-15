import React from 'react'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from "@cloudinary/url-gen"
import { scale } from "@cloudinary/url-gen/actions/resize"
import { thumbnail } from "@cloudinary/url-gen/actions/resize"


import couch_pic from './couch.jpeg'


function ImgThumbnail({imgID}) {

  if (!imgID) {
    return(<img src={couch_pic} alt={couch_pic}></img>);
  }


  const cld = new Cloudinary({
    cloud: {
      cloudName: "dul38rcde"
    }
  });


  const image = cld.image(imgID);


  image.resize(scale().width(500));

  return (
    <div>
      <AdvancedImage cldImg={image} />
    </div>
  );
}

export default ImgThumbnail