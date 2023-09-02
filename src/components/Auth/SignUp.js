import { useRef } from "react";
import Card from "../UI/Card";
import classes from "./SignUP.module.css";
import { Button } from "react-bootstrap";
const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpswdInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const userCredentials = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    postUserData(userCredentials);
  };

  const postUserData = (obj) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk",
      {
        method: "POST",
        body: JSON.stringify({
          email: obj.email,
          password: obj.password,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error in posting data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Card className="mb-0">
        <h2>Sign Up</h2>
        <form className={classes.form} onSubmit={submitHandler}>
          <label htmlFor="email" required>
            Email
          </label>
          <input type="email" ref={emailInputRef}></input>
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordInputRef} required />
          <label htmlFor="">Confirm Password</label>
          <input type="pawwsord" ref={confirmpswdInputRef} required />
          <Button className="d-block m-auto" type="submit" size="sm">
            Sign Up
          </Button>
        </form>
        <Button className=" d-block m-auto mt-2" type="button" variant="secondary">
          Have an account? Login
        </Button>
      </Card>
    </>
  );
};

export default SignUp;
