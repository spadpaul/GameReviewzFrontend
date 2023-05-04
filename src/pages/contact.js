import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  PersonFill,
  PersonCircle,
  EnvelopeFill,
  PencilFill,
  PencilSquare,
  CheckCircleFill,
} from "react-bootstrap-icons";
import "../styles/Contact.scss";
import { useState } from "react";
import UserService from "../services/UserService";

const Contact = () => {
  const user = UserService.userInfo();
  let loggedIn = false;
  if (user) loggedIn = true;

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    username: Yup.string().optional("Enter a username if you have an account."),
    // .min(6, 'Username must be at least 6 characters')
    // .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    subject: Yup.string()
      .required("Subject is required")
      .max(50, "Subject cannot exceed 50 characters"),
    message: Yup.string()
      .required("Message is required")
      .max(300, "Message cannot exceed 300 characters"),
  });

  const {
    //Reset available if needed.
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const contactInfo = data;
    if (loggedIn) {
      contactInfo.username = user.username;
      contactInfo.email = user.email;
    }
    UserService.addForm(contactInfo);
    handleClickOpen();
  };

  const [popup, setPop] = useState(false);
  const handleClickOpen = () => {
    setPop(!popup);
  };
  const closePopup = () => {
    setPop(false);
    // window.location.reload();
  };

  return (
    <div>
      <div className={"wholeContainer"}>
        <div className="contactUs">
          <p className="contactTitle">Contact Us</p>
          <p className="contactText">
            Please fill out the following form to suggest a new feature, tell us
            about a bug, request a review, etc...
          </p>
        </div>

        <div className="contactContainer">
          <h1 className="formHeader">Get in touch with us.</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputForms">
              <PersonFill size={13} color="red" />
              <label>Full Name</label>
              <input
                name="fullname"
                type="text"
                {...register("fullname")}
                className={`form-control ${
                  errors.fullname ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.fullname?.message}</div>
            </div>
            <div className="inputForms">
              <PersonCircle size={13} color="red" />
              <label>Username (optional)</label>
              {loggedIn ? (
                <input
                  name="username"
                  type="text"
                  {...register("username")}
                  className="form-control"
                  disabled
                  value={user.username}
                />
              ) : (
                <input
                  name="username"
                  type="text"
                  {...register("userName")}
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                />
              )}
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>

            <div className="inputForms">
              <EnvelopeFill size={13} color="red" />
              <label>Email</label>
              {loggedIn ? (
                <input
                  name="email"
                  type="email"
                  {...register("email")}
                  className="form-control"
                  disabled
                  value={user.email}
                />
              ) : (
                <input
                  name="email"
                  type="email"
                  {...register("email")}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
              )}

              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="inputForms">
              <PencilFill size={13} color="red" />
              <label>Subject</label>
              <input
                name="subject"
                type="text"
                {...register("subject")}
                className={`form-control ${errors.subject ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.subject?.message}</div>
            </div>
            <div className="inputForms">
              <PencilSquare size={13} color="red" />
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Write your message here..."
                {...register("message")}
                className={`form-control ${errors.message ? "is-invalid" : ""}`}
              ></textarea>
              <div className="invalid-feedback">{errors.message?.message}</div>
            </div>

            <div className="inputForms">
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
            {popup ? (
              <div className={"popup"}>
                {/*<img src={checkmark} alt={"checkmark"}/>*/}
                <CheckCircleFill className={"checkCircleFill"} />
                <p>Message sent. Thank you.</p>
                <button type={"button"} onClick={closePopup}>
                  OK
                </button>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
