import React from 'react';
import './index.css';
import ListUsers from '../ListUsers';
import ListUsersPagination from '../ListUsersPagination';
import Button from '../Button';

const ListUsersContainer = () => {
  return (
    <div className="list-users-container">
      <ListUsers />
      <ListUsersPagination />
      <form className='list-users-container-form'>
        <Button width='100%' height='50px' value='Добавить пользователя'/>
      </form>
    </div>
  )
}

export default ListUsersContainer;


