import React, { useEffect, useRef, useState } from 'react'
import { Option } from '../Option/Option';
import { SelectHeader } from './SelectHeader';
import cl from "./Select.module.scss"
interface props{
  isValue: OptionProps;
  options: OptionProps[];
  setValue:(smth:OptionProps)=>void
}
interface OptionProps {
  title:string;
  value:string;
}
export const Select = ({isValue, setValue,options}:props) => {
  const [isVisible, setVisible] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setVisible(false);
      }
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isVisible]);

  const OptionOnClick = (value:OptionProps)=>{
    setVisible(false)
    setValue(value)
  }
  return (
    <div ref={rootRef} data-is-active={isVisible} className={cl.Select}>
      <SelectHeader isValue={isValue} setVisible={setVisible} isVisible={isVisible}/>
      {isVisible &&
        <ul>
          {options.map(a=>{
            return <Option option={a} onClick={OptionOnClick} key={a.title}/>
          })}
        </ul>
      }
    </div>
  )
}
