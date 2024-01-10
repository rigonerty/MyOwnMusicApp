import React, { useEffect, useRef } from 'react'
interface props{
    option: {title:string; value: string};
    onClick: (smth: {title:string; value: string})=>void
}
export const Option = ({option, onClick}:props) => {
  const optionRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const optionEl = optionRef.current;
    if (!optionEl) return;

    const handleEnterPress = (event: KeyboardEvent) => { 
      if ((document.activeElement === optionEl) && event.key === 'Enter') {
        onClick(option);
      }
    }

    optionEl.addEventListener('keydown', handleEnterPress);

    return () => {
      optionEl.removeEventListener('keydown', handleEnterPress);
    };
  }, [option, onClick]);
  return (
    <li onClick={()=> onClick(option)} tabIndex={0}>
        {option.title}
    </li>
  )
}
