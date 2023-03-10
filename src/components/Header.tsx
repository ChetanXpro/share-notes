import { Avatar } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


const Header = () => {
  const {user} = useAuth()
  console.log(user)
  return (
    <div className='flex bg-[#05386b] text-white items-center gap-4 p-4 justify-between h-12 w-[100vw]'>
      <Link to={'/'}>Home</Link>
      <Link to={'/setting'}>Setting</Link>
     
<div>
<Avatar name={`${user?.UserInfo?.username}`} size={'sm'} />
</div>
    </div>
  )
}

export default Header