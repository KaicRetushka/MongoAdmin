import { Link } from "react-router-dom"
import { InputTextAuth } from "./InputTextAuth.jsx"
import { InputPWDAuth } from "./InputPWDAuth"

export function Vhod(){
    return(
        <div className="bg-[#001e2b] h-screen flex items-center justify-center">
            <div className="bg-[#02694c] flex flex-col p-7 rounded-3xl gap-12">
                <h1 className="font-bold text-5xl text-[#84d540]">Вход</h1>
                <InputTextAuth id="inputLogin" placeholder="Введите логин"/>
                <InputPWDAuth id="inputPWD" placeholder="Введите пароль"/>
                <div className="flex flex-col items-center">
                    <button className="bg-[#84d540] text-3xl text-white font-bold rounded-2xl py-3 hover:bg-[#6bb030] cursor-pointer w-full">Войти</button>
                    <Link to="/reg" className="text-2xl text-white font-bold mt-4">Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    )
}