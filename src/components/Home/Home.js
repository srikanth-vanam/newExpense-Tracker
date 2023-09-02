import { useHistory } from "react-router-dom/cjs/react-router-dom";
import classes from "./Home.module.css";
const Home = () => {
  const history = useHistory();
  return (
    <>
      <div className={classes.outer}>
        <p>Welcome Home</p>
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
