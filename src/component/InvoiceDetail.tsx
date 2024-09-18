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
    <div className="relative w-[80%] mx-auto bg-slate-50 text-black py-2 px-4 rounded-md h-[384px] top-1/2 -translate-y-1/2">
      <div className="absolute top-0 left-0 px-4 w-full flex items-center justify-between border-b border-gray-700 bg-slate-100">
        <h1>New invoice details</h1>
        <h1 onClick={()=> setShowModal(!showModal)} className="cursor-pointer">&#10005;</h1>
      </div>
      {loading ? (
        <p className="text-center mt-32">Your Invoice details is loading...</p>
      ) : (
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
                {/* <th>Del</th> */}
              </tr>
              {dataObject?.items.map((item) => {
                return (
                  <tr key={item.id}>
                    <th>{item.date}</th>
                    <th className="">{item.name}</th>
                    <th>{item.duration}</th>
                    <th>
                      <p className="text-right mr-9">{item.totalAmount}</p>
                    </th>
                    {/* <th
                      onClick={() => handleDelete(item.id)}
                      className="cursor-pointer"
                    >
                      <p>&#10005;</p>
                    </th> */}
                  </tr>
                );
              })}
            </table>
            <div>
              <div className="flex items-center justify-between">
                <p>SubTotal:</p>
                <p>${dataObject?.subTotalAmount}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Discount:</p>
                <p>0</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Tax:(5%)</p>
                <p>${dataObject?.tax}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Total</p>
                <p>${dataObject?.mainTotalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetail;
