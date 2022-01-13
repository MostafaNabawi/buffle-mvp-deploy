import React, { useState, useEffect } from "react";
import { Card, Button, Form } from 'react-bootstrap'
import { Icon } from '@iconify/react';
import style from './style.module.css'

function BreackplanFrom({
    show, setShow, newTime, joinOrSagest
}) {
    const [close, setClose] = useState(true)
    const [newSaggestion, setNewSaggestion] = useState(false)
    // Create Plane
    const [newBreack ,setNewBreack]=useState({
        title:"",
        createIime:""
    })
    useEffect(() => {
        if (show) {
            setClose(false)
        }
    }, [show])
    const handleCreatePlan =(e)=>{
        e.preventDefault();
        console.log("Create paln",newBreack)
    }
    return (
        <div className={`${style.manCard} ${close ? style.hide : style.show}`}>
            <Card className={`${style.customCard} pb-1`}>
                <div>
                    <i className={style.closeIcon} onClick={() => {
                        setShow(false)
                        setClose(true)
                    }} ><Icon icon="ci:close-big" /></i>
                </div>
                <Card.Body>
                    {
                        joinOrSagest
                            ?
                            <>
                                {/* <Card.Title className={style.tilte}>
                                    Join Or new Sagest
                                </Card.Title> */}
                                <Card.Text className="text-center">
                                    <Button variant="outline-primary" onClick={() => { setNewSaggestion(false) }} className={style.customBtn}>Join</Button>
                                    <Button variant="outline-primary" onClick={() => { setNewSaggestion(!newSaggestion) }} className={style.customBtn}>Suggestion</Button>
                                    {
                                        newSaggestion
                                            ?
                                            <Form className="mt-3">
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control
                                                        autoFocus
                                                        as="textarea"
                                                        type="email"
                                                        placeholder="New Saggestion"
                                                    />
                                                </Form.Group>
                                                <Button className={style.withBtn} variant="primary" type="submit">
                                                    Send
                                                </Button>
                                            </Form>
                                            : ""
                                    }
                                </Card.Text>
                            </>
                            :
                            newTime ?
                             <>
                             <Card.Title className={style.tilte}>
                             Saggest new time
                                </Card.Title> 
                                <Card.Text className="text-center">
                                    <Form className="mt-3">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control
                                                autoFocus
                                                type="time"
                                                placeholder="Saggest new time"
                                            />
                                        </Form.Group>
                                        <Button className={style.withBtn} variant="primary" type="submit">
                                            Send
                                        </Button>
                                    </Form>
                                </Card.Text>
                             </>
                                :<>
                                <Card.Title className={style.tilte}>
                               New breack pland
                                   </Card.Title> 
                                <Form onSubmit={handleCreatePlan} className="mt-3">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                            autoFocus
                                            type="text"
                                            name="title"
                                            placeholder="Plan Title"
                                            
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                            type="time"
                                            placeholder="Time"
                                            name="createIime"
                                        />
                                    </Form.Group>
                                    <Button className={style.withBtn} variant="primary" type="submit">
                                    Create New Plan
                                    </Button>
                                </Form>
                                </>
                    }

                </Card.Body>
            </Card>
        </div>
    );
}

export default BreackplanFrom;