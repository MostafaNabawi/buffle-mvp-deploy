import React, { useState, useEffect } from "react";
import { Card, Button, Form } from 'react-bootstrap'
import { Icon } from '@iconify/react';
import style from './style.module.css'

function BreackplanFrom({
    title, show, setShow, newTime, joinOrSagest
}) {
    const [close, setClose] = useState(true)
    const [newSaggestion, setNewSaggestion] = useState(false)
    useEffect(() => {
        if (show) {
            setClose(false)
        }
    }, [show])
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
                    <Card.Title>
                        {title}
                    </Card.Title>
                    {
                        joinOrSagest
                            ? <Card.Text className="text-center">
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
                            :
                            newTime ?
                                <Card.Text className="text-center">

                                    <Form className="mt-3">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control
                                                autoFocus
                                                type="text"
                                                placeholder="Saggest new time"
                                            />
                                        </Form.Group>
                                        <Button className={style.withBtn} variant="primary" type="submit">
                                            Send
                                        </Button>
                                    </Form>
                                </Card.Text>
                                : 
                                <Form className="mt-3">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control
                                                autoFocus
                                                type="text"
                                                placeholder="Plan Title"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control
                                                type="time"
                                                placeholder="Time"
                                            />
                                        </Form.Group>
                                        <Button className={style.withBtn} variant="primary" type="submit">
                                          Set
                                        </Button>
                                    </Form>
                    }

                </Card.Body>
            </Card>
        </div>
    );
}

export default BreackplanFrom;