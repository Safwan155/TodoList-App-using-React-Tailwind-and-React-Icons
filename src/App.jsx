import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import './index.css'
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem('todos')
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)

    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem('todos', JSON.stringify(todos))

  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo('')
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    console.log('id is ', id)
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    console.log('newTodos is ', newTodos)
    saveToLS()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && todo.length > 2) {
      handleAdd()
    }
  }


  return (
    <>
      <Navbar />
      <div className="md:container min-h-[80vh] p-2 mx-3 md:mx-auto my-4 rounded-xl bg-violet-200 md:w-1/2">
        <h1 className='text-2xl font-bold text-center'>MyTask -Manage your Todos</h1>
        <div className="flex flex-col gap-3 my-3 addTodo">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex ">
          <input onKeyDown={handleKeyDown} onChange={handleChange} value={todo} type='text' className='w-full px-4 py-1 rounded-full' />
          <button onClick={handleAdd} disabled={todo.length < 3} className='p-2 py-0.5 text-white mx-2 rounded-md disabled:bg-violet-500 bg-violet-800 hover:bg-violet-900 text-sm font-bold'>Save</button>
          </div>
        </div>
        <input id='show' className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='bg-black h-[1px] my-1 w-[90%] opacity-50 mx-auto'></div>
        <h2 className="font-bold text-md">Your Todos</h2>
        <div className=" todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {


            return (showFinished || !item.isCompleted) && <div key={item.id} className="flex justify-between my-3 md:w-1/2 todo ">
              <div className="flex gap-2">
                <input name={item.id} onChange={handleCheckbox} type='checkbox' checked={item.isCompleted} id='' />
                {/* <div className={`w-1/4 min-w-0 break-words ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div> */}
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>

              <div className="flex h-full buttons">
                <button title='edit' onClick={(e) => handleEdit(e, item.id)} className='p-2 py-0.5 text-white rounded-md bg-violet-800 hover:bg-violet-900 mx-1 text-sm font-bold'><CiEdit /></button>
                <button title="Delete" onClick={(e) => handleDelete(e, item.id)} className='p-2 py-0.5 text-white rounded-md bg-violet-800 hover:bg-violet-900 mx-1 text-sm font-bold'><MdDelete />
                </button>
                
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
