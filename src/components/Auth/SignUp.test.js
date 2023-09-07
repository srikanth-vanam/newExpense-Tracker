import { render } from "@testing-library/react";
import SignUp from "./SignUp";
import { Provider } from "react-redux"; // Import the Provider from react-redux
import configureStore from "redux-mock-store"; // Import redux-mock-store for creating a mock store

const mockStore = configureStore(); // Create a mock store
const initialState = {
  auth: {
    token: null, emailId: null, isLogin: false, // You can set your initial state here
  },
};
test("checking SignUp text", () => {
  const store = mockStore(initialState); // Initialize the mock store with the initial state
  render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );


  const SignUpText=screen.getByText('SignUp');
  expect(SignUpText).toBeInTheDocument();
});
