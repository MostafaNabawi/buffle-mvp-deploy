import { React,useState } from "react";
import { Row, Col, ProgressBar } from "react-bootstrap";
import { Icon } from '@iconify/react';

const PreogressBar = ({ lable }) => {
    const [play,setPlay]=useState(true)
    return (
        <>
            <Row className="pt-3 pb-0 mb-0 mr-3">
                <Col xl="10">
                    <Icon className="icon-watch" icon="icon-park-outline:stopwatch-start" />
                    <ProgressBar
                        label={`${lable}`}
                        now={60}
                    />
                </Col>
                <Col className="m-0" xl="2">
                    <div onClick={()=>setPlay(!play)} className="icon-progress text-center">
                        {
                            play
                            ?<Icon icon="gg:play-pause" />
                            : <Icon icon="clarity:play-line" />
                        }
                       
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default PreogressBar;