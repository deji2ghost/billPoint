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

interface clickedObject {
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Data {
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
  const [detailsPage, setDetailsPage] = useState(false);
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
      return;
    }
    console.log("saved");
    setDataSaved(false);
    console.log("latest loading:", isLoading);
    setTimeout(() => {
      setIsLoading(true);
      console.log("is loading:", isLoading);
    }, 2000);
    console.log("latest loading:", isLoading);
    dispatch(handleSaveFullInvoice());
    // toast("successfully saved")

    // if (dataSaved === false && cantSave === undefined) {
    //   toast("successfully saved");
    // }
  };

  const handleDetails = () => {
    setDetailsPage(!detailsPage);
    console.log("details", detailsPage);
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-full bg-slate-800 bg-opacity-60 ">
      {dataSaved ? (
        <div className="relative w-[80%] mx-auto bg-slate-50 text-black py-2 px-4 rounded-md h-[400px] top-1/2 -translate-y-1/2">
          <div className="absolute top-0 left-0 px-4 py-2 w-full flex items-center justify-between drop-shadow-md bg-slate-100">
            <h1>Create new invoice for Emmanuel Afolabi</h1>
            <div className="flex gap-5 items-center justify-between">
              <button
                disabled={selectorData.length <= 0}
                onClick={handleSave}
                className={`${
                  selectorData.length <= 0
                    ? "bg-indigo-300"
                    : "bg-indigo-800 hover:bg-opacity-80"
                } "border-none outline-none px-5 py-2 rounded-md text-slate-100 "`}
              >
                Save
              </button>
              <h1 className="cursor-pointer" onClick={handleClear}>
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
                      <p className="font-medium">{service.patientDetails}</p>
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
                    <th className="">Del</th>
                  </tr>
                </thead>
                <tbody className="text-left">
                  {selectorData &&
                    selectorData?.map((newData) => {
                      return (
                        <tr className="border-b border-gray-600 items-center" key={newData?.id}>
                          <td className=" w-[15%]">{newData?.date}</td>
                          <td className=" w-[15%] py-7">
                            <select
                              onChange={(e) =>
                                handleSelectChange(newData?.id, e)
                              }
                              id="data"
                              className="w-full bg-white border-[2px] border-gray-400 hover:border-indigo-800 outline-none rounded-md p-1"
                            >
                              {selector?.map((select) => {
                                return (
                                  <option id={select.name} value={select.name}>
                                    {select.name === "Select a bill"
                                      ? `${select.name}`
                                      : `${select.name}, ${select.amount},
                                ${select.duration}`}
                                  </option>
                                );
                              })}
                            </select>
                          </td>
                          <td className=" w-[15%] text-center">
                            <button
                              className={`${
                                newData.currentDuration <= 0
                                  ? "bg-indigo-300"
                                  : "bg-indigo-800 hover:bg-opacity-80"
                              } w-[25%] text-white text-[18px] outline-none border-none rounded-md`}
                              onClick={() => handleDecrease(newData)}
                              disabled={newData.currentDuration <= 0}
                            >
                              -
                            </button>
                            <input
                              className="w-[40%] text-center border border-gray-400 hover:border-indigo-800 outline-none rounded-md p-1"
                              type="number"
                              value={
                                newData?.description === "Select a bill"
                                  ? 0
                                  : newData?.duration.toLocaleString()
                              }
                            />
                            <button
                              className={`${
                                newData.currentDuration <= 0
                                  ? "bg-indigo-300"
                                  : "bg-indigo-800 hover:bg-opacity-80"
                              } w-[25%] text-white text-[18px] outline-none border-none rounded-md`}
                              onClick={() => handleIncrease(newData)}
                              disabled={newData.currentDuration <= 0}
                            >
                              +
                            </button>
                          </td>
                          <td className=" w-[15%]">
                            <p className="">
                              {newData.totalAmount.toLocaleString()}
                            </p>
                          </td>
                          <td
                            onClick={() => handleDelete(newData.id)}
                            className="cursor-pointer w-[15%]"
                          >
                            <p>&#10005;</p>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <button className="text-indigo-800 font-bold text-lg border-b py-2 border-gray-600 w-full text-left" onClick={handleNewData}>
                Add New Line
              </button>
              <div className="flex flex-col items-end border">
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
                <div className="flex items-center justify-between w-[50%]">
                  <p>Total</p>
                  <p>${selectorTotal.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isLoading === true ? (
            <div className="relative w-[80%] mx-auto bg-slate-50 text-black py-2 px-4 rounded-md h-[384px] top-1/2 -translate-y-1/2">
              <div className="absolute top-0 left-0 px-4 py-2 w-full flex items-center justify-between drop-shadow-md bg-slate-100">
                <h1>Create new invoice for Emmanuel Afolabi</h1>
                <div className="flex items-center justify-between">
                  <h1 className="cursor-pointer" onClick={handleClear}>
                    &#10005;
                  </h1>
                </div>
              </div>
              <div className="bg-gray-300 py-7 px-3 ">
                <div className="bg-slate-50 px-4 py-2 h-[300px] overflow-y-scroll">
                  <h1>Invoice</h1>
                  <div className="border-b border-gray-700">
                    <div>
                      <p>Date:</p>
                      <p>04 Jul, 2024</p>
                    </div>
                    <div className="flex gap-28">
                      <div className="">
                        <div>
                          <p>Billed From:</p>
                          <p>{billed.billedFrom}</p>
                        </div>
                        <div>
                          <p>Service Provider:</p>
                          <p>{service.serviceProviderPlace}</p>
                          <p>{service.serviceProviderLocation}</p>
                          <p>{service.serviceProviderNumber}</p>
                        </div>
                      </div>
                      <div className="">
                        <div>
                          <p>Billed To:</p>
                          <p>{billed.billedTo}</p>
                        </div>
                        <div>
                          <p>Patient Details:</p>
                          <p>{service.patientDetails}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table className="border w-full text-left">
                    <tr className="">
                      <th>Date</th>
                      <th>Description</th>
                      <th>Duration</th>
                      <th>Amount</th>
                    </tr>
                    {selectorData.map((newData) => {
                      return (
                        <tr
                          className="cursor-pointer"
                          onClick={handleDetails}
                          key={newData.id}
                        >
                          <th className="cursor-pointer">{newData.date}</th>
                          <th className="">{newData.description}</th>
                          <th>{newData.duration}seconds</th>
                          <th>
                            <p className="text-left mr-9">
                              {newData.totalAmount.toLocaleString()}
                            </p>
                          </th>
                        </tr>
                      );
                    })}
                  </table>
                  <div>
                    <div className="flex items-center justify-between">
                      <p>SubTotal:</p>
                      <p>${selectorSubTotal.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Discount:</p>
                      <p>0</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Tax:(5%)</p>
                      <p>${selectorTax.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Total</p>
                      <p>${selectorTotal.toLocaleString()}</p>
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
