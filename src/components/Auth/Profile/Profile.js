import { Button, Card, Form, FormControl, FormLabel } from "react-bootstrap";
import classes from "./Profile.module.css";
import { useRef } from "react";
const Profile = () => {
  const fullnameInputRef = useRef();
  const urlInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      displayName: fullnameInputRef.current.value,
      photoUrl: urlInputRef.current.value,
    };
    fullnameInputRef.current.value="";
    urlInputRef.current.value="";
    updateDataHandler(obj);
  };

  const updateDataHandler = (obj) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("1"),
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
