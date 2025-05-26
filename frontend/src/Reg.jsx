import { Link, useNavigate } from "react-router-dom"
import { InputTextAuth } from "./InputTextAuth.jsx"
import { InputPWDAuth } from "./InputPWDAuth"
import { useRef, useState } from "react"
import { Toast } from "./Toast.jsx"
import { useEffect } from "react"

export function Reg(){
    const loginRef = useRef()
    const pwdRef = useRef()
    const pwdRef2 = useRef()
    const [notice, setNotice] = useState()
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate()

    async function funReg(){
        if (!loginRef.current.value || !pwdRef.current.value || pwdRef.current.value != pwdRef2.current.value){
            if (!loginRef.current.value){
                setNotice("Введите логин")
            }
            else if (!pwdRef.current.value){
                setNotice("Введите пароль")
            }
            else if (pwdRef.current.value != pwdRef2.current.value){
                setNotice("Пароли не совпадают")
            }
        }
        else {
            let response = await fetch("http://127.0.0.1:8000/reg", {
                method: "POST",
                body: JSON.stringify({
                    login: loginRef.current.value,
                    password: pwdRef.current.value
                }),
                headers: {"content-type": "application/json"}
            })
            if (response.ok){
                navigate("/")
            }
            else {
                response = await response.json()
                setNotice(response.detail)
            }
        }
    }

    return (
        <div className="bg-[#001e2b] h-screen flex items-center justify-center">
            <div className="bg-[#02694c] flex flex-col p-7 rounded-3xl gap-12">
                <h1 className="font-bold text-5xl text-[#84d540]">Регистрация</h1>
                <InputTextAuth input_ref={loginRef} placeholder="Введите логин"/>
                <InputPWDAuth input_ref={pwdRef} placeholder="Введите пароль"/>
                <InputPWDAuth input_ref={pwdRef2} placeholder="Повторите пароль"/>
                <div className="flex flex-col items-center">
                    <button className="bg-[#84d540] text-3xl text-white font-bold rounded-2xl py-3 hover:bg-[#6bb030] cursor-pointer w-full" onClick={funReg}>Зарегистрироваться</button>
                    <Link to="/vhod" className="text-2xl text-white font-bold mt-4">Войти</Link>
                </div>
            </div>
            <Toast text={notice} setNotice={setNotice} isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    )
}