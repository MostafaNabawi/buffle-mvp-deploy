
import { React, useState, useEffect, useContext } from "react";
import Item from "./item";
import DropWrapper from "./DropWrapper";
import { statuses } from "./data";
import { Col, Form, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { createTask, getTask, deleteTask, userStatus } from "../../api";
import { ITEM_TYPE } from "./data/types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FormattedMessage } from "react-intl";
import moment from 'moment';
import { Context } from "../../layout/Wrapper";

const TaskManagement = ({ handleGet, val, colChange, projectDroped }) => {
  const context = useContext(Context);
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
  const [showSkleton, setShowSkleton] = useState(false);
  async function request() {
    setShowSkleton(true);
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
    setShowSkleton(false);
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


    if (id || val || colChange || projectDroped) {
      request();
    }
  }, [id, val, colChange, projectDroped]);

  const handleChecked = (id) => {
    handleGet(id);
    setId(id);
  }
  const handleDrop = (id) => {

    setCheckDrop(val)
  }

  const handleKeyDownWeekDaysItem = async (event) => {
    if (event.key === "Enter") {
      const createT = await createTask(inputTask, 0, 0, false, 'stop');
      if (createT.status === 200) {
        // addToast("Created Susseccfully", {
        //   autoDismiss: true,
        //   appearance: "success",
        // });
        setNewItems(true);
        setInputTask({ name: '', p_id: '' });
      } else {
        addToast(
          <FormattedMessage
            defaultMessage="Error Please Try Again."
            id="breakPlan.Error"
          />, {
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
    const titleMsg =
      context.getCurrent() === 0 ? "Are you sure?" : "Bist du dir sicher?";
    MySwal.fire({
      title: titleMsg,
      text:
        context.getCurrent() === 0
          ? "You won't be able to revert this."
          : "Änderungen sind nicht mehr möglich.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: context.getCurrent() === 0 ? "Cancel" : "Abbrechen",
      confirmButtonText: context.getCurrent() === 0 ? "Yes" : "Fortfahren",
      reverseButtons: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteT = await deleteTask(id);

          if (deleteT.status === 200) {
            const msg = context.getCurrent() === 0 ? "Deleted" : "gelöscht";

            const msg2 =
              context.getCurrent() === 0
                ? "Your file has been deleted."
                : "Gelöscht,Ihre Datei wurde gelöscht.";
            Swal.fire(msg, msg2, "success");
            handleClose();
            const d = items.filter(i => i.tb_id !== id);
            setItems(d);
            handleGet(id);
          } else {
            addToast(
              <FormattedMessage
                defaultMessage="Error Please Try Again."
                id="breakPlan.Error"
              />, {
              appearance: "error",
              autoDismiss: true,
            });
            handleClose();
          }
        } catch (error) {
          addToast(
            <FormattedMessage
              defaultMessage="Error Please Try Again."
              id="breakPlan.Error"
            />, {
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
          <Col key={s.status} className={`col-wrapper secondary-dark ${moment(new Date()).format('dddd') === s.status ? 'today-col' : ''}`}>
            <div className={"col-header"}>
              <span ><FormattedMessage defaultMessage={s.status} id={`day.${s.status}`} /></span>
              <span className="important-today-week-date">{moment().day(s.day).format('DD.MM')}</span>
            </div>
            <hr />
            <DropWrapper onDrop={onDrop} status={s.status} idNumber={s.day} handleDrop={handleDrop}>
              <Col>
                {showSkleton ? <Skeleton className="important-today-skeleton" count={1} /> : items
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
                <div className="new-task-divimport FreelancerRegister from './../user/register/Freelancer';">
                  <Form.Group className="mb-3" controlId="form-new-task">
                    <FormattedMessage id="task.new" defaultMessage="New Task" >
                      {(msg) => (
                        <input
                          type="text"
                          className="new_task_input"
                          placeholder={msg}
                          aria-label="New Task"
                          onChange={(e) => setInputTask({ name: e.target.value, day: s.status })}
                          onKeyDown={handleKeyDownWeekDaysItem}
                          value={inputTask.name}
                        />
                      )}
                    </FormattedMessage>
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