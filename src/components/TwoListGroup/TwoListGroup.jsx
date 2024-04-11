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

    const moveOne = (dir) => {
        if (dir === "right" && !bikesRight.includes(selectedBike)) {
            setBikesRight([...bikesRight, selectedBike]);
            setBikesLeft(bikesLeft.filter(b => b !== selectedBike));
            // setSelectedBike("");
        }
        else if (dir === "left" && !bikesLeft.includes(selectedBike)) {
            setBikesLeft([...bikesLeft, selectedBike]);
            setBikesRight(bikesLeft.filter(b => b !== selectedBike));
        }
        setSelectedBike("");
    }

    const moveAll = (dir) => {
        if (dir === "right") {
            
        }
    }

    return (
        <Container>
            <Row>
                <Col md="3">
                    <ListGroup >
                        {bikesLeft.map(bike => <ListGroup.Item active={selectedBike === bike} action onClick={() => setSelectedBike(bike)} key={bike}>{bike}</ListGroup.Item>)}
                    </ListGroup>
                </Col>
                <Col md="auto" className='btn-group-vertical'>
                    <Button action onClick={moveAll("right")}>{">>"}</Button>
                    <Button action onClick={moveOne("right")}>{">"}</Button>
                    <Button action onClick={moveOne("left")}>{"<"}</Button>
                    <Button action onClick={moveAll("left")}>{"<<"}</Button>
                </Col>

                <Col md="3">
                    <ListGroup >
                        {bikesRight.map(bike => <ListGroup.Item key={bike}>{bike}</ListGroup.Item>)}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}