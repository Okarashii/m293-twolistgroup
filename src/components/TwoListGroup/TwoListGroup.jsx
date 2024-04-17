import './TwoListGroup.css';
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function TwoListGroup() {
    const [bikesLeft, setBikesLeft] = useState([
        'Honda CBR 1000',
        'Ducati Monster 1200s',
        'Yamaha MT-01',
        'KTM Superduke 1200',
        'Triumph Triple Speed',
    ]);

    const [bikesRight, setBikesRight] = useState([""]);
    const [selectedBikesLeft, setSelectedBikesLeft] = useState([""]);
    const [selectedBikesRight, setSelectedBikesRight] = useState([""]);

    useEffect(() => {
        setBikesRight([]);
        setSelectedBikesLeft([]);
        setSelectedBikesRight([]);
    }, [])

    const clearSelections = () => {
        setSelectedBikesLeft([]);
        setSelectedBikesRight([]);
    }

    const moveBikes = (dir) => {
        if (dir === "right" && selectedBikesLeft.length > 0) {
            setBikesRight([...selectedBikesLeft, ...bikesRight]);
            setBikesLeft(bikesLeft.filter(b => !selectedBikesLeft.includes(b)));
            clearSelections();
        }
        else if (dir === "left" && selectedBikesRight.length > 0) {
            setBikesLeft([...selectedBikesRight, ...bikesLeft]);
            setBikesRight(bikesRight.filter(b => !selectedBikesRight.includes(b)));
            clearSelections();
        }
    }

    const moveAll = (dir) => {
        if (dir === "right") {
            setBikesRight([...bikesRight, ...bikesLeft]);
            setBikesLeft([]);
        }
        else if (dir === "left") {
            setBikesLeft([...bikesLeft, ...bikesRight]);
            setBikesRight([]);
        }
        clearSelections();
    }

    const bikeSelectionHandler = (bike, dir) => {
        if (dir === "left") {
            if (selectedBikesLeft.includes(bike)) {
                setSelectedBikesLeft([...selectedBikesLeft.filter(b => b !== bike)]);
            }
            else {
                setSelectedBikesLeft([bike, ...selectedBikesLeft]);
            }
            setSelectedBikesRight([]);
        }
        else if (dir === "right") {
            if (selectedBikesRight.includes(bike)) {
                setSelectedBikesRight([...selectedBikesRight.filter(b => b !== bike)]);
            }
            else {
                setSelectedBikesRight([bike, ...selectedBikesRight]);
            }
            setSelectedBikesLeft([]);
        }
    }

    const removeSelectedBikes = () => {
        setBikesLeft([...bikesLeft.filter(b => !selectedBikesLeft.includes(b))]);
        setBikesRight([...bikesRight.filter(b => !selectedBikesRight.includes(b))]);
        clearSelections();
    }

    return (
        <Container>
            <Row>
                <Col md="3">
                    <ListGroup>
                        {bikesLeft.map(bike => <ListGroup.Item active={selectedBikesLeft.includes(bike)} action onClick={() => bikeSelectionHandler(bike, "left")} key={bike}>{bike}</ListGroup.Item>)}
                    </ListGroup>
                </Col>
                <Col md="auto" className='btn-group-vertical'>
                    <Button action onClick={() => moveAll("right")}>{">>"}</Button>
                    <Button action onClick={() => moveBikes("right")}>{">"}</Button>
                    <Button action onClick={() => moveBikes("left")}>{"<"}</Button>
                    <Button action onClick={() => moveAll("left")}>{"<<"}</Button>
                    <Button action onClick={() => removeSelectedBikes()}>{"Del"}</Button>
                </Col>

                <Col md="3">
                    <ListGroup>
                        {bikesRight.map(bike => <ListGroup.Item active={selectedBikesRight.includes(bike)} action onClick={() => bikeSelectionHandler(bike, "right")} key={bike}>{bike}</ListGroup.Item>)}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}