import { XCircleFill } from "react-bootstrap-icons";

const ErrorNotification = ({ header, body, setLoginError, bgcolor }) => {
  return (
    <div className={`notification ${bgcolor ? "successNoti" : ""}`}>
      <button onClick={() => setLoginError(false)} className="xButton">
        <XCircleFill />
      </button>
      <h3>{header}</h3>
      <div>{body}</div>
    </div>
  );
};
export default ErrorNotification;
