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
  const dispatch = useDispatch();
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
    setOptions(options === id ? null : id);
  };
  useEffect(() => {
    console.log(invoice);
  }, [invoice]);

  const handleDelete = (id: string) => {
    console.log(id);
    dispatch(handleDeleteInvoice(id));
  };

  return (
    <div className="text-black">
      <table className="border w-full">
        <thead className="bg-gray-400 text-left">
          <tr className="">
            <th>Invoice ID</th>
            <th>Details</th>
            <th>Date</th>
            <th>Fee</th>
            <th>Paid</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {invoice &&
            invoice?.map((data) => {
              return (
                <tr
                  key={data?.id}
                  // onClick={() => detailPage(data.id)}
                  className="cursor-pointer text-gray-700 border-y"
                >
                  <th className="text-indigo-900">{data?.id}</th>
                  {data?.items.map((ownData) => {
                    return (
                      <td
                        onClick={() => detailPage(data.id)}
                        className="flex flex-col"
                      >
                        {ownData?.name}
                      </td>
                    );
                  })}
                  <td onClick={() => detailPage(data?.id)}>{data.date}</td>
                  <td onClick={() => detailPage(data?.id)}>
                    {data?.mainTotalAmount}
                  </td>
                  <td onClick={() => detailPage(data?.id)}>{data.paid}</td>
                  <td onClick={() => detailPage(data?.id)}>
                    <p className={`${data.stat ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-600'} w-[40%] text-center rounded-md`}>{data.stat ? "paid" : "unpaid"}</p>
                  </td>
                  <td className="relative">
                    <button
                      onClick={() => optionsDropdown(data?.id)}
                      className="items-center justify-center mx-auto text-xl font-black"
                    >
                      &#8942;
                    </button>
                    <ul
                      className={`${
                        options === data.id ? "block" : "hidden"
                      } absolute left-0 right-0 mx-auto bg-white w-[90%] z-50`}
                    >
                      <EditInvoice data={data} />
                      <li
                        onClick={() => handleDelete(data.id)}
                        className="font-medium text-[15px] p-2 hover:bg-slate-100"
                      >
                        DELETE INVOICE
                      </li>
                    </ul>
                  </td>
                </tr>
              );
            })}
        </tbody>
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
