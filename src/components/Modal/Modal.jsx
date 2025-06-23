import "./Modal.css";
import close from "../../assets/close.png";

function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-top">
        <img
          className="modal-close"
          src={close}
          alt=""
          onClick={props.close}
        />
      </div>

      <div className="modal-bottom">
        <div className="modal-title">{props.msg}</div>

        {props.children}
      </div>
    </div>
  );
}

export default Modal;
