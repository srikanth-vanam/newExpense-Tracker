import { Card, Table } from "react-bootstrap";

const ExpenseItems = (props) => {
  return (
    <>
      <Card className="m-auto mt-3 p-1 w-50">
        <Card.Title className="text-center mt-1">Your Expense Items</Card.Title>
        <Card.Body>
          <Table className="text-center" striped>
            <tbody>
              <tr>
                <th>S.No</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
              {props.items.map((item, index) => (
                <tr className="m-1 " key={item.id}>
                  <td>{index+1}.</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default ExpenseItems;
