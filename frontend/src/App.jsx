import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function App() {
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData(){
// Сначала установите cookie
    // await fetch("http://127.0.0.1:8000/token", {
    //     method: "GET", 
    //     credentials: "include"
    // });
    
    // Затем получите их
    let response = await fetch("http://127.0.0.1:8000/authorization", {
        method: "GET", 
        credentials: "include"
    });
    response = await response.json();
    console.log(response);
    }
    fetchData()
  }, [])

  return (
    <>
    	<h1>Hello</h1>
    </>
  )
}
