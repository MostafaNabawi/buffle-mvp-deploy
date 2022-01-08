import { React, useState } from "react";
import Item from './item';
import DropWrapper from './DropWrapper';
import { data, statuses } from './data';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
const TaskManagement = () => {
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

  return (
    <Row >
      {
        statuses.map((s => {
          return (
            <Col key={s.status} className={"col-wrapper secondary-dark"}>
              <div className={"col-header"}>
                <span>{s.status}</span>
                <span className={"col-header-time"}>2.14</span></div>
              <DropWrapper onDrop={onDrop} status={s.status}>
                <Col >
                  {
                    items.filter(i => i.status === s.status)

                      .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s}>{console.log(i)}</Item>)
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
export default TaskManagement;
