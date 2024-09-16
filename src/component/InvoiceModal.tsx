import { ChangeEvent, useEffect, useState } from "react";
import { billed, service } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import {
  handleClearForm,
  handleDecreasePage,
  handleDeleteForm,
  handleIncreasePage,
  handleNewFormData,
  handleSelectFormChange,
} from "../Redux/invoice";

interface clickedObject {
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Data {
  id: number;
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
    console.log("increase data:", newData)
  };
  const handleDelete = (id: number) => {
    dispatch(handleDeleteForm(id));
  };
  const handleClear = () => {
    setClicked(!clicked)
    dispatch(handleClearForm());
  };

  const handleSave = () => {
    console.log("saved");
    setDataSaved(!dataSaved);
    const switchLoading = dataSaved === true
    console.log("switch loading:", switchLoading, dataSaved)
    if (switchLoading) {
      setTimeout(() => {
        setIsLoading(true);
        console.log("is loading:", isLoading)
      }, 2000);
    }
  };
  useEffect(() => {
    console.log(selectorData, selectorSubTotal);
  }, [selectorData]);
  return (
    <div className="absolute top-0 left-0 h-screen w-full bg-slate-800 bg-opacity-60 ">
      {dataSaved ? (
        <div className="relative w-[80%] mx-auto bg-slate-50 text-black py-2 px-4 rounded-md h-[384px] top-1/2 -translate-y-1/2">
          <div className="absolute top-0 left-0 px-4 w-full flex items-center justify-between border-b border-gray-700 bg-slate-100">
            <h1>Create new invoice for Emmanuel Afolabi</h1>
            <div className="flex items-center justify-between">
              <button onClick={handleSave} className="bg-indigo-800">
                Save
              </button>
              <h1
                className="cursor-pointer"
                onClick={handleClear}
              >
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
                  <th>Del</th>
                </tr>
                {selectorData.map((newData) => {
                  return (
                    <tr key={newData.id}>
                      <th>{newData.date}</th>
                      <th className="">
                        <select
                          onChange={(e) => handleSelectChange(newData.id, e)}
                          id="data"
                          className="w-full bg-white"
                        >
                          {selector.map((select) => {
                            return (
                              <option id={select.name} value={select.name}>
                                { select.name === "Select a bill" ? `${select.name}` : `${select.name}, ${select.amount},
                                ${select.duration}`}
                              </option>
                            );
                          })}
                        </select>
                      </th>
                      <th>
                        <button
                          className="w-[10%] bg-blue-800"
                          onClick={() => handleDecrease(newData)}
                          disabled={newData.currentDuration <= 0}
                        >
                          -
                        </button>
                        <input
                          className="border-none outline-none w-[10%]"
                          type="number"
                          value={newData?.description === "Select a bill" ? 0 : newData?.duration.toLocaleString()}
                        />
                        <button
                          className="w-[10%] bg-blue-800"
                          onClick={() => handleIncrease(newData)}
                          disabled={newData.currentDuration <= 0}
                        >
                          +
                        </button>
                      </th>
                      <th>
                        <p className="text-right mr-9">{newData.totalAmount.toLocaleString()}</p>
                      </th>
                      <th
                        onClick={() => handleDelete(newData.id)}
                        className="cursor-pointer"
                      >
                        <p>&#10005;</p>
                      </th>
                    </tr>
                  );
                })}
              </table>
              <button className="text-indigo-500" onClick={handleNewData}>
                Add new line
              </button>
              <div>
                <div className="flex items-center justify-between">
                  <p>SubTotal:</p>
                  <p>${selectorSubTotal}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Discount:</p>
                  <p>0</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Tax:(5%)</p>
                  <p>${selectorTax}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Total</p>
                  <p>${selectorTotal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isLoading === true ? (
            <div className="relative w-[80%] mx-auto bg-slate-50 text-black py-2 px-4 rounded-md h-[384px] top-1/2 -translate-y-1/2">
              <div className="absolute top-0 left-0 px-4 w-full flex items-center justify-between border-b border-gray-700 bg-slate-100">
                <h1>Create new invoice for Emmanuel Afolabi</h1>
                <div className="flex items-center justify-between">
                  <button onClick={handleSave} className="bg-indigo-800">
                    Save
                  </button>
                  <h1
                    className="cursor-pointer"
                    onClick={handleClear}
                  >
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
                        <tr key={newData.id}>
                          <th>{newData.date}</th>
                          <th className="">{newData.description}</th>
                          <th>{newData.duration}seconds</th>
                          <th>
                            <p>{newData.totalAmount}</p>
                          </th>
                        </tr>
                      );
                    })}
                  </table>
                  <div>
                    <div className="flex items-center justify-between">
                      <p>SubTotal:</p>
                      <p>${selectorSubTotal}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Discount:</p>
                      <p>0</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Tax:(5%)</p>
                      <p>${selectorTax}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Total</p>
                      <p>${selectorTotal}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-[80%] mx-auto bg-slate-50 text-black py-2 px-4 rounded-md h-[384px] top-1/2 -translate-y-1/2">
              <div className="absolute top-0 left-0 px-4 w-full flex items-center justify-between border-b border-gray-700 bg-slate-100">
                <h1>Create new invoice for Emmanuel Afolabi</h1>
                <div className="flex items-center justify-between">
                  <button onClick={handleSave} className="bg-indigo-800">
                    Save
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
    </div>
  );
};

export default InvoiceModal;
