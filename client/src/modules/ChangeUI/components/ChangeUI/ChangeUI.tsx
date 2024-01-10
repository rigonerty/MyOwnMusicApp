import React, { useState } from 'react'
import { Select } from '../../../../ui/Select/Select'
import cl from "./ChangeUI.module.scss"
export const ChangeUI = () => {
  const [isLanguageValue, setLanguageValue] = useState({title:"English", value:"eng"})
  const [isThemeValue, setThemeValue] = useState({title:"Light", value:"light"})
  return (
    <div className={cl.ChangeUI}>

      <div>
        <p>Language: </p>
        <Select options={[{title:"English", value:"eng"},{title:"Russian", value:"rus"}]} isValue={isLanguageValue} setValue={setLanguageValue}/>
      </div>
      <div>
        <p>Theme: </p>
        <Select options={[{title:"Dark", value:"dark"},{title:"Light", value:"light"}]} isValue={isThemeValue} setValue={setThemeValue}/>       
      </div>
    </div>
  )
}
