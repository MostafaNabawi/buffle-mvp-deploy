import { React, useState } from "react";
import Item from '../item';
import DropWrapper from '../DropWrapper';
import { data, statuses } from '../data';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Icon } from "@iconify/react";
const ProjectManagement = () => {
    const [items, setItems] = useState(data)

    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);

        setItems(prevState => {
            const newItems = prevState.filter(i => i.id !== item.id).concat({ ...item, status, icon: mapping.icon })
            return [...newItems]
        });

    };
    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [...newItems];

        });
    };
    console.log(statuses)
    return (
        <Row className="projectManagement">
            {
                statuses.map((s => {
                    return (
                        <Col key={s.status} className={"col-wrapper secondary-dark"}>
                            <Row className={"col-header"}>
                                <Col lg="10">{s.title}</Col>
                                <Col lg="2" className="project-setting">
                                    <Icon icon="icon-park-outline:setting" className="project-setting-icon" />
                                </Col>
                            </Row>
                            <hr className="task-manage-hr" />
                            <DropWrapper onDrop={onDrop} status={s.status}>
                                <Col >
                                    {
                                        items.filter(i => i.status === s.status)

                                            .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s}></Item>)
                                    }
                                    <div className="new-task-div">
                                        <input className="new_task_input" placeholder="New Task" aria-label="New Task" />
                                    </div>
                                </Col>
                            </DropWrapper>

                        </Col >
                    );
                }))
            }
        </Row >
    )
};
export default ProjectManagement;
