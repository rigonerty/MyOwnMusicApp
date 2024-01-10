import React from 'react'
import { Favorites } from '../../../../modules/Favorite'
import { H2 } from '../../../../ui/H2/H2'

export const Favorite = () => {
  return (
    <div>
      <H2 text='Favorite'/>
      <Favorites/>
    </div>
  )
}
