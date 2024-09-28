import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import {
  handleClearForm,
  handleDecreasePage,
  handleDeleteForm,
  handleIncreasePage,
  handleNewFormData,
  handleSaveFullInvoice,
  handleSelectFormChange,
} from "../Redux/invoice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "./ui/CustomModal";

interface clickedObject {
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Data {
  id: number;
  name: string;
  date: string;
  description: string;
  duration: number;
  currentDuration: number;
  amount: number;
  totalAmount: number;
}

const InvoiceModal = ({ clicked, setClicked }: clickedObject) => {
  const selector = useSelector((state: RootState) => state.cart);
  const selectorData = useSelector((state: RootState) => state.data);
  const selectorSubTotal = useSelector((state: RootState) => state.subTotal);
  const selectorTax = useSelector((state: RootState) => state.tax);
  const selectorTotal = useSelector((state: RootState) => state.total);
  const [isLoading, setIsLoading] = useState(false);
  // const [detailsPage, setDetailsPage] = useState(false);
  const dispatch = useDispatch();

  const [dataSaved, setDataSaved] = useState<boolean>(true);
  const handleNewData = () => {
    dispatch(handleNewFormData());
  };
  const handleSelectChange = (
    id: number,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const event = e.target.value;
    dispatch(handleSelectFormChange({ id, event }));
  };
  const handleDecrease = (newData: Data) => {
    if (newData?.duration > newData?.currentDuration) {
      dispatch(handleDecreasePage(newData));
    }
  };
  const handleIncrease = (newData: Data) => {
    dispatch(handleIncreasePage(newData));
    console.log(selectorSubTotal);
    console.log("increase data:", newData);
  };
  const handleDelete = (id: number) => {
    dispatch(handleDeleteForm(id));
  };
  const handleClear = () => {
    setClicked(!clicked);
    dispatch(handleClearForm());
  };

  const handleSave = () => {
    console.log("saved");
    const cantSave = selectorData?.find(
      (item: Data) => item.name === "" || item.name === "Select a bill"
    );
    console.log("cant save:", cantSave);
    if (cantSave || selectorData.length < 1) {
      console.log("wrong");
      toast("You have to select an item. Select a bill is not selectable");
      setDataSaved(true);
    } else {
      // toast("successfully saved");
      console.log("saved");
      setDataSaved(false);
      console.log("latest loading:", isLoading);
      setTimeout(() => {
        setIsLoading(true);
        console.log("is loading:", isLoading);
      }, 2000);
      console.log("latest loading:", isLoading);
      dispatch(handleSaveFullInvoice());
    }
  };

  // const handleDetails = () => {
  //   setDetailsPage(!detailsPage);
  //   console.log("details", detailsPage);
  // };

  return (
    <div>
      {dataSaved ? (
        <CustomModal
          openModal={clicked}
          invoiceHeader={"Create new invoice for Emmanuel Afolabi"}
          saveLoad={"Save"}
          selectorData={selectorData}
          selectorSubTotal={selectorSubTotal}
          selectorTax={selectorTax}
          selectorTotal={selectorTotal}
          handleSave={handleSave}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          handleSelectChange={handleSelectChange}
          handleNewData={handleNewData}
          handleDelete={handleDelete}
          selector={selector}
          isLoading={isLoading}
          handleClear={handleClear}
          dataSaved={dataSaved}
        />
      ) : (
        <>
          <CustomModal
          openModal={clicked}
            saveLoad={" "}
            invoiceHeader={"Create new invoice for Emmanuel Afolabi"}
            selectorData={selectorData}
            selectorSubTotal={selectorSubTotal}
            selectorTax={selectorTax}
            selectorTotal={selectorTotal}
            handleSave={handleSave}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            handleSelectChange={handleSelectChange}
            handleNewData={handleNewData}
            handleDelete={handleDelete}
            selector={selector}
            isLoading={isLoading}
            handleClear={handleClear}
            dataSaved={dataSaved}
          />
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default InvoiceModal;
