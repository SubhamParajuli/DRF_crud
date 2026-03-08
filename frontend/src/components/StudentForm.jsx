import React from 'react'
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import StudentList from './StudentList';
import { toast } from 'react-toastify';

const StudentForm = ({students,setStudent}) => {

    const [name,setName]=useState("");


    const handleSubmit=(e)=>{
        e.preventDefault();

        if (name.trim().length === 0){
            toast.error("Name must be filled");
            return;
        }

        const newStudent={
            id: Date.now(),
            name: name.trim(),
            completed: false,
        }

        setStudent([...students,newStudent])
        toast.success("Task added successfully")
        setName("");
    }
    
    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_18px_36px_rgba(0,0,0,0.08)]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input 
                    type="text"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    placeholder='Enter task'
                    className='w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400/40'
                    />
                    <button type='submit' className='inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl cursor-pointer bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-950 sm:w-auto'>
                        <FiPlus className="text-base" aria-hidden="true" />
                        Add
                    </button>
            </form>
            <div className="mt-6">
                <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-stone-500">
                    <span>Tasks</span>
                    <span>{students.length} total</span>
                </div>
                <StudentList key={students.id} students={students} setStudent={setStudent}/>
            </div>
        </div>
    )
}

export default StudentForm