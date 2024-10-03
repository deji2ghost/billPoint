import { ChangeEvent } from "react";
import { CartItem, fullInvoice } from "../Redux/invoice";
import { Data } from "./InvoiceModal";
import OptionModal from "./OptionModal";
import Button from "./ui/CustomButton";

interface newDataProps{
  newData: fullInvoice
  handleSelectChange?: (id: number, e: ChangeEvent<HTMLSelectElement>) => void
  handleEditSelectChange?: (newData: fullInvoice, e: ChangeEvent<HTMLSelectElement>) => void
  selector: CartItem[]
  handleIncrease: (newData: Data) => void
  handleDecrease: (newData: Data) => void
  handleDelete: (id: number) => void
}

const NewDataTable = ({newData, handleSelectChange, handleEditSelectChange, selector, handleIncrease,
  handleDecrease, handleDelete}: newDataProps) => {
  return (
    <tr className="border-b border-gray-600 items-center" key={newData?.id}>
      <td className=" w-[15%]">{newData?.date}</td>
      <td className=" w-[15%] py-7">
        <select
          onChange={(e) => {
            if (handleSelectChange && newData?.id) {
              handleSelectChange(newData?.id, e);
            } else if (handleEditSelectChange && newData) {
              handleEditSelectChange(newData, e);
            }
          }}
          id="data"
          className="w-full bg-white border-[2px] border-gray-400 hover:border-indigo-800 outline-none rounded-md p-1"
        >
          {handleSelectChange && newData?.id ? (
            selector?.map((select) => {
              return (
                <OptionModal selectName={select.name} selectAmount={select.amount} selectDuration={select.duration}/>
              );
            })
          ) : handleEditSelectChange && newData ? (
            <>
              <option id={newData.name} value={newData.name}>
                {newData.description}
              </option>
              {selector
                ?.filter((select) => select.name !== "Select a bill")
                .map((select) => {
                  return (
                    <option id={select.name} value={select.name}>
                      {select.name === "Select a bill"
                        ? `${select.name}`
                        : `${select.name}, ${select.amount},
                                        ${select.duration}`}
                    </option>
                  );
                })}
            </>
          ) : null}
        </select>
      </td>
      <td className=" w-[15%] text-center">
        <Button newData={newData} handleDecrease={handleDecrease}>
          -
        </Button>
        <input
          className="w-[40%] text-center border border-gray-400 hover:border-indigo-800 outline-none rounded-md p-1 mx-1"
          type="number"
          value={
            newData?.description === "Select a bill"
              ? 0
              : newData?.duration.toLocaleString()
          }
        />
        <Button newData={newData} handleIncrease={handleIncrease}>
          +
        </Button>
      </td>
      <td className=" w-[15%]">
        <p className="">{newData.totalAmount.toLocaleString()}</p>
      </td>
      <td
        onClick={() => handleDelete(newData.id)}
        className="cursor-pointer w-[15%]"
      >
        <p>&#10005;</p>
      </td>
    </tr>
  );
};

export default NewDataTable;
