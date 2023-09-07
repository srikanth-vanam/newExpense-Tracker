import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = { token: null, emailId: null, isLogin: false };
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
    setEmailId(state,action){
      state.emailId=action.payload;
    },
  },
});

const initialExpenseState = {
  expenseItems: [],
  isUpdateBool: false, // a boolean value that facilitates the updation.
  editId: null, // contains id of the object, that user wants to edit/update.
  deleteId: null,
  isPremium: false,
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
    setPremium(state, action) {
      state.isPremium = action.payload;
    },
  },
});

const initialThemeState = { isActivateTheme: false, isDark: null };
const themeSlice = createSlice({
  name: "Premium Feature Theme",
  initialState: initialThemeState,
  reducers: {
    activateTheme(state) {
      state.isActivateTheme = true;
      state.isDark = true;
    },
    themeToggler(state) {
      state.isDark = !state.isDark;
    },
    deactivateTheme(state) {
      state.isActivateTheme = false;
      state.isDark = false;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expense: expenseSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export const themeActions = themeSlice.actions;
export const expenseActions = expenseSlice.actions;
export const Authactions = authSlice.actions;
export default store;
