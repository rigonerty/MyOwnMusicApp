import React from 'react'
import cl from "./Search.module.scss"
import { SearchInput } from '../SearchInput/SearchInput'
export const Search = () => {
  return (
    <div className={cl.Search}>
        <SearchInput/>
        {/* <div>

        </div> */}
    </div>
  )
}
