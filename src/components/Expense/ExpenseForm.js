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

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      id: Math.random().toString(),
      price: priceInputRef.current.value,
      description: desciptionInputRef.current.value,
      category: categoryInputRef.current.value,
    };

    fetch("https://expense-tracker-fea86-default-rtdb.firebaseio.com/expenses.json",{
      method:'POST',
      body:JSON.stringify(formData),
    })
    .then((res)=>{
      if(!res.ok){
        throw new Error("cannot post data to database");
      }
      else{
        return res.json();
      }
    })
    .then((data)=>{
      getHandler();
      console.log(data);
    })
    .catch((err)=>{
      alert(err.message);
    })
  };

  useEffect(()=>{
    getHandler();
  },[])

  const getHandler=()=>{
    fetch("https://expense-tracker-fea86-default-rtdb.firebaseio.com/expenses.json",{
      method:'GET',
    })
    .then((res)=>{
      if(!res.ok){
        throw new Error("cannot post data to database");
      }
      else{
        return res.json();
      }
    })
    .then((data)=>{
      console.log("inside get handler",data);
      const itemsArray=[];
      for (const key in data) {
        // console.log(data[key]);
        itemsArray.push(data[key]);
      }
      setExpenseItems(itemsArray);
    })
    .catch((err)=>{
      alert(err.message);
    })
  }

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
          <Button className="m-2 " type="submit">
            Add Expense
          </Button>
        </Form>
      </Card>
      {expenseItems.length !== 0 ? <ExpenseItems items={expenseItems} /> : ""}
    </>
  );
};

export default ExpenseForm;
