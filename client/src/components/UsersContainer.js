import React from 'react'
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import User from './User'
import Wrapper from '../assets/wrappers/UsersContainer'


function UsersContainer() {
  const { getUsers, users, isLoading, totalUsers,user } = useAppContext()
  useEffect(() => {
    getUsers()
  }, [])
  if (isLoading) {
    return <Loading center />
  }
  if (users.length === 0) {
    return (
      <Wrapper>
        <h2>No users to display...</h2>
      </Wrapper>
    )
  }
  return (
    
    <Wrapper>
      <h5>
        {totalUsers} user{users.length > 1 && 's'} found
      </h5>
      <div className='users'>
        {users.map((userf) => {
          return <User key={userf._id} {...userf} />
        })}
      </div>
    </Wrapper>
  )
}

export default UsersContainer