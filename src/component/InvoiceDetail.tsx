import { useEffect, useState } from "react";
import { billed, service } from "../data/data";
import { FullInvoiceData } from "../Redux/invoice";

interface Loading {
  loading: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}

const InvoiceDetail = ({ loading, setShowModal, showModal }: Loading) => {
  const [dataObject, setDataObject] = useState<FullInvoiceData>();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const newData = JSON.parse(data);
      setDataObject(newData);
    }
    console.log(dataObject);
  }, []);

  useEffect(() => {
    console.log(dataObject);
  }, [dataObject]);
  return (
    <div className="relative w-[80%] mx-auto bg-slate-50 text-black py-2 px-4 rounded-md h-[400px] top-1/2 -translate-y-1/2">
      <div className="absolute top-0 left-0 px-4 py-2 w-full flex items-center justify-between drop-shadow-md bg-slate-100">
        <h1>New invoice details</h1>
        <h1
          onClick={() => setShowModal(!showModal)}
          className="cursor-pointer py-2"
        >
          &#10005;
        </h1>
      </div>
      {loading ? (
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
              {dataObject?.items.map((item) => {
                return (
                  <tr
                    className="border-b border-gray-600 items-center"
                    key={item.id}
                  >
                    <td className=" w-[15%]">{item.date}</td>
                    <td className=" w-[15%] py-7">{item.name}seconds</td>
                    <td className=" w-[15%]">
                    {item.duration}seconds
                    </td>
                    <td className=" w-[15%]">
                      <p className="">{item.totalAmount.toLocaleString()}</p>
                    </td>
                  </tr>
                );
              })}
            </table>

            <div className="flex flex-col items-end gap-3 mt-5 font-bold">
              <div className="flex items-center justify-between w-[50%]">
                <p>SubTotal:</p>
                <p>${dataObject?.subTotalAmount.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between w-[50%]">
                <p>Discount:</p>
                <p>0</p>
              </div>
              <div className="flex items-center justify-between w-[50%]">
                <p>Tax:(5%)</p>
                <p>${dataObject?.tax.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between w-[50%] border-t border-gray-600">
                <p>Total</p>
                <p className="text-2xl">
                  ${dataObject?.mainTotalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetail;
