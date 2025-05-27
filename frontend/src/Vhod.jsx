import { Link, useNavigate } from "react-router-dom"
import { InputTextAuth } from "./InputTextAuth.jsx"
import { InputPWDAuth } from "./InputPWDAuth"
import { useState, useEffect, useRef } from "react"
import { Toast } from "./Toast.jsx"

export function Vhod(){
    const navigate = useNavigate()
    const [notice, setNotice] = useState()
    const [isVisible, setIsVisible] = useState(false)

    const loginRef = useRef()
    const pwdRef = useRef()

    useEffect(() => {
        async function fetchData() {
            let response = await fetch("http://localhost:8001/token", {method: "GET", headers: {"content-type": "application/json"}, credentials: "include"})
            response = await response.json()
            console.log(response.detail)
        }
        fetchData()
    }, [])

    async function funVhod(){
        if (!loginRef.current.value || !pwdRef.current.value){
            if (!loginRef.current.value){
                console.log(loginRef.current.value)
                setNotice("Введите логин")
            }
            else if (!pwdRef.current.value){
                setNotice("Введите пароль")
            }
        }
        else {
            let response = await fetch("http://localhost:8001/vhod", {
                method: "POST",
                body: JSON.stringify({
                    login: loginRef.current.value,
                    password: pwdRef.current.value
                }),
                headers: {"content-type": "application/json"}, 
                credentials: "include"
            })
            if (response.ok){
                navigate("/")
            }
            else{
                response = await response.json()
                setNotice(response.detail)
            }
        }
    }

    return(
        <div className="bg-[#001e2b] h-screen flex items-center justify-center">
            <div className="bg-[#02694c] flex flex-col p-7 rounded-3xl gap-12">
                <h1 className="font-bold text-5xl text-[#84d540]">Вход</h1>
                <InputTextAuth input_ref={loginRef} placeholder="Введите логин"/>
                <InputPWDAuth input_ref={pwdRef} placeholder="Введите пароль"/>
                <div className="flex flex-col items-center">
                    <button className="bg-[#84d540] text-3xl text-white font-bold rounded-2xl py-3 hover:bg-[#6bb030] cursor-pointer w-full" onClick={funVhod}>Войти</button>
                    <Link to="/reg" className="text-2xl text-white font-bold mt-4">Зарегистрироваться</Link>
                </div>
            </div>
            <Toast text={notice} setNotice={setNotice} isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    )
}