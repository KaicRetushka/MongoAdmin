import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { InputText } from "./InputText.jsx"
import { useRef, useState } from "react"

export function App() {
  const navigate = useNavigate()
  const urlRef = useRef()
  const grayURl = useRef()
  const [servers, setServers] = useState([]) 

  function openGrayURL(){
    grayURl.current.classList.remove("hidden")
  }

  function closeGrayURL(){
    grayURl.current.classList.add("hidden")
  }

  useEffect(() => {
    async function fetchData(){
      let response = await fetch("http://localhost:8001/authorization", {
          method: "GET", 
          credentials: "include"
      })
      if (!response.ok){
        navigate("/reg")
      }
      else {
        response = await fetch("http://localhost:8001/servers", {
          method: "GET", 
          credentials: "include"
        })
        response = await response.json()
        console.log(response)
        setServers(response)
        // console.log(servers)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="h-screen flex">
      <div className="h-screen w-100 border-r-4 border-[#02694c]">
        <div className="bg-[#02694c] p-3 flex justify-between items-center">
            <h1 className="font-bold text-3xl text-[#84d540]">Соединения</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9 text-[#84d540] cursor-pointer" onClick={openGrayURL}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>
        {
          servers.map(item => <p key={item.id} className="text-lg cursor-pointer mx-3 p-3 rounded-2xl" onClick={
            async () => {
              let response = await fetch(`http://localhost:8001/dbs/?url=${item.url}`, {
                method: "GET",
                credentials: "include"
              })
              let isOk = response.ok
              response = await response.json()
              if (isOk){
                console.log(response)
              }
              else {
                alert(response.detail)
              }
            }
          }>{item.url}</p>)
        }
      </div>
      <div className="flex-1 relative flex items-center justify-center">
      </div>
      <div className="bg-gray-100/50 w-full absolute flex justify-center items-center h-screen hidden" ref={grayURl} onClick={(e) => {
        if (e.target === e.currentTarget) {
            closeGrayURL();
        }
      }}>
        <div className="bg-[#02694c] flex flex-col p-7 rounded-3xl gap-5 w-fit">
            <h1 className="font-bold text-4xl text-[#84d540]">Новое соединение</h1>
            <InputText input_ref={urlRef } placeholder={"Введите url"}/>
            <div className="w-full flex justify-end">
              <button className="bg-white text-xl text-[#84d540] font-bold p-3 rounded-2xl cursor-pointer w-32 mr-3" onClick={closeGrayURL}>Отмена</button>
              <button className="bg-[#84d540] text-xl text-white font-bold p-3 rounded-2xl cursor-pointer w-32">Добавить</button>
            </div>
        </div>
      </div>
    </div>
  )
}
