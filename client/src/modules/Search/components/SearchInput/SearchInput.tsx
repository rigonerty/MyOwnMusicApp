import React, { useState } from 'react'
import { Input } from '../../../../ui/Input/Input'
import cl from "./SearchInput.module.scss"
export const SearchInput = () => {
    const [isValue, setValue] = useState("")
  return (
    <div className={cl.SearchInput}>
        <img src={require("../../../../../public/img/211817_search_strong_icon.svg")}/>
        <Input name='' placeholder='Search...' isValue={isValue} setValue={setValue} style={{background:"transparent"}}/>
    </div>
  )
}
