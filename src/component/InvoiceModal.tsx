import { ChangeEvent, useState } from "react";
import { billed, service } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import {
  handleClearForm,
  handleDecreasePage,
  handleDeleteForm,
  handleIncreasePage,
  handleNewFormData,
  handleSaveFullInvoice,
  handleSelectFormChange,
} from "../Redux/invoice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";

interface clickedObject {
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Data {
  id: number;
  name: string;
  date: string;
  description: string;
  duration: number;
  currentDuration: number;
  amount: number;
  totalAmount: number;
}

const InvoiceModal = ({ clicked, setClicked }: clickedObject) => {
  const selector = useSelector((state: RootState) => state.cart);
  const selectorData = useSelector((state: RootState) => state.data);
  const selectorSubTotal = useSelector((state: RootState) => state.subTotal);
  const selectorTax = useSelector((state: RootState) => state.tax);
  const selectorTotal = useSelector((state: RootState) => state.total);
  const [isLoading, setIsLoading] = useState(false);
  // const [detailsPage, setDetailsPage] = useState(false);
  const dispatch = useDispatch();

  const [dataSaved, setDataSaved] = useState<boolean>(true);
  const handleNewData = () => {
    dispatch(handleNewFormData());
  };
  const handleSelectChange = (
    id: number,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const event = e.target.value;
    dispatch(handleSelectFormChange({ id, event }));
  };
  const handleDecrease = (newData: Data) => {
    if (newData?.duration > newData?.currentDuration) {
      dispatch(handleDecreasePage(newData));
    }
  };
  const handleIncrease = (newData: Data) => {
    dispatch(handleIncreasePage(newData));
    console.log(selectorSubTotal);
    console.log("increase data:", newData);
  };
  const handleDelete = (id: number) => {
    dispatch(handleDeleteForm(id));
  };
  const handleClear = () => {
    setClicked(!clicked);
    dispatch(handleClearForm());
  };

  const handleSave = () => {
    console.log("saved");
    const cantSave = selectorData?.find(
      (item: Data) => item.name === "" || item.name === "Select a bill"
    );
    console.log("cant save:", cantSave);
    if (cantSave || selectorData.length < 1) {
      console.log("wrong");
      toast("You have to select an item. Select a bill is not selectable");
      setDataSaved(true);
    } else {
      // toast("successfully saved");
      console.log("saved");
      setDataSaved(false);
      console.log("latest loading:", isLoading);
      setTimeout(() => {
        setIsLoading(true);
        console.log("is loading:", isLoading);
      }, 2000);
      console.log("latest loading:", isLoading);
      dispatch(handleSaveFullInvoice());
    }
  };

  // const handleDetails = () => {
  //   setDetailsPage(!detailsPage);
  //   console.log("details", detailsPage);
  // };

  return (
    <div className="absolute top-0 left-0 h-screen w-full bg-slate-800 bg-opacity-60 ">
      {dataSaved ? (
        <Modal invoiceHeader={'Create new invoice for Emmanuel Afolabi'} selectorData={selectorData} selectorSubTotal={selectorSubTotal} selectorTax={selectorTax} selectorTotal={selectorTotal} handleSave={handleSave} handleDecrease={handleDecrease} handleIncrease={handleIncrease} handleSelectChange={handleSelectChange} handleNewData={handleNewData} handleDelete={handleDelete} selector={selector}/>
      ) : (
        <>
          {isLoading === true ? (
            <div className="relative w-[80%] mx-auto bg-slate-50 text-black py-2 px-4 rounded-md h-[400px] top-1/2 -translate-y-1/2">
              <div className="absolute top-0 left-0 px-4 py-2 w-full flex items-center justify-between drop-shadow-md bg-slate-100">
                <h1>Create new invoice for Emmanuel Afolabi</h1>
                <div className="flex items-center justify-between">
                  <h1 className="cursor-pointer py-2" onClick={handleClear}>
                    &#10005;
                  </h1>
                </div>
              </div>
              <div className="bg-gray-300 py-3 px-3 mt-12">
                <div className="bg-slate-50 px-4 py-2 h-[300px] overflow-y-scroll">
                  <h1 className="text-5xl">Invoice</h1>
                  <div className="border-b-8 border-gray-600 pb-9">
                    <div>
                      <p>Date:</p>
                      <p className="font-medium">04 Jul, 2024</p>
                    </div>
                    <div className="flex gap-28">
                      <div className="">
                        <div>
                          <p>Billed From:</p>
                          <p className="font-medium">{billed.billedFrom}</p>
                        </div>
                        <div>
                          <p>Service Provider:</p>
                          <p className="font-medium">
                            {service.serviceProviderPlace}
                          </p>
                          <p className="font-medium">
                            {service.serviceProviderLocation}
                          </p>
                          <p className="font-medium">
                            {service.serviceProviderNumber}
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div>
                          <p>Billed To:</p>
                          <p className="font-medium">{billed.billedTo}</p>
                        </div>
                        <div>
                          <p>Patient Details:</p>
                          <p className="font-medium">
                            {service.patientDetails}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table className="w-full my-5">
                    <thead className="text-left ">
                      <tr className="">
                        <th className="">Date</th>
                        <th className="">Description</th>
                        <th className="">Duration</th>
                        <th className="">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-left">
                      {selectorData &&
                        selectorData?.map((newData) => {
                          return (
                            <tr
                              className="border-b border-gray-600 items-center"
                              key={newData?.id}
                            >
                              <td className=" w-[15%]">{newData?.date}</td>
                              <td className=" w-[15%] py-7">
                                {newData.duration}seconds
                              </td>
                              <td className=" w-[15%]">
                                {newData.totalAmount.toLocaleString()}
                              </td>
                              <td className=" w-[15%]">
                                <p className="">
                                  {newData.totalAmount.toLocaleString()}
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className="flex flex-col items-end gap-3 mt-5 font-bold">
                    <div className="flex items-center justify-between w-[50%]">
                      <p>SubTotal:</p>
                      <p>${selectorSubTotal.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between w-[50%]">
                      <p>Discount:</p>
                      <p>0</p>
                    </div>
                    <div className="flex items-center justify-between w-[50%]">
                      <p>Tax:(5%)</p>
                      <p>${selectorTax.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between w-[50%] border-t border-gray-600">
                      <p>Total</p>
                      <p className="text-2xl">
                        ${selectorTotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-[80%] mx-auto bg-slate-50 text-black py-2 px-4 rounded-md h-[384px] top-1/2 -translate-y-1/2">
              <div className="absolute top-0 left-0 px-4 py-2 w-full flex items-center justify-between drop-shadow-md bg-slate-100">
                <h1>Create new invoice for Emmanuel Afolabi</h1>
                <div className="flex gap-5 items-center justify-between">
                  <button
                    onClick={handleSave}
                    className="bg-indigo-800 hover:bg-opacity-80 border-none outline-none px-5 py-2 rounded-md text-slate-100"
                  >
                    Loading...
                  </button>
                  <h1
                    className="cursor-pointer"
                    onClick={() => setClicked(!clicked)}
                  >
                    &#10005;
                  </h1>
                </div>
              </div>
              <div className="bg-gray-300 py-7 px-3 ">
                <div className="bg-slate-50 px-4 py-2 h-[300px] overflow-y-scroll">
                  <div>Invoice is loading</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default InvoiceModal;
