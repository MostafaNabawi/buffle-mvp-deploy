import React from "react";
import { Modal, Button } from 'react-bootstrap'
function CustomModal(props) {
  const { modalHeader, modalBody } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalHeader}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalBody}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default CustomModal;