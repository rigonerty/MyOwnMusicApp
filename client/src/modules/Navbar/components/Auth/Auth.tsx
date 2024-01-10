import React from 'react'
import { LinkNav } from '../../../../components/LinkNav/LinkNav'

export const Auth = () => {
  return (
    <div>
      <LinkNav to='/user' url={require("../../../../../public/img/290120_account_avatar_man_profile_user_icon.svg")} text='To profile' left/>
    </div>
  )
}
