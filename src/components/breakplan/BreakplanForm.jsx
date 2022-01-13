import React, { useState, useEffect } from "react";
import { Card, Button, Form } from 'react-bootstrap'
import { Icon } from '@iconify/react';
import { CreateNewPlan } from '../../api/breackPlan'
import style from './style.module.css'
import { useToasts } from 'react-toast-notifications';
import Loader from "react-spinners/BeatLoader";

function BreackplanFrom({
    show, setShow, newTime, joinOrSagest
}) {
    const { addToast } = useToasts();
    const [loading, setloading] = useState(false)
    //
    const [close, setClose] = useState(true)
    const [newSaggestion, setNewSaggestion] = useState(false)
    // Create Plane
    const [newBreak, setNewBreak] = useState({
        title: "",
        createIime: ""
    })
    useEffect(() => {
        if (show) {
            setClose(false)
        }
    }, [show])
    // create Breack plan
    const handleCreatePlan = async (e) => {
        e.preventDefault();
        if (newBreak.title != "" && newBreak.createIime != "") {
            setloading(true)
            const { status } = await CreateNewPlan(newBreak)
            if (status === 200) {
                addToast("Created Susseccfully", { autoDismiss: true, appearance: 'success' });
                setNewBreak({ ...newBreak, ["title"]: "", ["createIime"]: "" })
                setShow(false)
                setClose(true)
                setloading(false)
            } else {
                addToast("Error Please Try Again!", { autoDismiss: false, appearance: 'error' });
                setloading(false)
            }
        }
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
                                : <>
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
                                                value={newBreak.title}
                                                onChange={(e) =>
                                                    setNewBreak({ ...newBreak, [e.target.name]: e.target.value })
                                                }

                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control
                                                type="time"
                                                placeholder="Time"
                                                name="createIime"
                                                value={newBreak.createIime}
                                                onChange={(e) =>
                                                    setNewBreak({ ...newBreak, [e.target.name]: e.target.value })
                                                }
                                            />
                                        </Form.Group>
                                        <Button disabled={loading} className={style.withBtn} variant="primary" type="submit">
                                            {
                                                loading ? <Loader color="#fff" size={15} /> : "Create New Plan"
                                            }
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