interface DetailsProps {
  id: number;
  date: string;
  name: string;
  duration: number;
  totalAmount: number;
}

const DetailsDataTable = ({ date, name, duration, totalAmount, id }: DetailsProps) => {
  return (
    <tr className="border-b border-gray-600 items-center" key={id}>
      <td className=" w-[15%]">{date}</td>
      <td className=" w-[15%] py-7">{name}</td>
      <td className=" w-[15%]">{duration}seconds</td>
      <td className=" w-[15%]">
        <p className="">{totalAmount.toLocaleString()}</p>
      </td>
    </tr>
  );
};

export default DetailsDataTable;
