'use client'
import { Dispatch, SetStateAction } from "react"

interface Form{
    label: string,
    placeholder: string,
    value: string
    setValue: Dispatch<SetStateAction<string>>
}

const InputForm = ({label, placeholder, value, setValue}: Form) => {
  return (
    <div className="text-DarkGrey flex flex-col">
        <label className="text-[12px] font-[400] leading-[18px]">{label}</label>
        <input className="py-3 px-4 border-2 border-veryLightGray font-[400] rounded-[8px] text-[16px] outline-none focus:border-Purple focus:shadow-Shadow focus:shadow-2xl" placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}/>
    </div>
  )
}

export default InputForm