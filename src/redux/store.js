import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import cartReducer from "../redux/CaardSlice";

//using redux persist 
const persistConfig = {
  key: 'root',
  storage,
};

// providing it to the cardReducer
const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cartSlice: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
