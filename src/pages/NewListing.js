import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import { Card, Form, Button, Container, Alert } from 'react-bootstrap'


function NewListing() {

  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const imgRef = useRef(); // <===== FIX THIS

  const [imgIDs, setImgIDs] = useState([]);
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const form = document.querySelector("form");
    const formData = new FormData(form);
    formData.append("user", currentUser.email);

    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    // Upload the images to Cloudinary and recieve the filepaths as a response
    // try {
    //   await fetch("/api/img/upload", {
    //     method: 'POST',
    //     body: formData
    //   })
    //   .then(res => res.json())
    //   .then(data => setImgIDs(data.paths))

    //   console.log(imgIDs);

    // } catch (err) {
    //   return;
    // }

    // Parse the formdata 
    await fetch("/api/listings", {
      method: 'POST',
      body: formData
    });









    setLoading(false)


    navigate("/")
    return; 
  }

  return (
    <>
      <Container className="d-flex justify-content-center" style={{ minHeight: "90vh" }}>
        <div className="w-100" >
            <Card.Body>
              <h2 className="text-left mb-4">Add a Listing</h2>
              {error && <Alert variant='danger'>{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="title" className="mb-2 w-50">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="title" name="title" ref={titleRef} required />
                </Form.Group>
                <Form.Group id="description" className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" name="description" rows={3} ref={descRef} required />
                </Form.Group>
                <Form.Group id="price" className="mb-2 w-25">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" name="price" max="10000" ref={priceRef} required />
                </Form.Group>
                <Form.Group id="image" className="mb-2 w-25">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" multiple name="files" ref={imgRef} required />
                </Form.Group>
                <Button disabled={loading} className="d-flex mx-auto justify-content-center w-100 mt-4" type="submit">
                  Create Listing
                </Button>
              </Form>
            </Card.Body>
        </div>
      </Container>
    </>



        // <form className="main">
        //     <h2>New Listing:</h2>
        //     <div> 
        //         <label>Title: </label>
        //         <br></br>
        //         <input value={title} onChange={handleTitleChange}/>
        //     </div>
        //     <div> 
        //         <label>Description: </label>
        //         <br></br> 
        //         <input value={description} onChange={handleDescriptionChange}/>
        //     </div>
        //     <div> 
        //         <label>Price: </label>
        //         <br></br> 
        //         <label>$ </label>
        //         <input value={price} onChange={handlePriceChange}/>
        //     </div>
        //     <br></br>
        //     <form method="POST" action="/upload" enctype="multipart/form-data">
        //         <input type="file" name="image" />
        //         <input type="submit" />
        //     </form>
        //     <br></br>
        //     <button type="button" onClick={submit}>Submit</button>

        // </form>
    )
}


export default NewListing