import { Card } from "react-bootstrap";

const ExpenseItems = (props) => {
  return (
    <>
      <Card className="m-auto mt-3 p-1 w-50">
        <Card.Title className="text-center mt-1">Your Expense Items</Card.Title>
        <Card.Body>
          {props.items.map((item) => (
            <div
              className="m-1 border-bottom d-flex justify-content-between mt-4"
              key={item.id}
            >
              <p>{item.price}</p>
              <p>{item.description}</p>
              <p>{item.category}</p>
            </div>
          ))}
        </Card.Body>
      </Card>
    </>
  );
};

export default ExpenseItems;
