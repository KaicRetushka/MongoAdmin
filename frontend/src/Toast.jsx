import { useEffect, useState } from "react"

export function Toast({text}){
    const [isVisible, setIsVisible] = useState(true)

    function clickX(){
        setIsVisible(false)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 5000);
        return () => clearTimeout(timer)
    }, [])

    if (!isVisible){
        return null
    }

    return(
        <div className="border-2 border-[#84d540] p-3 bg-[#001e2b] rounded-xl flex w-100 items-center justify-between">
            <p className="text-2xl text-[#84d540]">{text}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#84d540" className="size-6 cursor-pointer" onClick={clickX}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
    )
}