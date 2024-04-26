import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [ShowFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString=JSON.parse(localStorage.getItem("todos"))
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const savetoLS=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }


  const toggleFinished=(params) => {
    setShowFinished(!ShowFinished)
  }
  

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    savetoLS()
    
  }
  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    savetoLS()



  }
  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    console.log(todos)
    savetoLS()
  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id; 
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted
    setTodos(newTodos)
    savetoLS()

  }

  
  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container bg-violet-100 md:mx-auto my-5 p-5 rounded-xl min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl'>TaskMaster : Personal checklist</h1>
        <div className="addTodo my-4 flex flex-col gap-4">
          <h2 className='text-md font-bold'>Add a Task</h2>
          <div className="flex">

          <input onChange={handleChange} value={todo} className='w-full rounded-full px-5 py-2' type="text"/>
          <button onClick={handleAdd} disabled={todo.length<3} className='w-1/5 bg-violet-700 ml-4 hover:bg-violet-950 disabled:bg-violet-700 p-2 py-1 text-md font-bold rounded-2xl text-white'>Save</button>
          </div>
        </div>
        <input className='my-4 gap-2' onChange={toggleFinished} type="checkbox" checked={ShowFinished} name="" id="" /><span className='mx-5'>Show Finished</span>
        <div className="h-[1px] my-3 w-[90%] opacity-15 mx-auto bg-black"></div>

        <h2 className='text-md font-bold'>Your Task</h2>
      <div className="todos">
        {todos.length===0 && <div className='m-5'>No Todos to display</div>}
        {todos.map(item=>{

        
        return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo flex  justify-between my-3">
          <div className='flex gap-5'>

          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id="" />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm font-bold rounded-md text-white mx-1'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm font-bold rounded-md text-white mx-1'><MdDelete /></button>
          </div>
      </div>
      })}
          
        </div>
      </div>
    </>
  )
}

export default App
