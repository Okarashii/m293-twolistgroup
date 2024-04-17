import './TwoListGroup.css';
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function TwoListGroup() {
    const [bikesLeft, setBikesLeft] = useState([
        {id: 0, make: 'Honda', model: "CBR 1000", ps: 191, capacity: 1000},
        {id: 1, make: 'Ducati', model: "Monster 1200s", ps: 147, capacity: 1198},
        {id: 2, make: 'Yamaha', model: "MT-01", ps: 90, capacity: 1670},
        {id: 3, make: 'KTM', model: "Superduke 1200", ps: 177, capacity: 1301},
        {id: 4, make: 'Triumph', model: "Triple Speed", ps: 148, capacity: 1050},
    ]);

    const [bikesRight, setBikesRight] = useState([{id: -1, make: '', model: "", ps: 0, capacity: 0}]);
    const [selectedBikesLeft, setSelectedBikesLeft] = useState([{id: -1, make: '', model: "", ps: 0, capacity: 0}]);
    const [selectedBikesRight, setSelectedBikesRight] = useState([{id: -1, make: '', model: "", ps: 0, capacity: 0}]);
    const [displayedInfoIds, setDisplayedInfoIds] = useState([-1]);

    useEffect(() => {
        setBikesRight([]);
        setSelectedBikesLeft([]);
        setSelectedBikesRight([]);
        setDisplayedInfoIds([]);
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

        setDisplayedInfoIds([]);
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
        setDisplayedInfoIds([]);
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

    const infoButtonHandler = () => {
        if (displayedInfoIds.length > 0) {
            setDisplayedInfoIds([]);
        }
        
        setDisplayedInfoIds([
            ...selectedBikesLeft.filter(b => !displayedInfoIds.includes(b.id)).map(b => b.id),
            ...selectedBikesRight.filter(b => !displayedInfoIds.includes(b.id)).map(b => b.id)
        ]);
        clearSelections();
    }

    return (
        <Container>
            <Row>
                <Col md="3">
                    <ListGroup>
                        {bikesLeft.map(bike => {
                            if (!displayedInfoIds.includes(bike.id)) {
                                return (<ListGroup.Item
                                    active={selectedBikesLeft.includes(bike)}
                                    action
                                    onClick={() => bikeSelectionHandler(bike, "left")}
                                    key={bike.id}>
                                    {bike.make} {bike.model}
                                </ListGroup.Item>)
                            }
                            else {
                                return (<ListGroup.Item
                                    active={selectedBikesLeft.includes(bike)}
                                    action
                                    onClick={() => bikeSelectionHandler(bike, "left")}
                                    key={bike.id}>
                                    Marke: {bike.make}<br/>
                                    Typ: {bike.model}<br/>
                                    PS: {bike.ps}<br/>
                                    Hubraum: {bike.capacity}cm³
                                </ListGroup.Item>)
                            }
                        })}
                    </ListGroup>
                </Col>
                <Col md="auto" className='btn-group-vertical'>
                    <Button action onClick={() => moveAll("right")}>{">>"}</Button>
                    <Button action onClick={() => moveBikes("right")}>{">"}</Button>
                    <Button action onClick={() => moveBikes("left")}>{"<"}</Button>
                    <Button action onClick={() => moveAll("left")}>{"<<"}</Button>
                    <Button action onClick={() => removeSelectedBikes()}>{"Del"}</Button>
                    <Button action onClick={() => infoButtonHandler()}>{"Info"}</Button>
                </Col>

                <Col md="3">
                <ListGroup>
                    {bikesRight.map(bike => {
                        if (!displayedInfoIds.includes(bike.id)) {
                            return (<ListGroup.Item
                                active={selectedBikesRight.includes(bike)}
                                action
                                onClick={() => bikeSelectionHandler(bike, "right")}
                                key={bike.id}>
                                {bike.make} {bike.model}
                            </ListGroup.Item>)
                        }
                        else {
                            return (<ListGroup.Item
                                active={selectedBikesRight.includes(bike)}
                                action
                                onClick={() => bikeSelectionHandler(bike, "right")}
                                key={bike.id}>
                                Marke: {bike.make}<br/>
                                Typ: {bike.model}<br/>
                                PS: {bike.ps}<br/>
                                Hubraum: {bike.capacity}cm³
                            </ListGroup.Item>)
                        }
                    })}
                </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}