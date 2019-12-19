import React, { useState } from 'react';
import './index.css';
import ListUsers from '../ListUsers';
import ListUsersPagination from '../ListUsersPagination';
import Button from '../Button';
import ListUsersPopupWindowAddUser from '../ListUsersPopupWindowAddUser';

const ListUsersContainer = () => {
  let [popupWindowAddUser, setPopupWindowAddUser] = useState(false);

  return (
    <div className="list-users-container">
      <ListUsers />
      <ListUsersPagination />
      {popupWindowAddUser ? <ListUsersPopupWindowAddUser setPopupWindowAddUser={setPopupWindowAddUser} /> : null}
      <form className='list-users-container-form'>
        <Button width='100%' value='Добавить пользователя' click={() => (setPopupWindowAddUser(true))}/>
      </form>
    </div>
  )
}

export default ListUsersContainer;


