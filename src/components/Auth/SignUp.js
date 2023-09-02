import { useRef, useState } from "react";
import Card from "../UI/Card";
import classes from "./SignUP.module.css";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpswdInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const history=useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    const userCredentials = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    postUserData(userCredentials);
  };

  const postUserData = (obj) => {
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: obj.email,
        password: obj.password,
        returnSecureToken: true,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("error in posting data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        localStorage.setItem("1",data.idToken);
        console.log(data.idToken);
      })
      .catch((err) => {
        alert(err.message);
      });
    history.replace('/home');
  };

  return (
    <>
      <Card className="mb-0">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form className={classes.form} onSubmit={submitHandler}>
          <label htmlFor="email" required>
            Email
          </label>
          <input type="email" ref={emailInputRef}></input>
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordInputRef} required />
          {!isLogin ? (
            <>
              <label htmlFor="">Confirm Password</label>
              <input type="pawwsord" ref={confirmpswdInputRef} required />
            </>
          ) : (
            ""
          )}
          <Button className="d-block m-auto" type="submit" size="sm">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <Button
          className=" d-block m-auto mt-2"
          type="button"
          variant="secondary"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          <p>
            {isLogin
              ? "Don't have an account? SignUP"
              : "Already have an account?Login"}
          </p>
        </Button>
      </Card>
    </>
  );
};

export default SignUp;
