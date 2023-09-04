import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import ExpenseItems from "./ExpenseItems";

const ExpenseForm = () => {
  const [expenseItems, setExpenseItems] = useState([]);

  const priceInputRef = useRef();
  const desciptionInputRef = useRef();
  const categoryInputRef = useRef();

  const [isUpdate, setIsUpdate] = useState(false); // a boolean value that facilitates the updation.
  const [updateId, setUpdateId] = useState(null); // contains id of the object, that user wants to edit/update.
  const isUpdateHandler = () => {
    setIsUpdate(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      price: priceInputRef.current.value,
      description: desciptionInputRef.current.value,
      category: categoryInputRef.current.value,
    };

    priceInputRef.current.value = "";
    desciptionInputRef.current.value = "";
    categoryInputRef.current.value = "Travel";

    fetch(
      "https://expense-tracker-fea86-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("cannot post/update data to database");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        getHandler();
        console.log(data);
        setUpdateId(null);
        setIsUpdate(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getHandler();
  }, []);

  const getHandler = () => {
    fetch(
      "https://expense-tracker-fea86-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("cannot post data to database");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log("inside get handler", data);
        const itemsArray = [];
        for (const key in data) {
          // console.log(data[key]);
          data[key].id = key;
          // console.log("key id is ",data[key].id);
          itemsArray.push(data[key]);
        }
        setExpenseItems(itemsArray);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteHandler = (id) => {
    fetch(
      `https://expense-tracker-fea86-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("cannot delete data from database");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log("inside delete handler", data);
        // after deleting calling gethandler to change the display
        getHandler();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const editHandler = (id) => {
    // gets data of particular 'id' object only
    fetch(
      `https://expense-tracker-fea86-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("cannot post data to database");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        // console.log("inside edit-handler", data);
        priceInputRef.current.value = data.price;
        desciptionInputRef.current.value = data.description;
        categoryInputRef.current.value = data.category;
        setUpdateId(id); // sets the id, which this function is getting from user clicked expense item.
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const updateExpenseHandler = () => {
    fetch(
      `https://expense-tracker-fea86-default-rtdb.firebaseio.com/expenses/${updateId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          price: priceInputRef.current.value,
          description: desciptionInputRef.current.value,
          category: categoryInputRef.current.value,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("cannot update data to database");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        getHandler(); // calling getHandler
        // console.log(data);
        setUpdateId(null); // sets id to null
        setIsUpdate(false); // isUpdate is set to false
        priceInputRef.current.value = "";
        desciptionInputRef.current.value = "";
        categoryInputRef.current.value = "Travel";
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Card className="m-auto mt-3 p-2 w-50">
        <Card.Title className="text-center">Add your Expenses Here</Card.Title>
        <Form onSubmit={submitHandler}>
          <div className=" m-2 d-flex justify-content-around">
            <FormLabel>Expense Price</FormLabel>
            <FormControl
              className="w-50"
              type="number"
              min={1}
              ref={priceInputRef}
            ></FormControl>
          </div>
          <div className=" m-2 d-flex justify-content-around">
            <FormLabel> Expense Description</FormLabel>
            <FormControl
              className="w-50"
              type="text"
              ref={desciptionInputRef}
            ></FormControl>
          </div>
          <div className="m-2 d-flex justify-content-around">
            <FormLabel>Choose Category</FormLabel>
            <FormSelect
              className="w-50"
              ref={categoryInputRef}
              defaultValue={"Travel"}
            >
              <option>Travel</option>
              <option>Adventure</option>
              <option>Food</option>
              <option>Shopping</option>
              <option>Fuel</option>
              <option>Medical</option>
              <option>Kitchen Utilities</option>
              <option>Furniture</option>
            </FormSelect>
          </div>
          {isUpdate ? (
            <Button
              className="m-2 "
              type="button"
              onClick={updateExpenseHandler}
            >
              Update Expense
            </Button>
          ) : (
            <Button className="m-2 " type="submit">
              Add Expense
            </Button>
          )}
        </Form>
      </Card>
      {expenseItems.length !== 0 ? (
        <ExpenseItems
          items={expenseItems}
          onEdit={editHandler}
          onDelete={deleteHandler}
          onUpdate={isUpdateHandler} // sets isUpdate to true
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ExpenseForm;
