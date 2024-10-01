interface OptionProps {
  selectName: string;
  selectAmount: number;
  selectDuration: number;
}

const OptionModal = ({
  selectName,
  selectAmount,
  selectDuration,
}: OptionProps) => {
  return (
    <option id={selectName} value={selectName}>
      {selectName === "Select a bill"
        ? `${selectName}`
        : `${selectName}, ${selectAmount},
        ${selectDuration}`}
    </option>
  );
};

export default OptionModal;
