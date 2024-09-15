import { ChangeEvent, useEffect } from "react";
import { billed, service } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../Redux/store';
import { handleDecreasePage, handleIncreasePage, handleNewFormData, handleSelectFormChange } from "../Redux/invoice";

interface clickedObject {
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Data{
  id: number;
  date: string;
  description: string;
  duration: number;
  amount: number,
  totalAmount: number
}

const InvoiceModal = ({ clicked, setClicked }: clickedObject) => {
  const selector = useSelector((state: RootState)=> state.cart)
  const selectorData = useSelector((state: RootState)=> state.data)
  const selectorSubTotal = useSelector((state: RootState)=> state.subTotal)
  const selectorTax = useSelector((state: RootState)=> state.tax)
  const selectorTotal = useSelector((state: RootState)=> state.total)
  const dispatch = useDispatch()
  useEffect(()=> {
    console.log(selector)
    console.log(selectorData)
  }, [])
  // const [data, setData] = useState<Data[]>([]);
  const handleNewData = () => {
    dispatch(handleNewFormData())
  };
  const handleSelectChange = (id:number , e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(handleSelectFormChange({id, e}))
  }
  const handleDecrease = (newData: Data) => {
    dispatch(handleDecreasePage(newData))
  }
  const handleIncrease = (newData: Data) => {
    dispatch(handleIncreasePage(newData))
    console.log(selectorSubTotal)
 
  }
  return (
    <div className="absolute top-0 left-0 h-screen w-full bg-slate-800 bg-opacity-60 ">
      <div className="relative w-[80%] mx-auto bg-slate-50 text-black py-2 px-4 rounded-md h-[384px] top-1/2 -translate-y-1/2">
        <div className="absolute top-0 left-0 px-4 w-full flex items-center justify-between border-b border-gray-700 bg-slate-100">
          <h1>Create new invoice for Emmanuel Afolabi</h1>
          <div className="flex items-center justify-between">
            <button className="bg-indigo-800">Save</button>
            <h1 onClick={() => setClicked(!clicked)}>&#10005;</h1>
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
                  <tr id={newData.id.toString()}>
                    <td>{newData.date}</td>
                    <td className="">
                      <select onChange={(e)=>handleSelectChange(newData.id, e)} id="data" className="w-full bg-white">
                        <option>Select a bill</option>
                        {selector.map(select=> {
                          return(
                            <option id={select.name} value={select.name}>{select.name}, {select.amount}, {select.duration}</option>
                          )
                        })}
                      </select>
                    </td>
                    <tr>
                      <button className="w-[10%] bg-blue-800" onClick={()=>handleDecrease(newData)}>-</button>
                      <input className="border-none outline-none w-[10%]" type="number" value={newData?.duration ? newData?.duration : 0}/>
                      <button className="w-[10%] bg-blue-800" onClick={()=>handleIncrease(newData)}>+</button>
                    </tr>
                    <td>
                      <p>{newData.totalAmount}</p>
                    </td>
                  </tr>
                );
              })}
            </table>
            <button className="text-indigo-500" onClick={handleNewData}>Add new line</button>
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
    </div>
  );
};

export default InvoiceModal;
