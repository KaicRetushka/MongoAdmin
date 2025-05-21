export function InputTextAuth({input_ref, placeholder}){
    return(
        <input className="w-150 outline-0 text-3xl border-b-4 border-[#84d540] focus:border-[#6bb030] text-white px-2 py-1" type="text" placeholder={placeholder} ref={input_ref}/>
    )
}