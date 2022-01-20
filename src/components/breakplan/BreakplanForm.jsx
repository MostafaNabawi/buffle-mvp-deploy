import React, { useState, useEffect } from "react";
import { Card, Button, Form } from 'react-bootstrap'
import { Icon } from '@iconify/react';
import { CreateNewPlan } from '../../api/breackPlan'
import style from './style.module.css'
import { useToasts } from 'react-toast-notifications';
import Loader from "react-spinners/BeatLoader";
import { checkEmail} from '../../config/utils'
import { API_URL } from "../../config";

function BreackplanFrom({
    show, setShow, newTime, joinOrSagest,invateForm,
    timeData
}) {
    const { addToast } = useToasts();
    const [loading, setloading] = useState(false)
    //
    const [close, setClose] = useState(true)
    const [newSaggestion, setNewSaggestion] = useState(false)
    // Create Plane
    const [newSuggestInput ,setNewSuggestInput]=useState('')
    const[newSuggestInputError,setNewSuggestInputError]=useState('')
    const [newSuggestTime,setNewSuggestTime]=useState('')
    const [SuggestTimeError,setSuggestTimeError]=useState(false)
    const [newBreak, setNewBreak] = useState({title: "",createIime: ""})
    // invit
    const [email,setEmail]=useState('')
    const [emailError,setEmailError]=useState('')
    function checkEmail(value) {
        if (
          !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value
          )
        ) {
            setEmailError('error')
          return false;
        } else {
            setEmailError('')
          return true;
        }
      }
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
        if(newSuggestInput){
            setNewSuggestInputError(false)
            setloading(true)
            const data= JSON.parse(localStorage.getItem('user'))
             await fetch(`${API_URL}/breakPlan/invite `,{
                 method: "POST",
                 credentials: "include",
                 headers: {
                     "Content-Type": "application/json",
                     "Access-Control-Allow-Credentials": true,
                 },
                 body: JSON.stringify({
                     fname: data.first_name,
                     lname: data.last_name,
                     message:newSuggestInput
                 })
             }).then(res=>{
                 if(res.status==200){
                     addToast("Sended", { autoDismiss: true, appearance: 'success' });
                     setNewSuggestInput('')
                     setShow(false)
                     setClose(true)
                     setloading(false)
                 }else{
                     addToast("Error Please Try Again!", { autoDismiss: true, appearance: 'error' });
                     setloading(false)
                 }
             })

        }else{
            setNewSuggestInputError(true)
        }
    }
    // Join
    const handleJoin =async(e)=>{
        console.log("join")
    }
    // Suggest new time
    const  handleSuggestNewTime =async (e)=>{
        e.preventDefault();
        const data={...timeData,['time']:newSuggestTime}
        console.log("timeData.....",data)
        if(newSuggestTime){
            setSuggestTimeError(false)
            setloading(true)
             await fetch(`${API_URL}/breakPlan/suggest-new-time `,{
                 method: "POST",
                 credentials: "include",
                 headers: {
                     "Content-Type": "application/json",
                     "Access-Control-Allow-Credentials": true,
                 },
                 body: JSON.stringify(data)
             }).then(res=>{
                 if(res.status==200){
                     addToast("Sended", { autoDismiss: true, appearance: 'success' });
                     setEmail('')
                     setShow(false)
                     setClose(true)
                     setloading(false)
                 }else{
                     addToast("Errror Please Try Again!", { autoDismiss: true, appearance: 'error' });
                     setloading(false)
                 }
             })
        }else{
            setSuggestTimeError(true)
        }
    }
    // Invit
    const handleInvit =async (e)=>{
        e.preventDefault();
        if(checkEmail(email)){
            setloading(true)
           const data= JSON.parse(localStorage.getItem('user'))
            await fetch(`${API_URL}/breakPlan/invite `,{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    fname: data.first_name,
                    lname: data.last_name,
                    email:email
                })
            }).then(res=>{
                if(res.status==200){
                    addToast("Sended", { autoDismiss: true, appearance: 'success' });
                    setEmail('')
                    setShow(false)
                    setClose(true)
                    setloading(false)
                }else{
                    addToast("User by this email not found !", { autoDismiss: true, appearance: 'error' });
                    setloading(false)
                }
            })
        }
    }
    return (
        <div className={`${style.manCard} ${close ? style.hide : style.show}`}>
            <Card className={`${style.customCard} pb-1`}>
                <div>
                    <i className={style.closeIcon} onClick={() => {
                        setNewBreak({ ...newBreak, ["title"]: "", ["createIime"]: "" })
                        setEmail('')
                        setShow(false)
                        setClose(true)
                    }} ><Icon icon="ci:close-big" /></i>
                </div>
                <Card.Body>
                    {
                        joinOrSagest
                            ?
                            <>
                                <Card.Title className={style.tilte}>
                                    Join Or Set new Sagest
                                </Card.Title>
                                <Card.Text className="text-center pt-3">
                                    <Button variant="outline-primary" onClick={() => { 
                                        setNewSaggestion(false) 
                                        handleJoin()
                                        }} className={style.customBtn}>Join</Button>
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
                                                        className={newSuggestInputError?"red-border-input":""}
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
                                        <Form className="mt-3" onSubmit={handleSuggestNewTime}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control
                                                    autoFocus
                                                    value={newSuggestTime}
                                                    className={SuggestTimeError?"red-border-input":""}
                                                    type="time"
                                                    placeholder="Saggest new time"
                                                    onChange={(e)=>setNewSuggestTime(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Button
                                              disabled={loading} className={style.withBtn} variant="primary" type="submit">
                                            {
                                                loading ? <Loader color="#fff" size={15} /> : "Send"
                                            }
                                            </Button>
                                        </Form>
                                    </Card.Text>
                                </>
                                :invateForm ?
                                <>
                                <Card.Title className={style.tilte}>
                                        Invite to your break plan
                                    </Card.Title>
                                    <Form onSubmit={handleInvit} className="mt-3">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control
                                                autoFocus
                                                required
                                                type="email"
                                                name="email"
                                                className={emailError ===""?"":"red-border-input"}
                                                placeholder="Invaite Email"
                                                value={email}
                                                onChange={(e) =>{
                                                    setEmail(e.target.value)
                                                    // checkEmail(e.target.value)
                                                }
                                                }

                                            />
                                        </Form.Group>
                                        
                                        <Button disabled={loading} className={style.withBtn} variant="primary" type="submit">
                                            {
                                                loading ? <Loader color="#fff" size={15} /> : "Invite"
                                            }
                                        </Button>
                                    </Form>
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