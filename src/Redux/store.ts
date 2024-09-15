import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "./invoice"


const store = configureStore({
    reducer: dropdownReducer
})

console.log(store.getState())
export type RootState = ReturnType<typeof store.getState>;
export default store