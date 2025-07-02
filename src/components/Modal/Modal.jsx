import "./Modal.css";

function Modal(props) {
  return (
    <div className="modal">
<<<<<<< HEAD
      <div className="modal-top">
        <button className="modal-close" onClick={props.close} aria-label="닫기">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 
              .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 
              8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
      </div>

      <div className="modal-bottom flex-col">
        <div className="modal-title">{props.msg}</div>
        <div>
          {props.children}
=======
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
>>>>>>> cw
        </div>
      </div>
    </div>
  );
}

export default Modal;
