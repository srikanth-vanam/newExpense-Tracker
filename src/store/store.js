import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = { token: null, id: null, isLogin: false };
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    loginHandler(state) {
      state.isLogin = !state.isLogin;
    },
    removeToken(state) {
      state.token = null;
    },
  },
});

const initialExpenseState = {
  expenseItems: [],
  isUpdateBool: false, // a boolean value that facilitates the updation.
  editId: null, // contains id of the object, that user wants to edit/update.
  deleteId: null,
  isPremium:false,
};

const expenseSlice = createSlice({
  name: "Expenses",
  initialState: initialExpenseState,
  reducers: {
    setExpenseItems(state, action) {
      state.expenseItems = action.payload;
    },
    setUpdateBool(state, action) {
      state.isUpdateBool = action.payload;
    },
    setEditId(state, action) {
      state.editId = action.payload;
    },
    setDeleteId(state, action) {
      state.deleteId = action.payload;
    },
    setPremium(state){
        state.isPremium=true;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expense: expenseSlice.reducer,
  },
});

export const expenseActions = expenseSlice.actions;
export const Authactions = authSlice.actions;
export default store;
