import { useEffect, useRef } from "react";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import ExpenseItems from "./ExpenseItems";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions, themeActions } from "../../store/store";

const ExpenseForm = () => {
  const priceInputRef = useRef();
  const desciptionInputRef = useRef();
  const categoryInputRef = useRef();

  const isUpdateHandler = () => {
    dispatch(expenseActions.setUpdateBool(true));
  };
  const email = useSelector((state) => state.auth.emailId);
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
      `https://expense-tracker-fea86-default-rtdb.firebaseio.com/expenses/${email}.json`,
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
        dispatch(expenseActions.setEditId(null));
        dispatch(expenseActions.setUpdateBool(false));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const expenseItems = useSelector((state) => state.expense.expenseItems);
  const isUpdate = useSelector((state) => state.expense.isUpdateBool);
  const editId = useSelector((state) => state.expense.editId);
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    getHandler();
  }, [email]);

  const getHandler = () => {
    fetch(
      `https://expense-tracker-fea86-default-rtdb.firebaseio.com/expenses/${email}.json`,
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
        if (data) {
          let amount = 0;
          for (const key in data) {
            // console.log(data[key]);
            data[key].id = key;
            amount += Number.parseInt(data[key].price);
            if (amount >= 10000) {
              console.log("amount is ", amount);
              if (isDark === true) {
                dispatch(themeActions.activateTheme());
              }
              dispatch(expenseActions.setPremium(true));
            } else {
              dispatch(expenseActions.setPremium(false));
              dispatch(themeActions.deactivateTheme());
            }
            // console.log("key id is ",data[key].id);
            itemsArray.push(data[key]);
          }
          dispatch(expenseActions.setExpenseItems(itemsArray));
        } else {
          dispatch(expenseActions.setExpenseItems(itemsArray));
          dispatch(expenseActions.setPremium(false));
          dispatch(themeActions.deactivateTheme());
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteHandler = (id) => {
    fetch(
      `https://expense-tracker-fea86-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`,
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
      `https://expense-tracker-fea86-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error in getting data from database");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log("inside edit-handler", data);
        if (data) {
          isUpdateHandler();
          priceInputRef.current.value = data.price;
          desciptionInputRef.current.value = data.description;
          categoryInputRef.current.value = data.category;
          // seteditId(id); // sets the id, which this function is getting from user clicked expense item.
          dispatch(expenseActions.setEditId(id));
        } else {
          throw new Error("there is no data");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const updateExpenseHandler = () => {
    fetch(
      `https://expense-tracker-fea86-default-rtdb.firebaseio.com/expenses/${email}/${editId}.json`,
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
        console.log("in updateExp handler", data);
        dispatch(expenseActions.setEditId(null));
        dispatch(expenseActions.setUpdateBool(false));
        // setUpdateId(null); // sets id to null
        // setIsUpdate(false); // isUpdate is set to false
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
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ExpenseForm;
