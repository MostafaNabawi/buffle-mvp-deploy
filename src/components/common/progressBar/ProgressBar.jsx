import { React, useState } from "react";
import { Row, Col, ProgressBar } from "react-bootstrap";
import { Icon } from '@iconify/react';
import style from './style.module.css'

const PreogressBar = ({ lable, percent }) => {
    const [play, setPlay] = useState(true)
    return (
        <>
            <Row>
                <Col xl="11" className="pl-0">
                    <Icon
                        color={play && percent > 0 ? '' : `#4922ff`}
                        className={style.iconWatch} icon="bi:clock-fill"
                    />
                    <ProgressBar
                        label={`${lable}`}
                        now={percent}
                        className={style.progress}
                    />
                </Col>
                <Col className={style.iconPlay} xl="1">
                    <div onClick={() => setPlay(!play)} className={`${style.iconProgress}  text-center`}>
                        {
                            play
                                ? <Icon icon="gg:play-pause" />
                                : <Icon icon="bi:play-fill" />
                        }

                    </div>
                </Col>
            </Row>
        </>
    )
}
export default PreogressBar;