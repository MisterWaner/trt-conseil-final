import { FaTrashCan } from "react-icons/fa6";


type TableProps = {
    data: Record<string, number>[];
    columsToShow: string[];
    subject?: string;
    updateConsultantInList: (updatedConsultant: { id: string; }) => void;
    deleteConsultant: (id: string) => void;
};


const AdminTable = ({ data, columsToShow, updateConsultantInList, deleteConsultant }: TableProps) => {

    const handleButtonDelete = async (id: string) => {
        try {
            console.log(id);
            deleteConsultant(id);
            updateConsultantInList({ id });
            
        } catch (error) {
            console.error(error, "Une erreur est survenue");
        }
    }

    return (
        <table className="min-w-full border border-black divide-y divide-black">
            <thead className="bg-black text-white text-center">
                <tr>
                    {columsToShow.map((column) => (
                        <th key={column} scope="col" className="py-2 px-4">
                            {column}
                        </th>
                    ))}
                    <th scope="col" className="py-2 px-4">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-400">
                {data.map((row, rowIndex) => (
                    <tr
                        key={rowIndex}
                        className="text-center hover:bg-slate-200"
                    >
                        {columsToShow.map((column, columnIndex) => (
                            <td key={columnIndex} className="py-2 px-4">
                                {row[column]}
                            </td>
                        ))}
                        <td className="py-2 px-4">
                            <div className="flex justify-around items-center">
                                <button
                                    
                                >
                                    <FaTrashCan className="text-red-500 hover:text-red-800 cursor-pointer w-5 h-5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AdminTable;
