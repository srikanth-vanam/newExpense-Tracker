import { useHistory } from "react-router-dom/cjs/react-router-dom";
import classes from "./Home.module.css";
import { Button } from "react-bootstrap";
const Home = () => {
  const history = useHistory();

  const emailVerifyHandler=()=>{
    const token = localStorage.getItem("1");
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk",{
      method: "POST",
      body: JSON.stringify({
        requestType:"VERIFY_EMAIL",
        idToken: token,
      }),
    })
    .then((res)=>{
      if(!res.ok){
        throw new Error("error in email verify handler");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      console.log("verify email ",data);
      alert("please check your mail to proceed further.!!")
    })
    .catch((err) => {
      alert(err.message);
    });
  }

  return (
    <>
      <div className={classes.outer}>
        <p>Welcome Home</p>
        <Button variant="secondary" onClick={emailVerifyHandler}>Verify Email</Button >
        <p>
          {" "}
          Your profile is Incomplete{" "}
          <button type="button" className={classes.btn} onClick={() => history.push("/profile")}>
            Complete now
          </button>
        </p>
      </div>
    </>
  );
};

export default Home;
