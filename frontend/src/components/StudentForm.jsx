import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import StudentList from './StudentList';
import { toast } from 'react-toastify';

const StudentForm = ({ students, createTask, updateTask, deleteTask, isLoading }) => {

    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim().length === 0) {
            toast.error("Text must be filled");
            return;
        }

        try {
            setIsSubmitting(true);
            await createTask(name.trim());
            toast.success("Task added successfully");
            setName("");
        } catch (error) {
            toast.error(error.message || "Unable to add task");
        } finally {
            setIsSubmitting(false);
        }
    }
    
    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_18px_36px_rgba(0,0,0,0.08)]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input 
                    type="text"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    placeholder='Enter task'
                    disabled={isSubmitting}
                    className='w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400/40'
                    />
                    <button type='submit' disabled={isSubmitting} className='inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl cursor-pointer bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-950 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'>
                        <FiPlus className="text-base" aria-hidden="true" />
                        {isSubmitting ? 'Add' : 'Add'}
                    </button>
            </form>
            <div className="mt-6">
                <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-stone-500">
                    <span>Tasks</span>
                    <span>{students.length} total</span>
                </div>
                <StudentList students={students} updateTask={updateTask} deleteTask={deleteTask} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default StudentForm