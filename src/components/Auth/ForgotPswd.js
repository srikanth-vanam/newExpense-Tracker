import { useRef, useState } from "react";
import { Button, Card, Form, FormControl, FormLabel } from "react-bootstrap";

const ForgotPswd = () => {
  const [isLoad, setIsLoad] = useState(false);
  const emailInputRef = useRef();

  const pswdResetHandler = () => {
    setIsLoad(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: emailInputRef.current.value,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error while reseting password");
        } else {
          return res.json();
        }
      })
      .then((data) => {
      setIsLoad(false);
        console.log(data);
        alert("we have successfully sent the reset link to your mail.")
      })
      .catch((err) => {
      setIsLoad(false);
        alert(err.message);
      });
  };

  return (
    <>
      <Card className="m-auto mt-5 w-50 p-2">
        <Card.Title className="text-center">Reset Password</Card.Title>
        <Card.Body>
          <Form className="d-flex flex-column justify-content-center align-items-center">
            <FormLabel className="text-center">
              Enter the email that you have registerd with
            </FormLabel>
            <FormControl className="w-75 ml-auto" ref={emailInputRef}></FormControl>
            {isLoad ? <p className="mt-3">Loading...</p> : ""}
            <Button onClick={pswdResetHandler} className="mt-2 ">Send Link</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ForgotPswd;
