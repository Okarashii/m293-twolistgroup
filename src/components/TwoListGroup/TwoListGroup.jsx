import './TwoListGroup.css';
import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';

export default function TwoListGroup() {
    const [bikesLeft, setBikesLeft] = useState([
        'Honda CBR 1000',
        'Ducati Monster 1200s',
        'Yamaha MT-01',
        'KTM Superduke 1200',
        'Triumph Triple Speed',
    ]);

    const [bikesRight, setBikesRight] = useState([]);
    const [selectedBike, setSelectedBike] = useState("");

    return (
        <Container>
            <Row>
                <Col md="3">
                    <ListGroup >
                        {bikesLeft.map(bike => <ListGroup.Item key={bike}>{bike}</ListGroup.Item>)}
                    </ListGroup>
                </Col>
                <Col md="auto" className='btn-group-vertical'>
                    <Button>{">>"}</Button>
                    <Button>{">"}</Button>
                    <Button>{"<"}</Button>
                    <Button>{"<<"}</Button>
                </Col>

                <Col md="3">
                    <ListGroup >
                        {bikesRight.map(bike => <ListGroup.Item key={bike}>{bike}</ListGroup.Item>)}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
        // <div className='tlg-wrapper'>
        //     <ListGroup >
        //         {bikesLeft.map(bike => <ListGroup.Item key={bike}>{bike}</ListGroup.Item>)}
        //     </ListGroup>

        //     <div className='tlg-buttons'>

        //     </div>

        //     <ListGroup >
        //         {bikesRight.map(bike => <ListGroup.Item key={bike}>{bike}</ListGroup.Item>)}
        //     </ListGroup>
        // </div>
    );
}