import { Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashBooks from '../components/DashBooks';




function Manage() {
    
   
    return (
        <Container fluid className="">
            <Row className="min-vh-100">
                <Col sm={3} className="bg-light p-3" >
                    <div className="d-flex flex-column">
                        <Link to="/manage" className=" btn btn-secondary mt-3" style={{ padding: '0.8rem 1rem' }}>Manage</Link>
                        <Link to="/create-book" className="btn btn-warning mt-3" style={{ padding: '0.8rem 1rem' }}>Create</Link>
                    </div>
                </Col>
                <Col sm={9} className="p-3">
                    <DashBooks />
                </Col>
            </Row>       
      </Container>
      
  );
}

export default Manage;