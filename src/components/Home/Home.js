import { useHistory } from "react-router-dom/cjs/react-router-dom";
import classes from "./Home.module.css";
import { Button } from "react-bootstrap";
import ExpenseForm from "../Expense/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { Authactions, themeActions } from "../../store/store";
import { useEffect } from "react";

const Home = () => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const isPremium = useSelector((state) => state.expense.isPremium);
  const dispatch = useDispatch();
  const isActivateTheme = useSelector((state) => state.theme.isActivateTheme);
  const isDark = useSelector((state) => state.theme.isDark);
  const expenseItems = useSelector((state) => state.expense.expenseItems);
  // need to work on losing token,email on page-refresh
  const email=useSelector(state=>state.auth.emailId);
  useEffect(()=>{
    dispatch(Authactions.setToken(token));
    dispatch(Authactions.setEmailId(email));
    console.log("in homes useEffect",email);
  },[])

  const themeToggler = () => {
    dispatch(themeActions.themeToggler());
  };
  const premiumHandler = () => {
    dispatch(themeActions.activateTheme());
  };
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
    // dispatch(Authactions.setEmailId(null));
    console.log("removed token");
    history.replace("/");
  };

  const downloadHandler = () => {
    function makeCSV(data) {
      return data.map((obj) => JSON.stringify(obj)).join("\n");
    }
    const aTag = document.getElementById("a");
    const blob = new Blob([makeCSV(expenseItems)]);
    aTag.href = URL.createObjectURL(blob);
  };

  return (
    <div className={`${isDark ? classes.bodyDark : classes.bodyLight}`}>
      <div className={`${classes.outer} ${isDark ? classes.dark : ""}`}>
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
        {isActivateTheme && (
          <Button onClick={themeToggler}>
            {isDark ? "Light theme" : "Dark theme"}
          </Button>
        )}
        <Button variant="danger" onClick={logoutHandler}>
          Logout
        </Button>
      </div>
      {isPremium && (
        <div className="d-flex justify-content-center align-items-center">
          <Button
            variant="secondary"
            className="m-3"
            type="button"
            onClick={premiumHandler}
          >
            Activate Premium
          </Button>
          <Button variant="secondary" className="m-3" type="button">
            <a
              id="a"
              download="expenses.csv"
              onClick={downloadHandler}
              style={{ textDecoration: "none", color: "white" }}
            >
              Download Expenses
            </a>
          </Button>
        </div>
      )}
      <ExpenseForm />
    </div>
  );
};

export default Home;
