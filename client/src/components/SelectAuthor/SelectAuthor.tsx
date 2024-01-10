import React, { useState } from 'react'
import { Select } from '../../ui/Select/Select';
import cl from "./SelectAuthor.module.scss"
import { Modal } from '../../ui/Modal/Modal';
import { Input } from '../../ui/Input/Input';
interface props{
    isSelectValue: {title:string; value:string};
    setSelectValue: (smth:{title:string; value:string})=>void;
    authors: {title:string; value:string}[];
    createAuthor: (authorName:string)=>void;
}


export const SelectAuthor = ({isSelectValue,setSelectValue,authors, createAuthor}:props) => {
  const [isModalVisible, setModalVisible] = useState<null|true>(null)
  const [isInputValue, setInputValue] = useState("")
  return (
    <div className={cl.SelectAuthor}>
        <Select isValue={isSelectValue} setValue={setSelectValue} options={authors}/>
        <button onClick={()=>setModalVisible(true)}>+</button>
        <Modal visible={isModalVisible} setVisible={setModalVisible}>
          <div className={cl.SelectAuthorModal}>
            <Input name='Author name' placeholder='Author name' isValue={isInputValue} setValue={setInputValue}/>
            <button onClick={()=>{
              createAuthor(isInputValue)
              setModalVisible(null)
            }}>Create</button>
          </div>
        </Modal>
    </div>
  )
}
