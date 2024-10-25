import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./HomeP2.css"
import property from "../img/property.png"
import garbage from "../img/garbage.png"
import water from "../img/water.png"
import bill from "../img/bill.png"

export default function HomeP2() {
  return (
  <>
    <div className='container-p2'>
    <Card style={{ width: '18rem' }}>

      <Card.Body>
        <Card.Title style={{color : "Orange" , textAlign:"center"}}>Property Tax</Card.Title>
        <Card.Img variant="top" src={property} />
      <Button variant="warning">Pay Now</Button>
      </Card.Body>
    </Card>
    
    <Card style={{ width: '18rem',}}>
      <Card.Body>
        <Card.Title style={{color : "blue" , textAlign:"center"}}>Water Tax</Card.Title>
        <Card.Img variant="top" src={water} />
        <Button variant="primary">Pay Now</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title  style={{color : "#5687b8" , textAlign:"center"}}>Garbage tax</Card.Title>   
        <Card.Img variant="top" src={garbage} />
        <Button variant="info">Pay Now</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title style={{color : "Red" , textAlign:"center"}}>Others</Card.Title>   
        <Card.Img variant="top" src={bill} />
        <Button variant="danger">See More</Button>
      </Card.Body>
    </Card>
    </div>
  </>
  )
}
