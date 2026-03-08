import { useState } from 'react'
import { FiCheck, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { FaInbox } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { toast } from 'react-toastify';



const StudentList = ({ students, updateTask, deleteTask, isLoading }) => {
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [isWorking, setIsWorking] = useState(false);

    const handleDelete = async (id) => {
      try {
        setIsWorking(true);
        await deleteTask(id);
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error(error.message || "Unable to delete task");
      } finally {
        setIsWorking(false);
      }
    };

    const handleEdit = (student) => {
        setEditId(student.id);
        setEditName(student.name);
    };

    const handleUpdate = async (id) => {
      if (editName.trim().length === 0) {
        toast.error("Name must be filled");
        return;
      }

      try {
        setIsWorking(true);
        await updateTask(id, { name: editName.trim() });
        setEditId(null);
        setEditName("");
        toast.success("Task updated successfully");
      } catch (error) {
        toast.error(error.message || "Unable to update task");
      } finally {
        setIsWorking(false);
      }
    };

    const handleToggle = async (student) => {
      try {
        setIsWorking(true);
        await updateTask(student.id, { completed: !student.completed });
      } catch (error) {
        toast.error(error.message || "Unable to update task status");
      } finally {
        setIsWorking(false);
      }
    };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-dashed border-stone-200 bg-stone-50 px-4 py-6 justify-center text-center text-sm text-stone-500">
        Loading tasks...
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-stone-200 bg-stone-50 px-4 py-6 justify-center text-center text-sm text-stone-500">
        <FaInbox size={50}  className='justify-self-center m-5 '/>
        No tasks yet. Add your first one above.
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {students.map(student => (
        <li key={student.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
          {editId === student.id ? (
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400/40 sm:min-w-0 sm:flex-1"
              />
              <button aria-label={`Save ${student.name}`} onClick={() => handleUpdate(student.id)} className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-950 sm:w-auto">
                <FiCheck className="text-sm" aria-hidden="true" />
                Save
              </button>
              <button onClick={() => { setEditId(null); setEditName(""); }} className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-950 sm:w-auto">
                <ImCancelCircle  className='text-sm' aria-hidden="true"/>
                Cancel
                
              </button>
            </div>
          ) : (
            <>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={!!student.completed}
                  onChange={() => handleToggle(student)}
                  disabled={isWorking}
                  className="h-4 w-4 rounded border-stone-300 bg-white text-stone-900 focus:ring-stone-400/40"
                />
                <span className={student.completed ? "text-stone-400 line-through" : "text-stone-900"}>
                  {student.name}
                </span>
              </label>
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <button onClick={() => handleEdit(student)} disabled={isWorking} className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-600 transition hover:border-stone-400 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none">
                  <FiEdit2 className="text-sm" aria-hidden="true" />
                  Edit
                </button>
                <button aria-label={`Delete ${student.name}`} onClick={() => handleDelete(student.id)} disabled={isWorking} className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-600 transition hover:border-stone-400 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none">
                  <FiTrash2 className="text-sm" aria-hidden="true" />
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export default StudentList
