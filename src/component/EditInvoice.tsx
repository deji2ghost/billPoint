import { ChangeEvent, useEffect, useState } from "react";
import {
  Data,
  fullInvoice,
  FullInvoiceData,
  handleEditDecreasePage,
  handleEditIncreasePage,
  handleEditSelectFormChange,
  handleNewEditFormData,
} from "../Redux/invoice";
import { useDispatch, useSelector } from "react-redux";
import { billed, service } from "../data/data";
import { RootState } from "../Redux/store";
import { ToastContainer } from "react-toastify";

interface PropsData {
  data: FullInvoiceData;
}
const EditInvoice = ({ data }: PropsData) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [updateSaved, setUpdateSaved] = useState(false);
  const selector = useSelector((state: RootState) => state.cart);
  const selectorSubTotal = useSelector((state: RootState) => state.subTotal);
  const selectorInvoice = useSelector(
    (state: RootState) => state.fullInvoiceData
  );
  const dispatch = useDispatch();

  const handleEditSelectChange = (
    newData: fullInvoice,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const event = e.target.value;
    console.log(event, data.id);
    const id = data.id;
    dispatch(handleEditSelectFormChange({ newData, id, event }));
  };

  const handleEditIncrease = (newData: Data) => {
    const id = data.id;
    dispatch(handleEditIncreasePage({ newData, id }));
    console.log(selectorSubTotal);
    console.log("edit increase data:", newData);
  };
  const handleEditDecrease = (newData: Data) => {
    const id = data.id;
    dispatch(handleEditDecreasePage({ newData, id }));
    console.log(selectorSubTotal);
    console.log("edit increase data:", newData);
  };

  const handleUpdate = (id: string) => {
    console.log("update", id);
    setUpdateSaved(!updateSaved);
    // const switchLoading = updateSaved === true
    // console.log("switch loading:", switchLoading, updateSaved)
    const cantUpdate = selectorInvoice.map((invoice) => {
      if (invoice.id === id) {
        return {
          ...invoice,
          items: invoice.items.find(
            (inItems) => inItems.name === "" || "Select a bill"
          ),
        };
      } else {
        return invoice;
      }
    });
    console.log(cantUpdate);
  };

  const handleClear = () => {
    console.log("clear");
    setShowEditModal(!showEditModal);
  };

  const handleNewEditData = (id: string) => {
    dispatch(handleNewEditFormData(id));
    console.log("new:", selectorInvoice);
  };
  useEffect(() => {
    console.log(selectorInvoice);
  }, [selectorInvoice]);
  return (
    <div className="p-2 hover:bg-slate-100">
      <li
        onClick={() => {
          console.log("clicked");
          setShowEditModal(!showEditModal);
          console.log(showEditModal);
        }}
        className="font-medium text-[15px]"
      >
        EDIT INVOICE
      </li>
      {showEditModal ? (
        <div className="fixed left-0 right-0 w-[80%] mx-auto bg-slate-100 text-black py-2 px-4 rounded-md h-[384px] top-1/2 -translate-y-1/2">
          <div className="absolute top-0 left-0 px-4 w-full flex items-center justify-between border-b border-gray-700 bg-slate-100">
            <h1>Edit invoice for Emmanuel Afolabi</h1>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleUpdate(data.id)}
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
                {data.items.map((newData) => {
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
                            .filter((select) => select.name !== "Select a bill")
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
                onClick={() => handleNewEditData(data.id)}
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
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default EditInvoice;
