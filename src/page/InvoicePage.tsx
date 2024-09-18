import { useEffect, useState } from "react";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import InvoiceDetail from "../component/InvoiceDetail";

const InvoicePage = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const invoice = useSelector((state: RootState) => state.fullInvoiceData);
  console.log(invoice);
  const detailPage = (id: string) => {
    console.log("clicked", id);
    const mainObject = invoice.find((data) => data.id === id);
    console.log("mainObj:", mainObject);
    localStorage.setItem("userData", JSON.stringify(mainObject));
    if (mainObject) {
      setShowModal(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  useEffect(() => {
    console.log(invoice);
  }, [invoice]);
  return (
    <div className="text-black">
      <table className="border w-full">
        <tr>
          <th>Invoice ID</th>
          <th>Details</th>
          <th>Date</th>
          <th>Fee</th>
          <th>Paid</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {invoice.map((data) => {
          return (
            <tr
              key={data.id}
              onClick={() => detailPage(data.id)}
              className="cursor-pointer"
            >
              <th>{data.id}</th>
              {data.items.map((ownData) => {
                return (
                  <th className="flex flex-col">
                    <p>{ownData?.name}</p>
                  </th>
                );
              })}
              <th>{data.date}</th>
              <th>{data.mainTotalAmount}</th>
              <th>{data.paid}</th>
              <th>{data.stat ? "paid" : "unpaid"}</th>
            </tr>
          );
        })}
      </table>

      {showModal ? (
        <>
          <div className="absolute top-0 left-0 h-screen w-full bg-slate-800 bg-opacity-60 ">
            <InvoiceDetail showModal={showModal} setShowModal={setShowModal} loading={loading}/>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default InvoicePage;
