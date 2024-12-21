import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [cookies, setCookie] = useCookies(['todo']);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(cookies.todo || []);
  }, [cookies.todo]);

  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    // get todos from cookies
    const todos = cookies.todo || [];
    // add new todo
    todos.push({ task: data.task, done: false });
    // save todos to cookies
    setCookie('todo', todos);
    // reset form
    reset();
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <ToastContainer />
      <div className="w-96 border rounded shadow p-6">
        <h1 className='text-3xl mb-5'>
          Todo App
        </h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <input type="text" className='w-full border border-blue-600 rounded rounded-e-none p-2 focus:outline-none' placeholder="Write your task" {...register('task', {
              required: 'Task is required',
              minLength: { value: 3, message: 'Task must have at least 3 characters' }
            })} />
            <button className='w-1/3 border border-blue-600 bg-blue-600 border-l-0 text-white rounded rounded-s-none p-2 text-sm'>
              Add Todo
            </button>
          </div>
          {errors.task && <p className='text-red-500 text-xs mt-1'>{errors.task.message}</p>}
        </form>
        <ul className='mt-5'>
          {tasks.map((task, index) => (
            <li key={index} className='flex justify-between items-center border-b py-2'>
              <span className={task.done ? 'line-through' : ''}>{task.task}</span>
              <div className="flex space-x-2">
                <input type="checkbox" checked={task.done} onChange={(e) => {
                  const todos = cookies.todo;
                  todos[index].done = e.target.checked;
                  setCookie('todo', todos);
                }} />
                {/* delete button */}
                <button className='text-red-500' onClick={() => {
                  const todos = cookies.todo;
                  todos.splice(index, 1);
                  setCookie('todo', todos);
                  toast.error('Task deleted successfully');
                }}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
