import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from './reducer/authSlice'; // ✅ your auth slice
import localStorage from "redux-persist/es/storage";

/**
 * 🧩 Combine all reducers
 */
const rootReducer = combineReducers({
  auth: authReducer,
});

/**
 * ⚙️ Redux Persist Configuration
 */
const persistConfig = {
  key: "root", // key for localStorage
  storage: localStorage, // using localStorage as default
};

/**
 * 💾 Create a persisted reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * 🏗️ Configure the Redux store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ disable serializable check for redux-persist
    }),
});

/**
 * ♻️ Persistor instance for <PersistGate>
 */
export const persistor = persistStore(store);