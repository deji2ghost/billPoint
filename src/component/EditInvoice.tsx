import { ChangeEvent, useEffect, useState } from "react";
import {
  Data,
  fullInvoice,
  FullInvoiceData,
  handleUpdateChange,
} from "../Redux/invoice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "./ui/CustomModal";

interface PropsData {
  data: FullInvoiceData;
}
const EditInvoice = ({ data }: PropsData) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [updateSaved, setUpdateSaved] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [tempData, setTempData] = useState(data);
  const selector = useSelector((state: RootState) => state.cart);
  // const selectorSubTotal = useSelector((state: RootState) => state.subTotal);
  const selectorInvoice = useSelector(
    (state: RootState) => state.fullInvoiceData
  );
  const dispatch = useDispatch();

  const handleEditSelectChange = (
    newData: fullInvoice,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const event = e.target.value;
    const updatedItems = tempData.items.map((item) => {
      if (item.id === newData.id) {
        const selectedItem = selector.find((select) => select.name === event);
        if (selectedItem) {
          return {
            ...item,
            description: `${selectedItem.name}, ${selectedItem.amount}, ${selectedItem.duration}`,
            duration: selectedItem.duration,
            name: selectedItem.name,
            currentDuration: selectedItem.duration,
            amount: selectedItem.amount,
            totalAmount: selectedItem.amount,
          };
        }
      }
      return item;
    });

    setTempData({ ...tempData, items: updatedItems });
  };

  const handleEditIncrease = (newData: Data) => {
    const updatedItems = tempData.items.map((item) => {
      if (item.id === newData.id) {
        const mainDuration = item.duration + item.currentDuration;
        const mainTotalAmount = item.totalAmount + item.amount;
        return {
          ...item,
          duration: mainDuration,
          totalAmount: mainTotalAmount,
        };
      }
      return item;
    });
    setTempData({ ...tempData, items: updatedItems });
  };
  const handleEditDecrease = (newData: Data) => {
    const updatedItems = tempData.items.map((item) => {
      if (item.id === newData.id) {
        const mainDuration = item.duration - item.currentDuration;
        const mainTotalAmount = item.totalAmount - item.amount;
        return {
          ...item,
          duration: mainDuration,
          totalAmount: mainTotalAmount,
        };
      }
      return item;
    });
    setTempData({ ...tempData, items: updatedItems });
  };

  const handleUpdate = (id: string, tempData: FullInvoiceData) => {
    console.log("update", id);
    setUpdateSaved(!updateSaved);
    const cantUpdate = tempData?.items.find(
      (invoice) => invoice.name === "" || invoice.name === "Select a bill"
    );
    console.log(cantUpdate);
    if (cantUpdate) {
      setUpdateSaved(false)
      toast("cant update");
      console.log("no update");
    } else {
      toast("Success");
      console.log("success");
      setUpdateSaved(false)
      setTimeout(() => {
        setIsLoading(true);
        console.log("is loading:", isLoading);
      }, 2000);
      dispatch(handleUpdateChange({ id, tempData }));
    }
  };

  const handleDelete = (id: number) => {
    const newData = tempData.items.filter(item=> item.id !== id)
    setTempData({...tempData, items: newData})
  }

  const handleClear = () => {
    console.log("clear");
    setShowEditModal(!showEditModal);
  };

  const handleNewEditData = () => {
    const newId = (tempData.items.length ?? 0) + 1;
    const today = new Date().toLocaleDateString();
    const newItem = {
      id: newId,
      name: "",
      date: today,
      description: "",
      duration: 0,
      currentDuration: 0,
      amount: 0,
      totalAmount: 0,
    };
    setTempData({ ...tempData, items: [...tempData.items, newItem] });
    // console.log(id)
    // dispatch(handleNewEditFormData(id));
    // console.log("new:", selectorInvoice);
  };
  useEffect(() => {
    console.log(selectorInvoice);
    console.log(tempData);
  }, [selectorInvoice, tempData]);
  return (
    <div className="hover:bg-slate-100">
      <button
        onClick={() => {
          console.log("clicked");
          setShowEditModal(!showEditModal);
          console.log(showEditModal);
        }}
        className="font-medium text-[15px] p-2 w-full"
      >
        EDIT INVOICE
      </button>
      {/* {showEditModal ? (
        <div className="fixed left-0 right-0 w-[80%] mx-auto bg-slate-100 text-black py-2 px-4 rounded-md h-[384px] top-1/2 -translate-y-1/2">
          <div className="absolute top-0 left-0 px-4 w-full flex items-center justify-between border-b border-gray-700 bg-slate-100">
            <h1>Edit invoice for Emmanuel Afolabi</h1>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleUpdate(data.id, tempData)}
                className="bg-indigo-800"
              >
                Update
              </button>
              <h1 className="cursor-pointer" onClick={handleClear}>
                &#10005;
              </h1>
            </div>
          </div>
          <div className="bg-gray-300 py-7 px-3 ">
            <div className="bg-slate-50 px-4 py-2 h-[300px] overflow-y-scroll auto">
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
                  <th>Del</th>
                </tr>
                {tempData && tempData.items.map((newData) => {
                  return (
                    <tr key={newData.id}>
                      <th>{newData.date}</th>
                      <th className="">
                        <select
                          onChange={(e) => handleEditSelectChange(newData, e)}
                          id="data"
                          className="w-full bg-white"
                        >
                          <option id={newData.name} value={newData.name}>
                            {newData.description}
                          </option>
                          {selector
                            // .filter((select) => select.name !== "Select a bill")
                            .map((select) => {
                              return (
                                <option id={select.name} value={select.name}>
                                  {`${select.name}, ${select.amount},
                                ${select.duration}`}
                                </option>
                              );
                            })}
                        </select>
                      </th>
                      <th>
                        <button
                          className="w-[10%] bg-blue-800"
                          onClick={() => handleEditDecrease(newData)}
                          disabled={
                            newData.currentDuration <= 0 ||
                            newData.duration <= newData.currentDuration
                          }
                        >
                          -
                        </button>
                        <input
                          className="border-none outline-none w-[10%]"
                          type="number"
                          value={
                            newData?.description === "Select a bill"
                              ? 0
                              : newData?.duration.toLocaleString()
                          }
                        />
                        <button
                          className="w-[10%] bg-blue-800"
                          onClick={() => handleEditIncrease(newData)}
                          disabled={newData.currentDuration <= 0}
                        >
                          +
                        </button>
                      </th>
                      <th>
                        <p className="text-right mr-9">
                          {newData.totalAmount.toLocaleString()}
                        </p>
                      </th>
                      <th
                        // onClick={() => handleDelete(newData.id)}
                        className="cursor-pointer"
                      >
                        <p>&#10005;</p>
                      </th>
                    </tr>
                  );
                })}
              </table>
              <button
                className="text-indigo-500"
                onClick={handleNewEditData}
              >
                Add new line
              </button>
              <div>
                <div className="flex items-center justify-between">
                  <p>SubTotal:</p>
                  <p>${data.subTotalAmount.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Discount:</p>
                  <p>0</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Tax:(5%)</p>
                  <p>${data.tax.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Total</p>
                  <p>${data.mainTotalAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null} */}
      <CustomModal
      openModal={showEditModal}
        invoiceHeader={"Edit invoice for Emmanuel Afolabi"}
        saveLoad={"Update"}
        selectorData={tempData.items}
        selectorSubTotal={tempData.subTotalAmount}
        selectorTax={tempData.subTotalAmount}
        selectorTotal={tempData.mainTotalAmount}
        handleUpdate={handleUpdate}
        handleDecrease={handleEditDecrease}
        handleIncrease={handleEditIncrease}
        handleEditSelectChange={handleEditSelectChange}
        handleNewData={handleNewEditData}
        handleDelete={handleDelete}
        selector={selector}
        isLoading={isLoading}
        handleClear={handleClear}
        dataSaved={updateSaved}
        tempData={tempData}
      />
      <ToastContainer />
    </div>
  );
};

export default EditInvoice;
