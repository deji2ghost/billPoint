import { ReactNode } from "react";
import { fullInvoice } from "../../Redux/invoice";
import { Data } from "../InvoiceModal";

interface Props {
  children: ReactNode;
  handleButtonClick?: () => void;
  selectorData?: fullInvoice[];
  newData?: fullInvoice
  handleIncrease?: (newData: Data) => void
  handleDecrease?: (newData: Data) => void
}

const Button = ({ children, handleButtonClick, selectorData, newData, handleIncrease, handleDecrease }: Props) => {
  const handleAllButtonClick = () => {
    if(handleButtonClick){
      handleButtonClick()
    }else if(newData){
      if(handleIncrease) handleIncrease(newData)
      if(handleDecrease) handleDecrease(newData)
    }
  }

  const isSelector = handleButtonClick && (selectorData && selectorData.length <= 0)
  const isData = (handleIncrease || handleDecrease) && (newData && newData.currentDuration <= 0)
  const buttonClasses = `${isSelector || isData ? "bg-indigo-300" : "bg-indigo-800 hover:bg-opacity-80"} border-none outline-none px-5 py-2 rounded-md text-slate-100`;

  const isDisabled = isSelector || isData;
  console.log('buttondata:,', !isSelector, !isData)
  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      onClick={handleAllButtonClick}
    >
      {children}
    </button>
  );
};

export default Button;
