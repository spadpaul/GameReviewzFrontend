import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowClockwise,
  Google,
  Controller,
  Apple,
} from "react-bootstrap-icons";
import AuthService from "../../services/AuthService";
import ErrorNotification from "../errorAlert";
import "../../styles/Modal.scss";
import "../../styles/login.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { XCircleFill } from "react-bootstrap-icons";

const LoginForm = ({ show }) => {
  const [loading, setLoading] = useState(false); // Loading Status
  const [loginError, setLoginError] = useState(false); // Show Login Error
  const [errorResponse, setErrorResponse] = useState(""); // Set Error Response
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { register, handleSubmit } = useForm();

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const handleChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handlePassChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ValidationSchema) });

  // ## Submits Login form data.
  const onSubmit = (data, e) => {
    e.preventDefault();
    setLoading(true);
    AuthService.login(data.email, data.password)
      .then(() => {
        alert("Successfully logged in");
        window.location.reload();
      })
      .catch((error) => {
        // Should work in the future when returning error statements from backend.
        setErrorResponse(JSON.stringify(error.message));
        setLoginError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <div className="modal animate">
        <div className="modalX" onClick={() => show(false)}>
          <XCircleFill />
        </div>
        <div className="c-b">
          <Controller className="controller" />
          <h2>Welcome Back</h2>
          <div style={{ marginBottom: "20px" }}>Please sign in below.</div>
          <div className="rowcontainer">
            <div>
              <Apple />
            </div>
            <div>
              <Google />
            </div>
          </div>
        </div>
        <div className="c-c">
          <div className="linecontainer">
            <div className="line"></div>
            <div className="or">OR</div>
            <div className="line"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="username"
                  className={`${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter your email..."
                  onChange={handleChange}
                  {...register("email")}
                  required
                  id="email"
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  className={`${errors.password ? "is-invalid" : ""}`}
                  placeholder="••••••••"
                  onChange={handlePassChange}
                  {...register("password")}
                  required
                  id="password"
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>
              <button type="submit" disabled={loading} className="signin">
                <div>{loading && <ArrowClockwise className="loading" />}</div>
                Sign in
              </button>
            </div>
          </form>
          {loginError && (
            <ErrorNotification
              header={"Oops, Something went wrong with your Authentication"}
              body={errorResponse}
              setLoginError={setLoginError}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default LoginForm;
