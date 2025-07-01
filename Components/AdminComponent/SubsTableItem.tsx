import React from "react";

interface props {
  mongoId: string;
  email: string;
  date: string;
  deleteEmail: any;
}

const SubsTableItem = ({ mongoId, email, date, deleteEmail }: props) => {
  const emailDate = new Date(date);
  return (
    <tr className="bg-white border-b text-left ">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        {email ? email : "No email"}
      </th>
      <td className="px-6 py-4 hidden sm:block ">{emailDate.toDateString()}</td>
      <td>
        <button
          className="text-white bg-red-500 px-10 py-2 ml-4 rounded-sm cursor-pointer"
          onClick={() => deleteEmail(mongoId)}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default SubsTableItem;
