import { React,useState } from "react";
import { Row, Col, ProgressBar } from "react-bootstrap";
import { Icon } from '@iconify/react';
import style from './style.module.css'

const PreogressBar = ({ lable }) => {
    const [play,setPlay]=useState(false)
    return (
        <>
            <Row>
                <Col xl="10">
                    <Icon className={style.iconWatch} icon="icon-park-outline:stopwatch-start" />
                    <ProgressBar
                        label={`${lable}`}
                        now={60}
                        className={style.progress}
                    />
                </Col>
                <Col className="m-0" xl="2">
                    <div onClick={()=>setPlay(!play)} className={`${style.iconProgress }  text-center`}>
                        {
                            play
                            ?<Icon icon="gg:play-pause" />
                            : <Icon icon="bi:play-fill" />
                        }
                       
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default PreogressBar;