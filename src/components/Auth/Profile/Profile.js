import { Button, Card, Form, FormControl, FormLabel } from "react-bootstrap";
import classes from "./Profile.module.css";
import { useEffect, useRef } from "react";
import {  useSelector } from "react-redux";

const Profile = () => {
  const fullnameInputRef = useRef();
  const urlInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      displayName: fullnameInputRef.current.value,
      photoUrl: urlInputRef.current.value,
    };
    fullnameInputRef.current.value = "";
    urlInputRef.current.value = "";
    updateDataHandler(obj);
  };

  const token=useSelector(state=>state.auth.token);
  console.log(token);
  useEffect(() => {
    // const token = localStorage.getItem("1");
    if (token!==null) {
      getUsersDataHandler(token);
    }
  }, [token]);

  const getUsersDataHandler = (token) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error in getting Users data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        console.log(data.users[0]);
        if(data && data.users[0].displayName!== undefined){
          fullnameInputRef.current.value = data.users[0].displayName;
          urlInputRef.current.value = data.users[0].photoUrl;
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const updateDataHandler = (obj) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: obj.displayName,
          photoUrl: obj.photoUrl,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error in updating data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        getUsersDataHandler(token);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <header className={classes.outer}>
        <p>Winners never quit, Quitters never win.</p>
      </header>
      <Card className="m-auto mt-1 w-50">
        <Card.Title className="text-center mt-1">Contact Details</Card.Title>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <div className="mb-1">
              <FormLabel>FullName :</FormLabel>
              <FormControl type="text" ref={fullnameInputRef}></FormControl>
            </div>
            <div className="mb-1">
              <FormLabel>Profile Photo Url :</FormLabel>
              <FormControl type="url" ref={urlInputRef}></FormControl>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <Button type="submit">Update</Button>
              <Button variant="danger">Cancel</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Profile;
