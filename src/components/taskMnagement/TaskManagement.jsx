import { React, useState, useEffect } from "react";
import Item from "./item";
import DropWrapper from "./DropWrapper";
import { statuses } from "./data";
import { Col, Form, Row } from "react-bootstrap";
import { useToasts } from 'react-toast-notifications';
import { createTask, getTask } from "../../api";
import moment from 'moment';

const TaskManagement = () => {
  const { addToast } = useToasts();
  const [items, setItems] = useState([]);

  const [inputTask, setInputTask] = useState({ name: '', p_id: '' });


  useEffect(() => {
    async function getTaskF() {
      const task = await getTask();
      setItems(task.data);
    }
    getTaskF();
  }, [])

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      const createT = await createTask(inputTask);
      if (createT.status === 200) {
        addToast("Created Susseccfully", { autoDismiss: true, appearance: 'success' });
        setItems(arr => [
          ...arr, {}
        ]);
        setInputTask('');
      }
      else {
        addToast("Error Please Try Again!", { autoDismiss: false, appearance: 'error' });
      }
    }
  }
  const onDrop = (item, monitor, status) => {

    setItems((prevState) => {

      const newItems = prevState
        .filter((i) => i._id !== item._id)
        .concat({ ...item, status });
      console.log(newItems)
      return [...newItems];
    });
  };
  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];

    setItems((prevState) => {

      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  return (
    <Row>
      {statuses.map((s) => {

        return (
          <Col key={s.status} className={"col-wrapper secondary-dark"}>
            <div className={"col-header"}>
              <span>{s.status}</span>
              <span className={"col-header-time"}>2.14</span>
            </div>
            <hr />
            <DropWrapper onDrop={onDrop} status={s.status}>
              <Col>
                {items
                  .filter((i) => moment(i.date, "YYYY-MM-DD HH:mm:ss").format('dddd') === s.status)
                  .map((i, idx) => (
                    <Item
                      key={i._id}
                      item={i}
                      index={idx}
                      moveItem={moveItem}
                      status={s}
                      className="task_item"
                    ></Item>
                  ))}
                <div className="new-task-div">
                  <Form.Group className="mb-3" controlId="form-new-task">
                    <input type="text" className="new_task_input"
                      placeholder="New Task"
                      aria-label="New Task" onChange={(e) => (
                        setInputTask({ name: e.target.value, p_id: s._id })

                      )
                      }
                      onKeyDown={handleKeyDown} />
                  </Form.Group>
                </div>
              </Col>
            </DropWrapper>
          </Col>
        );
      })}
    </Row>
  );
};
export default TaskManagement;
