import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowClockwise, Google } from "react-bootstrap-icons";
import AuthService from "../services/AuthService";
import ErrorNotification from "./errorAlert";
import "../styles/Modal.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const LoginForm = ({
  username,
  handleChange,
  password,
  handlePassChange,
  setLogin,
}) => {
  const [loading, setLoading] = useState(false); // Loading Status
  const [loginError, setLoginError] = useState(false); // Show Login Error
  const [errorResponse, setErrorResponse] = useState(""); // Set Error Response
  // const { register, handleSubmit } = useForm();

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

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
      {/* <div className="google">
        <button disabled id="googlebutton">
          <Google />
          <div> Sign in With Google</div>
        </button>
      </div> */}

      <form className="modalform" onSubmit={handleSubmit(onSubmit)}>
        <label className="modallabel">Email:</label>
        <div className="formGroup">
          <input
            type="text"
            name="username"
            className={`form-control ${errors.email ? "is-invalid" : ""} `}
            placeholder="Enter your Email"
            onChange={handleChange}
            {...register("email")}
            //   value={username}
            required
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <label className="modallabel">Password:</label>
        <div className="formGroup">
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""} `}
            placeholder="Enter your password"
            onChange={handlePassChange}
            {...register("password")}
            //   value={password}
            required
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="justifycenter">
          <button className="btn" type="submit" disabled={loading}>
            <div>{loading && <ArrowClockwise className="loading" />}</div>
            Login
          </button>
        </div>
        <div className="justifycenter">
          <div onClick={() => setLogin(false)}>
            Don't have an account? Sign Up here!
          </div>
        </div>
        {loginError && (
          <ErrorNotification
            header={"Oops, Something went wrong with your Authentication"}
            body={errorResponse}
            setLoginError={setLoginError}
          />
        )}
      </form>
    </>
  );
};
export default LoginForm;
