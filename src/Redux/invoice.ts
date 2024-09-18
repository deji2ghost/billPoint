import { createSlice } from "@reduxjs/toolkit";

interface Data {
  id: number;
  date: string;
  name: string;
  description: string;
  duration: number;
  currentDuration: number;
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
  subTotal: number;
  tax: number;
  total: number;
  fullInvoiceData: FullInvoiceData[];
}

export interface fullInvoice {
  id: number;
  date: string;
  name: string;
  description: string;
  duration: number;
  currentDuration: number;
  amount: number;
  totalAmount: number;
}

export interface FullInvoiceData {
  id: string;
  date: string;
  subTotalAmount: number;
  tax: number;
  mainTotalAmount: number;
  paid: number;
  stat: boolean;
  items: fullInvoice[];
}

const initialState: State = {
  cart: [
    {
      id: 1,
      name: "Select a bill",
      duration: 0,
      amount: 0,
    },
    {
      id: 2,
      name: "Rema",
      duration: 50,
      amount: 3000,
    },
    {
      id: 3,
      name: "Crayon",
      duration: 20,
      amount: 6000,
    },
    {
      id: 4,
      name: "Ayra starr",
      duration: 60,
      amount: 2000,
    },
    {
      id: 5,
      name: "Bleach",
      duration: 40,
      amount: 1000,
    },
    {
      id: 6,
      name: "Macu",
      duration: 10,
      amount: 2000,
    },
  ],
  data: [],
  subTotal: 0,
  tax: 0,
  total: 0,
  fullInvoiceData: [
    {
      id: "INV3513",
      date: "10-08-2024",
      subTotalAmount: 15000,
      mainTotalAmount: 15500,
      tax: 500, 
      paid: 0,
      stat: true,
      items: [
        {
          id: 1,
          date: "10-08-2024",
          name: "fever",
          description: "fever, 6000, 30",
          duration: 0,
          currentDuration: 0,
          amount: 0,
          totalAmount: 0,
        },
        {
          id: 1,
          date: "10-08-2024",
          name: "fever",
          description: "fever, 6000, 30",
          duration: 0,
          currentDuration: 0,
          amount: 0,
          totalAmount: 0,
        },
      ],
    },
    {
      id: "INV4190",
      date: "10-08-2024",
      subTotalAmount: 6000,
      mainTotalAmount: 6500,
      tax: 500, 
      paid: 0,
      stat: false,
      items: [
        {
          id: 1,
          date: "10-08-2024",
          name: "cough",
          description: "cough, 6000, 30",
          duration: 0,
          currentDuration: 0,
          amount: 0,
          totalAmount: 0,
        },
      ],
    },
  ],
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
            name: "",
            date: Today,
            description: "",
            duration: 0,
            currentDuration: 0,
            amount: 0,
            totalAmount: 0,
          },
        ];
        console.log(state.data);
      }
    },
    handleSelectFormChange: (state, action) => {
      const { id, event } = action.payload;
      const selectedValue = event;
      const selectedDuration =
        state.cart.find((select) => select.name === selectedValue)?.duration ||
        0;
      const newDescription = state.cart.find(
        (select) => select.name === selectedValue
      );
      console.log("new description:", newDescription);
      if (newDescription) {
        const latestData = state.data.map((date) => {
          if (date?.id === id) {
            return {
              ...date,
              description: `${newDescription.name}, ${newDescription.amount}, ${newDescription.duration}`,
              name: newDescription.name,
              duration: selectedDuration,
              currentDuration: selectedDuration,
              amount: newDescription.amount,
              // currentData: newDescription.amount,
              totalAmount: newDescription.amount,
            };
          } else {
            return date;
          }
        });
        state.data = latestData;
        const mainSubTotal = state.data.reduce(
          (total, item) => total + item.totalAmount,
          0
        );
        state.subTotal = mainSubTotal;
        const mainTax = state.subTotal * 0.05;
        state.tax = mainTax;
        const mainTotal = state.tax + state.subTotal;
        state.total = mainTotal;
      }
    },
    handleDecreasePage: (state, action) => {
      // const { newData } = action.payload
      // console.log('decrease', action.payload)
      const newDuration = state.data.map((date) => {
        const mainDuration = date.duration - date.currentDuration;
        const mainTotalAmount = date.totalAmount + date.amount;
        if (date.id === action.payload?.id) {
          return {
            ...date,
            duration: mainDuration,
            totalAmount: mainTotalAmount,
          };
        } else {
          return date;
        }
      });
      state.data = newDuration;
      const mainSubTotal = state.data.reduce(
        (total, item) => total + item.totalAmount,
        0
      );
      state.subTotal = mainSubTotal;
      const mainTax = state.subTotal * 0.05;
      state.tax = mainTax;
      const mainTotal = state.tax + state.subTotal;
      state.total = mainTotal;
    },
    handleIncreasePage: (state, action) => {
      // const { newData } = action.payload
      const newDuration = state.data.map((date) => {
        const mainDuration = date.duration + date.currentDuration;
        const mainTotalAmount = date.totalAmount + date.amount;
        if (date.id === action.payload?.id) {
          return {
            ...date,
            duration: mainDuration,
            totalAmount: mainTotalAmount,
          };
        } else {
          return date;
        }
      });
      state.data = newDuration;
      const mainSubTotal = state.data.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      state.subTotal = mainSubTotal;
      const mainTax = state.subTotal * 0.05;
      state.tax = mainTax;
      const mainTotal = state.tax + state.subTotal;
      state.total = mainTotal;
    },
    handleDeleteForm: (state, action) => {
      const newForm = state.data.filter(
        (newData) => newData.id !== action.payload
      );
      state.data = newForm;
      const mainSubTotal = state.data.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      state.subTotal = mainSubTotal;
      const mainTax = state.subTotal * 0.05;
      state.tax = mainTax;
      const mainTotal = state.tax + state.subTotal;
      state.total = mainTotal;
    },
    handleClearForm: (state) => {
      state.data = [];
      state.tax = 0;
      state.subTotal = 0;
      state.total = 0;
    },
    handleSaveFullInvoice: (state) => {
      function generateRandomNumbers() {
        const nums: number[] = [];
        while (nums.length < 4) {
          const num = Math.floor(Math.random() * 10); // Generates a number between 0 and 9
          if (!nums.includes(num)) {
            nums.push(num);
          }
        }
        const numsString = nums.join("");
        return numsString;
      }

      const newId = generateRandomNumbers();
      const date = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const Today = `${date} - ${month} - ${year}`;
      state.fullInvoiceData = [
        ...state.fullInvoiceData,
        {
          id: "INV" + newId,
          date: Today.toString(),
          subTotalAmount: state.subTotal,
          mainTotalAmount: state.total,
          tax: state.tax,
          paid: 0,
          stat: true,
          items: [...state.data],
        },
      ];
    },
  },
});

export const {
  handleNewFormData,
  handleSelectFormChange,
  handleDecreasePage,
  handleIncreasePage,
  handleDeleteForm,
  handleClearForm,
  handleSaveFullInvoice,
} = dropDownSlice.actions;
export default dropDownSlice.reducer;
