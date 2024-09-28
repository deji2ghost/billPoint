import React, { ChangeEvent } from "react";
import { CartItem, fullInvoice } from "../../Redux/invoice";
import { Data } from "../InvoiceModal";
import { billed, service } from "../../data/data";

interface CustomModalProps {
  openModal: boolean;
  invoiceHeader: string;
  selectorData: fullInvoice[];
  selectorSubTotal: number;
  selectorTax: number;
  selectorTotal: number;
  handleSave: () => void;
  handleDecrease: (newData: Data) => void;
  handleIncrease: (newData: Data) => void;
  handleSelectChange: (id: number, e: ChangeEvent<HTMLSelectElement>) => void;
  handleNewData: () => void;
  handleDelete: (id: number) => void;
  selector: CartItem[];
  isLoading: boolean;
  handleClear: () => void;
  dataSaved: boolean;
  saveLoad: string;
}
const CustomModal = ({
  openModal,
  invoiceHeader,
  selectorData,
  selectorSubTotal,
  selectorTax,
  selectorTotal,
  handleSave,
  handleIncrease,
  handleDecrease,
  handleSelectChange,
  handleNewData,
  handleDelete,
  selector,
  isLoading,
  handleClear,
  dataSaved,
  saveLoad,
}: CustomModalProps) => {
  return (
    <div
      className={`${
        openModal ? "block" : "hidden"
      } " fixed top-0 left-0 h-screen w-full bg-slate-800 bg-opacity-60 "`}
    >
      <div
        className="relative w-[80%] mx-auto bg-slate-50 text-black py-2 px-4 rounded-md h-[400px] top-1/2 -translate-y-1/2"
      >
        <div className="absolute top-0 left-0 px-4 py-2 w-full flex items-center justify-between drop-shadow-md bg-slate-100">
          <h1>{invoiceHeader}</h1>
          <div className="flex gap-5 items-center justify-between">
            {!dataSaved ? (
              !isLoading && (
                <button className="bg-indigo-800 border-none outline-none px-5 py-2 rounded-md text-slate-100">
                  Loading
                </button>
              )
            ) : (
              <button
                disabled={selectorData.length <= 0}
                onClick={handleSave}
                className={`${
                  selectorData.length <= 0
                    ? "bg-indigo-300"
                    : "bg-indigo-800 hover:bg-opacity-80"
                } "border-none outline-none px-5 py-2 rounded-md text-slate-100 "`}
              >
                {saveLoad}
              </button>
            )}
            <h1 className="cursor-pointer py-2" onClick={handleClear}>
              &#10005;
            </h1>
          </div>
        </div>
       {dataSaved ? <div className="bg-gray-300 py-3 px-3 mt-12">
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
                        <tr
                          className="border-b border-gray-600 items-center"
                          key={newData?.id}
                        >
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
            {dataSaved && (
              <button
                className="text-indigo-800 font-bold text-lg border-b py-2 border-gray-600 w-full text-left"
                onClick={handleNewData}
              >
                Add New Line
              </button>
            )}
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
                <p className="text-2xl">${selectorTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div> : 
        !isLoading ? (
        <p className="text-center mt-32">Your Invoice details is loading...</p>
      ) : (
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
                </tr>
              </thead>
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
                <p className="text-2xl">${selectorTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default CustomModal;
