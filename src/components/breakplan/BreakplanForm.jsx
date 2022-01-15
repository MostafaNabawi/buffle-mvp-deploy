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
    const [newSuggestInput ,setNewSuggestInput]=useState('')
    const [newSuggestTime,setNewSuggestTime]=useState('')
    const [newBreak, setNewBreak] = useState({title: "",createIime: ""})
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
    // New saggest
    const handleNewSuggest =async (e)=>{
        e.preventDefault();
        console.log("new Suggest",newSuggestInput) 
    }
    // Saggest new time
    const handleSuggestNowTime =(e)=>{
        e.preventDefault();
        console.log("new time:",newSuggestTime)
    }
    return (
        <div className={`${style.manCard} ${close ? style.hide : style.show}`}>
            <Card className={`${style.customCard} pb-1`}>
                <div>
                    <i className={style.closeIcon} onClick={() => {
                        setNewBreak({ ...newBreak, ["title"]: "", ["createIime"]: "" })
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
                                            <Form className="mt-3" onSubmit={handleNewSuggest}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control
                                                        autoFocus
                                                        required
                                                        value={newSuggestInput}
                                                        as="textarea"
                                                        type="email"
                                                        placeholder="New Saggestion"
                                                        onChange={(e)=>setNewSuggestInput(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Button disabled={loading} className={style.withBtn} variant="primary" type="submit">
                                                {
                                                loading ? <Loader color="#fff" size={15} /> : "Send"
                                            }
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
                                        Suggest new time
                                    </Card.Title>
                                    <Card.Text className="text-center">
                                        <Form className="mt-3" onSubmit={handleSuggestNowTime}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control
                                                    autoFocus
                                                    value={newSuggestTime}
                                                    type="time"
                                                    placeholder="Saggest new time"
                                                    onChange={(e)=>setNewSuggestTime(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Button disabled={loading} className={style.withBtn} variant="primary" type="submit">
                                            {
                                                loading ? <Loader color="#fff" size={15} /> : "Send"
                                            }
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
                                                required
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
                                                required
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