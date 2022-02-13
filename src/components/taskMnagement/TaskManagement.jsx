
import { React, useState, useEffect } from "react";
import Item from "./item";
import DropWrapper from "./DropWrapper";
import { statuses } from "./data";
import { Col, Form, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { createTask, getTask, deleteTask, userStatus } from "../../api";
import { ITEM_TYPE } from "./data/types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const TaskManagement = ({ handleGet, val, colChange, projectDroped }) => {
  const { addToast } = useToasts();
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);
  const [inputTask, setInputTask] = useState({ name: "", day: "", p_id: '' });
  const [newItems, setNewItems] = useState(false);
  const [id, setId] = useState('');
  const [checkDrop, setCheckDrop] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  async function request() {
    const data = await getTask();
    const format = data?.data?.map((i, n) => {
      return {
        id: n,
        status: i.day_of_week,
        content: i.name,
        tb_id: i._id,
        description: i.description,
        date: i.date,
        p_id: i.projectId,
        start_time: i.start_time,
        completed: i.status,
        day_of_week: i.day_of_week,
        color: i.project_tasks[0]?.color
      };
    });
    setItems(format);
  }
  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    if (newItems) {
      request();
      setNewItems(false);
    }
  }, [newItems]);

  useEffect(() => {


    if (id || val || checkDrop || colChange || projectDroped) {
      request();
    }
  }, [id, val, checkDrop, colChange, projectDroped]);

  const handleChecked = (id) => {
    handleGet(id);
    setId(id);
  }
  const handleDrop = (val) => {
    setCheckDrop(val)
  }
  const handleKeyDownWeekDaysItem = async (event) => {
    if (event.key === "Enter") {
      const createT = await createTask(inputTask, 0, 0, false, 'stop');
      if (createT.status === 200) {
        addToast("Created Susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });
        setNewItems(true);
        setInputTask({ name: '', p_id: '' });
      } else {
        addToast("Error Please Try Again!", {
          autoDismiss: false,
          appearance: "error",
        });
        setInputTask({ name: '', p_id: '' });
      }
    }
  };
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
  const handleDelete = async (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteT = await deleteTask(id);

          if (deleteT.status === 200) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            handleClose();
            const d = items.filter(i => i.tb_id !== id);
            setItems(d);
            handleGet(id);
          } else {
            addToast("Error: Please Try Again!.", {
              appearance: "error",
              autoDismiss: true,
            });
            handleClose();
          }
        } catch (error) {
          addToast("Error: Please Try Again!.", {
            appearance: "error",
            autoDismiss: true,
          });
          handleClose();
        }
      }
    });
  };
  return (
    <Row>
      {statuses.map((s) => {
        return (
          <Col key={s.status} className={"col-wrapper secondary-dark"}>
            <div className={"col-header"}>
              <span>{s.status}</span>
              {/* <span className={"col-header-time"}>2.14</span> */}
            </div>
            <hr />
            <DropWrapper onDrop={onDrop} status={s.status} idNumber={s.id} handleDrop={handleDrop}>
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
                      PTYPE={ITEM_TYPE}
                      className="task_item"
                      handleGet={handleGet}
                      handleChecked={handleChecked}
                      handleDelete={handleDelete}
                    ></Item>
                  ))}
                <div className="new-task-div">
                  <Form.Group className="mb-3" controlId="form-new-task">
                    <input
                      type="text"
                      className="new_task_input"
                      placeholder="New Task"
                      aria-label="New Task"
                      onChange={(e) => setInputTask({ name: e.target.value, day: s.status })}
                      onKeyDown={handleKeyDownWeekDaysItem}
                      value={inputTask.name}
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