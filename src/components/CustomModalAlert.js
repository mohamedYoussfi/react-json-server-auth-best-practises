import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function CustomModalAlert (props) {
  return (

    <Modal  show={props.show} onHide={props.close}>
      <Modal.Header closeButton className={"bg-info bg-opacity-25"}>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <pre>{props.messsage}</pre>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>Close Modal</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomModalAlert