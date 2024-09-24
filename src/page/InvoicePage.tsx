import { useEffect, useState } from "react";
import { RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import InvoiceDetail from "../component/InvoiceDetail";
import EditInvoice from "../component/EditInvoice";
import { handleDeleteInvoice } from "../Redux/invoice";

const InvoicePage = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState<string | null>(null);
  const invoice = useSelector((state: RootState) => state.fullInvoiceData);
  const dispatch = useDispatch()
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

  const optionsDropdown = (id: string) => {
    setOptions(options === id ? null : id)
  }
  useEffect(() => {
    console.log(invoice);
  }, [invoice]);

  const handleDelete = (id: string) => {
    console.log(id)
    dispatch(handleDeleteInvoice(id))
  }

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
        {invoice && invoice?.map((data) => {
          return (
            <tr
              key={data?.id}
              // onClick={() => detailPage(data.id)}
              className="cursor-pointer"
            >
              <th>{data?.id}</th>
              {data?.items.map((ownData) => {
                return (
                  <th
                    onClick={() => detailPage(data.id)}
                    className="flex flex-col"
                  >
                    <p>{ownData?.name}</p>
                  </th>
                );
              })}
              <th onClick={() => detailPage(data?.id)}>{data.date}</th>
              <th onClick={() => detailPage(data?.id)}>
                {data?.mainTotalAmount}
              </th>
              <th onClick={() => detailPage(data?.id)}>{data.paid}</th>
              <th onClick={() => detailPage(data?.id)}>
                {data.stat ? "paid" : "unpaid"}
              </th>
              <th className="items-center justify-between text-black border">
                <button
                  onClick={() => optionsDropdown(data?.id)}
                  className="items-center justify-center mx-auto"
                >
                  &#8942;
                </button>
                <ul
                  className={`${
                    options === data.id ? "block" : "hidden"
                  } absolute w- left- bg-slate-500 p-3 flex-col `}
                >
                  <EditInvoice data={data}/>
                  <li onClick={()=> handleDelete(data.id)}>Delete Invoice</li>
                </ul>
              </th>
            </tr>
          );
        })}
      </table>

      {showModal ? (
        <>
          <div className="absolute top-0 left-0 h-screen w-full bg-slate-800 bg-opacity-60 ">
            <InvoiceDetail
              showModal={showModal}
              setShowModal={setShowModal}
              loading={loading}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default InvoicePage;
