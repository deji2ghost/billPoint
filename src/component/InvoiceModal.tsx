import { useState } from "react";
import { billed, service } from "../data/data";

interface clickedObject{
  clicked: boolean,
  setClicked: React.Dispatch<React.SetStateAction<boolean>>
}

interface Data{ 
  date: string
  description: string
}

const InvoiceModal = ({clicked, setClicked}: clickedObject) => {
  const [data, setData] = useState<Data[]>([])
  const handleNewData = () => {
    const date = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const Today = `${date} - ${month} - ${year}`
    console.log(Today)
    if (Today){
      setData([...data, { date: Today, description: ''}])
      console.log(data)
    }
  }
  console.log(billed)
  return (
    <div className="absolute top-0 left-0 h-screen w-full bg-slate-800 bg-opacity-60 ">
      <div className="relative w-[50%] mx-auto bg-slate-50 text-black py-2 px-4 rounded-md h-[384px] top-1/2 -translate-y-1/2">
        <div className="absolute top-0 left-0 px-4 w-full flex items-center justify-between border-b border-gray-700 bg-slate-100">
          <h1>Create new invoice for Emmanuel Afolabi</h1>
          <div className="flex items-center justify-between">
            <button className="bg-indigo-800">Save</button>
            <h1 onClick={() => setClicked(!clicked)}>&#10005;</h1>
          </div>
        </div>
        <div className="bg-gray-300 py-7 px-3">
          <div className="bg-slate-50 px-4 py-2">
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
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Amount</th>
              </tr>
                {
                  data.map(newData=> {
                    return(
                      <tr>
                        <td>{newData.date}</td>
                        <td className="">
                          <select id="data" className="w-full bg-white">
                            <option>Select a bill</option>
                            <option>Bliss 20</option>
                            <option>Ade 60</option>
                            <option>BadBoy 10</option>
                            <option>Rocky 30</option>
                            <option>baby 300</option>
                          </select>
                        </td>
                      </tr>
                    )
                  })
                }
            </table>
            <button onClick={handleNewData}>Add new line</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
