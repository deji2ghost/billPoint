import { createSlice } from "@reduxjs/toolkit";


interface Data {
    id: number;
    date: string;
    description: string;
    duration: number;
    amount: number;
    totalAmount: number;
  }
  
  interface CartItem {
    id: number;
    name: string;
    duration: number;
    amount: number;
  }
  
  interface State {
    cart: CartItem[];
    data: Data[];
    subTotal: number,
  tax: number,
  total: number
  }

const initialState: State = {
  cart: [
    {
      id: 1,
      name: "Rema",
      duration: 50,
      amount: 3000,
    },
    {
      id: 1,
      name: "Crayon",
      duration: 20,
      amount: 6000,
    },
    {
      id: 1,
      name: "Ayra starr",
      duration: 60,
      amount: 2000,
    },
    {
      id: 1,
      name: "Bleach",
      duration: 40,
      amount: 1000,
    },
    {
      id: 1,
      name: "Macu",
      duration: 10,
      amount: 2000,
    },
  ],
  data: [],
  subTotal: 0,
  tax: 0,
  total: 0
};

const dropDownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    handleNewFormData: (state) => {
      const date = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const Today = `${date} - ${month} - ${year}`;
      const newId = state?.data.length + 1;
      console.log(Today);
      if (Today) {
        state.data = [
          ...state.data,
          {
            id: newId,
            date: Today,
            description: "",
            duration: 0,
            amount: 0,
            totalAmount: 0,
          },
        ];
        console.log(state.data);
      }
    },
    handleSelectFormChange: (state, action) => {
      const { id, e } = action.payload;
      const selectedValue = e.target.value;
      const selectedDuration =
        state.cart.find((select) => select.name === selectedValue)?.duration ||
        "";
      const newDescription = state.cart.find(
        (select) => select.name === selectedValue
      );
      const latestData = state.data.map((date) => {
        if (date?.id === id) {
          return {
            ...date,
            description: `${newDescription?.name}, ${newDescription?.amount}, ${newDescription?.duration}`,
            duration: selectedDuration,
            amount: newDescription.amount,
            totalAmount: newDescription.amount * newDescription.duration,
          };
        } else {
          return date;
        }
      });
      state.data = latestData;
    },
    handleDecreasePage: (state, action) => {
        // const { newData } = action.payload
        // console.log('decrease', action.payload)
        const newDuration = state.data.map(date=> {
          if(date.id === action.payload?.id){
            return(
              {...date, duration: date.duration - 10, totalAmount: date.amount * date.duration}
            )
          }else{
            return date
          }
        })
        state.data = newDuration
        state.subTotal = state.data.reduce((total, item) => total + item.totalAmount, 0)
        state.tax = state.subTotal * 0.05
        state.total = state.tax + state.subTotal
    },
    handleIncreasePage: (state, action) => {
        // const { newData } = action.payload
        const newDuration = state.data.map(date=> {
            if(date.id === action.payload?.id){
              return(
                {...date, duration: date.duration+= 10, totalAmount: date.amount * date.duration}
              )
            }else{
              return date
            }
          })
          state.data = newDuration
          state.subTotal = state.data.reduce((total, item) => total + item.totalAmount, 0)
          state.tax = state.subTotal * 0.05
          state.total = state.tax + state.subTotal

    },
  },
});

export const { handleNewFormData, handleSelectFormChange, handleDecreasePage, handleIncreasePage } =
  dropDownSlice.actions;
export default dropDownSlice.reducer;
