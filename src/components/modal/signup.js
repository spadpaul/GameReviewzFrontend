import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AuthService from "../../services/AuthService";
import ErrorNotification from "../errorAlert";
import {
  ArrowClockwise,
  Controller,
  Apple,
  Google,
} from "react-bootstrap-icons";
import { XCircleFill } from "react-bootstrap-icons";

const SignupForm = ({ setLogin, show }) => {
  const [loading, setLoading] = useState(false); // Loading Status
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false); // Show Login Error
  const [errorResponse, setErrorResponse] = useState(""); // Set Error Response

  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().optional(),
    username: Yup.string()
      .required("Username is required ")
      .min(6, "Username must be at least 6 characters")
      .max(26, "Username must not be more than 26 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters "),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ValidationSchema) });

  const onSubmit = (data, e) => {
    setLoginError(false);
    setLoading(true);
    e.preventDefault();
    const firstName = data.firstName.replaceAll(" ", "").toLowerCase();
    const lastName = data.lastName.replaceAll(" ", "");
    let username = data.username.replaceAll(" ", "");
    username = username.toLowerCase();
    let email = data.email.toLowerCase();
    AuthService.register(firstName, lastName, username, email, data.password)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setLoginError(true);
        setErrorResponse(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const data = [
    {
      name: "username",
      type: "text",
      class: `${errors.username ? "is-invalid" : ""}`,
      message: errors.username?.message,
      label: "Username",
    },
    {
      name: "email",
      type: "text",
      class: `${errors.email ? "is-invalid" : ""}`,
      message: errors.email?.message,
      label: "Email",
    },
    {
      name: "password",
      type: "password",
      class: `${errors.password ? "is-invalid" : ""}`,
      message: errors.password?.message,
      label: "Password",
    },
    {
      name: "confirmPassword",
      type: "password",
      class: `${errors.confirmPassword ? "is-invalid" : ""}`,
      message: errors.confirmPassword?.message,
      label: "Confirm Password",
    },
  ];

  return (
    <>
      <div className="modal animate">
        <div className="modalX" onClick={() => show(false)}>
          <XCircleFill />
        </div>
        <div className="c-b" style={{ height: "20%" }}>
          <h2 className="h2">Welcome to GameReviewz!</h2>
          <div style={{ marginBottom: "10px" }}>
            Fill out the fields to register!
          </div>
          <p>Sign Up With Apple or Google</p>
          <div className="rowcontainer">
            <div className="oauth">
              <Apple />
            </div>
            <div className="oauth">
              <Google />
            </div>
          </div>
        </div>
        <div className="c-c" style={{ height: "80%" }}>
          <div className="linecontainer">
            <div className="line"></div>
            <div className="or">OR</div>
            <div className="line"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "80%",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div style={{ width: "40%" }} className="firstlast">
                  <label htmlFor="firstName" className="label">
                    First Name{" "}
                    <span style={{ color: "lightgray", fontSize: "12px" }}>
                      Required *
                    </span>
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    id="first"
                    className={`${errors.firstName ? "is-invalid" : ""}`}
                    {...register("firstName")}
                  />
                  <div className="invalid-feedback">
                    {errors.firstName?.message}
                  </div>
                </div>
                <div style={{ width: "40%" }} className="firstlast">
                  <label htmlFor="lastName" className="label">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    id="last"
                    className="input"
                    {...register("lastName")}
                  />
                </div>
              </div>
              {data.map((item) => (
                <div className="form-group">
                  <label for={item.name}>
                    {item?.label}{" "}
                    <span style={{ color: "lightgray", fontSize: "12px" }}>
                      Required *
                    </span>
                  </label>
                  <input
                    name={`${item.name}`}
                    type={`${item.type}`}
                    {...register(`${item.name}`)}
                    id={item.name}
                    className={item.class}
                  />
                  <div className="invalid-feedback">{item.message}</div>
                </div>
              ))}
              <button
                className="signin"
                type="submit"
                disabled={loading}
                style={{ backgroundColor: "#3285FF" }}
              >
                <div>{loading && <ArrowClockwise className="loading" />}</div>
                Register
              </button>
            </div>
          </form>
        </div>
        {loginError && (
          <ErrorNotification
            header={"Oops, Something went wrong with your Authentication"}
            body={errorResponse}
            setLoginError={setLoginError}
          />
        )}
        {success && (
          <ErrorNotification
            header={"Welcome To GameReviewz!"}
            body={"Succesfully Signed Up!"}
            setLoginError={setSuccess}
            bgcolor={true}
          />
        )}
      </div>
    </>
  );
};
export default SignupForm;
