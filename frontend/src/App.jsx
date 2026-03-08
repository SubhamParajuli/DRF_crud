import { useEffect, useState } from 'react'
import StudentForm from './components/StudentForm'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'
const TASKS_URL = `${API_BASE}/tasks/`

function App() {
  const [student, setStudent] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(TASKS_URL)
      if (!response.ok) {
        throw new Error('Unable to fetch tasks.')
      }

      const tasks = await response.json()
      setStudent(Array.isArray(tasks) ? tasks : [])
    } catch (error) {
      toast.error(error.message || 'Unable to fetch tasks.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const createTask = async (name) => {
    const response = await fetch(TASKS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, completed: false }),
    })

    if (!response.ok) {
      throw new Error('Unable to create task.')
    }

    const newTask = await response.json()
    setStudent((prev) => [newTask, ...prev])
  }

  const updateTask = async (id, payload) => {
    const response = await fetch(`${TASKS_URL}${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Unable to update task.')
    }

    const updatedTask = await response.json()
    setStudent((prev) => prev.map((item) => (item.id === id ? updatedTask : item)))
  }

  const deleteTask = async (id) => {
    const response = await fetch(`${TASKS_URL}${id}/`, {
      method: 'DELETE',
    })

    if (!response.ok && response.status !== 204) {
      throw new Error('Unable to delete task.')
    }

    setStudent((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-12 text-stone-900">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Todo List</h1>
          <p className="mt-2 text-sm text-stone-600">Edit, update, and keep things tidy.</p>
        </header>
        <StudentForm
          students={student}
          createTask={createTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          isLoading={isLoading}
        />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  )
}

export default App
