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
    async function request() {
      const data = await getTask();
      const format = data.data.map((i, n) => {
        return {
          id: n,
          status: moment(i.date, "YYYY-MM-DD HH:mm:ss").format("dddd"),
          content: i.name,
          tb_id: i._id,
        };
      });
      setItems(format);
    }
    request();
  }, []);

  const handleKeyDownWeekDaysItem = async (event) => {
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
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status });
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
                  .filter((i) => i.status === s.status)
                  .map((i, idx) => (
                    <Item
                      key={i.id}
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
                        setInputTask({ name: e.target.value })

                      )
                      }
                      onKeyDown={handleKeyDownWeekDaysItem}
                    />
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
