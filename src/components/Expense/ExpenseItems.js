import { Button, Card, Table } from "react-bootstrap";

const ExpenseItems = (props) => {
  const clickHandler=(id)=>{
    props.onEdit(id);
  }

  const deleteHandler=(id)=>{
    props.onDelete(id);
  }

  return (
    <>
      <Card className="m-auto mt-3 p-1 w-75">
        <Card.Title className="text-center mt-1">Your Expense Items</Card.Title>
        <Card.Body>
          <Table className="text-center" striped>
            <tbody>
              <tr>
                <th>S.No</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Action 1</th>
                <th>Action 2</th>
              </tr>
              {props.items.map((item, index) => (
                <tr className="m-1 " key={item.id}>
                  <td>{index+1}.</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td><Button variant="secondary" onClick={()=>clickHandler(item.id)}>Edit</Button></td>
                  <td><Button variant="danger" onClick={()=>deleteHandler(item.id)}>Delete</Button></td>
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
