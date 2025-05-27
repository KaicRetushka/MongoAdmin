import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function App() {
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData(){
      let response = await fetch("http://localhost:8001/authorization", {
          method: "GET", 
          credentials: "include"
      });
      if (!response.ok){
        navigate("/reg")
      }

    }
    fetchData()
  }, [])

  return (
    <>
    	<h1>Hello</h1>
    </>
  )
}
