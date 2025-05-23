import { legacy_createStore as createStore } from "redux";
import rootReducer from "../reducer/rootReducer";

const initialState = {
  isadmin:0,
  isowner:0,
  isuser:'',
  userid:null
};

const store = createStore(rootReducer, initialState);

export default store;
