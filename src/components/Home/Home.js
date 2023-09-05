import { useHistory } from "react-router-dom/cjs/react-router-dom";
import classes from "./Home.module.css";
import { Button } from "react-bootstrap";
import ExpenseForm from "../Expense/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { Authactions } from "../../store/store";

const Home = () => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const isPremium = useSelector((state) => state.expense.isPremium);
  const dispatch = useDispatch();

  const emailVerifyHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error in email verify handler");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log("verify email ", data);
        alert("please check your mail to proceed further.!!");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const logoutHandler = () => {
    dispatch(Authactions.removeToken());
    console.log("removed token");
    history.replace("/");
  };

  return (
    <>
      <div className={classes.outer}>
        <p>Welcome Home</p>
        <Button variant="secondary" onClick={emailVerifyHandler}>
          Verify Email
        </Button>
        <p>
          {" "}
          Your profile is Incomplete{" "}
          <button
            type="button"
            className={classes.btn}
            onClick={() => history.push("/profile")}
          >
            Complete now
          </button>
        </p>
        <Button variant="danger" onClick={logoutHandler}>
          Logout
        </Button>
      </div>
      {isPremium && (
        <Button
          variant="secondary"
          className=" d-block m-auto mt-3"
          type="button"
        >
          Activate Premium
        </Button>
      )}
      <ExpenseForm />
    </>
  );
};

export default Home;
