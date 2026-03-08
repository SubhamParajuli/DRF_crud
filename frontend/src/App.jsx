import { useState , useEffect} from 'react'
import StudentForm from './components/StudentForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function App() {
  const [student,setStudent]=useState(()=>{
    const saved= localStorage.getItem('student');
    return saved? JSON.parse(saved) : [];
  });

  useEffect(()=>{
    localStorage.setItem("student",JSON.stringify(student))
  },[student])
  return (
    <div className="min-h-screen bg-stone-50 px-4 py-12 text-stone-900">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Todo List</h1>
          <p className="mt-2 text-sm text-stone-600">Edit, update, and keep things tidy.</p>
        </header>
        <StudentForm students={student} setStudent={setStudent}/>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  )
}

export default App
