import { Link } from "react-router-dom"
import { InputTextAuth } from "./InputTextAuth.jsx"
import { InputPWDAuth } from "./InputPWDAuth"
import { useRef, useState } from "react"
import { Toast } from "./Toast.jsx"

export function Reg(){
    const loginRef = useRef()
    const pwdRef = useRef()
    const noticeRef = useRef()

    const [notices, setNotices] = useState([])

    async function funReg(){
        let response = await fetch("http://127.0.0.1:8000/reg", {
            method: "POST",
            body: JSON.stringify({
                login: loginRef.current.value,
                password: pwdRef.current.value
            }),
            headers: {"content-type": "application/json"}
        })
        console.log(notices)
        if (!loginRef.current.value){
            setNotices([...notices, "Введите логин"])
        }
        else if (!pwdRef.current.value){
            setNotices([...notices, "Введите пароль"])
        }
    }

    return (
        <div className="bg-[#001e2b] h-screen flex items-center justify-center">
            <div className="bg-[#02694c] flex flex-col p-7 rounded-3xl gap-12">
                <h1 className="font-bold text-5xl text-[#84d540]">Регистрация</h1>
                <InputTextAuth input_ref={loginRef} placeholder="Введите логин"/>
                <InputPWDAuth input_ref={pwdRef} placeholder="Введите пароль"/>
                <InputPWDAuth id="inputPWD2" placeholder="Повторите пароль"/>
                <div className="flex flex-col items-center">
                    <button className="bg-[#84d540] text-3xl text-white font-bold rounded-2xl py-3 hover:bg-[#6bb030] cursor-pointer w-full" onClick={funReg}>Зарегистрироваться</button>
                    <Link to="/vhod" className="text-2xl text-white font-bold mt-4">Войти</Link>
                </div>
            </div>
            <div ref={noticeRef} className="absolute right-0 top-0 p-5 flex flex-col-reverse gap-3 overflow-y-auto max-h-screen [scrollbar-width:none]">
                {notices.map((item, index) => <Toast key={index} text={item}/>)}
            </div>
        </div>
    )
}