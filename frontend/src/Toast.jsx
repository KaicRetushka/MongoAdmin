import { useEffect, useState } from "react"

export function Toast({text, setNotice, isVisible, setIsVisible}){
    

    function clickX(){
        setIsVisible(false)
        setNotice("")
    }

    useEffect(() => {
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false)
            setNotice("")
        }, 3000);
        return () => clearTimeout(timer)
    }, [text])

    if (!isVisible || !text){
        return null
    }

    return(
        <div className="border-2 border-[#84d540] bg-[#001e2b] rounded-xl flex w-100 items-center justify-between absolute right-5 top-5 p-5">
            <p className="text-2xl text-[#84d540]">{text}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#84d540" className="size-6 cursor-pointer" onClick={clickX}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
    )
}