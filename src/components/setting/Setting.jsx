import { React,useState } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Form } from "react-bootstrap";
import { Icon } from '@iconify/react';
import style from "./style.module.css"
import { API_URL} from "../../config/index";
import { checkEmail } from "../../config/utils";
import PulseLoader from "react-spinners/PulseLoader";
import { useToasts } from "react-toast-notifications";

const Setting = () => {
    const { addToast } = useToasts();
    const [email,setEmail]=useState('')
    const [loading,setLoading]=useState(false)

    const handleSubmit =async(e)=>{
        e.preventDefault();
        if (email  === "") {
            addToast("Email is required!  👀", {
              appearance: "warning",
              autoDismiss: 4000,
            });
            return;
          }
        if (!checkEmail(email)) {
            addToast("Invalid Email!", {
              appearance: "warning",
              autoDismiss: 4000,
            });
            return;
          }
          try{
              setLoading(true)
            await fetch(`${API_URL}/invite/invite-by-email`,{
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                  email: email,
                }),
            }).then((res)=>{
                if(res.status === 200){
                    setLoading(false)
                    addToast("Invitation email send!", {
                        appearance: "success",
                        autoDismiss: 4000,
                    });
                    setEmail('')
                }else{
                    addToast("This email was not register in buffle. please tru again!", {
                        appearance: "error",
                        autoDismiss: 4000,
                    });
                    setLoading(false)
                }
            })
          }catch{
              setLoading(false)
          }
    }
    return (
        <Col xl="8" className="pt-5">
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item className="pb-3">
                        <h4>Invite Link</h4>
                        <i>https://join.weekrise.com/Fjabaakoiuhliuhsp51C72m8</i>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className={style.btn}><Icon icon="akar-icons:copy" /> Copy to clipboard</Button>
                        <Button className={style.btn}>Regeneration</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item className="pb-3">
                        <h4>Invite Email</h4>
                    </ListGroup.Item>
                    <ListGroup.Item className="pb-3">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="input-group mb-3 mt-3" controlId="formBasicEmail">
                                <Form.Control disabled={loading} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Enter email" />
                                <Button disabled={loading} variant="primary" type="submit">
                                {loading ? <PulseLoader size={10} /> : "Send"}
                                </Button>
                            </Form.Group>

                        </Form>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    );
};

export default Setting;