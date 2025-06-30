import "./Modal.css";
import close from "../../assets/close.png";

function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-top justify-end flex mr-2">
        <img
          className="modal-close"
          src={close}
          alt=""
          onClick={props.close}
        />
      </div>

      <div className="modal-bottom flex">
        <div className="modal-title mb-4">{props.msg}
        {props.children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
