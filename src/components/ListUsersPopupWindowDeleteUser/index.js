import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';
import { requestDeleteUser } from '../../reducers/listUsers';
import Button from '../Button';
import { deleteStatusReset } from '../../reducers/listUsers';

function ListUsersPopupWindowDeleteUser({data, setPopupWindowDeleteUser, setPopupWindowUser, statusDelete, errorDeleteMessage, deleteStatusReset, index, requestDeleteUser, ...props}){

  if(statusDelete === 'succes'){
    setTimeout(() =>{
      setPopupWindowUser();
      deleteStatusReset();
    }, 2000);
  }

  const id = data.data[index].id;
  return (
    <div className='list-users-popup-window-delete-user'>
      <div className='list-users-popup-window-delete-user-div-data'>
        {!statusDelete ? (
          <h3 className='list-users-popup-window-delete-user-div-h3'>
            Вы уверены что хотите удалить пользователя?
          </h3>
        ) : null}
        {(statusDelete === 'loading') ? <img src='images/loading.gif' alt='loading' className='list-users-popup-window-delete-user-img-loading' /> : null}
        {(statusDelete === 'error') ? (
          <span className='list-users-popup-window-delete-user-span-error'>
            {errorDeleteMessage}
          </span>
         ) : null}
        {(statusDelete === 'succes') ? (
          <span className='list-users-popup-window-delete-user-span-succes'> 
            Пользователь удален! 
          </span>
         ) : null}
        { !statusDelete ? (
          <form className='list-users-popup-window-delete-form'>
            <Button type='button' value='Да' width='70px' click={() => (requestDeleteUser(id))}/>
            <Button type='button' value='Нет' width='70px' click={() => (setPopupWindowDeleteUser(false))} />
          </form>
        ) : null}
      </div>
    </div>
  )
}

const stateToProps = (state, props) => {
  return {
    statusDelete: state.listUsers.statusDelete,
    errorDeleteMessage: state.listUsers.errorDeleteMessage,
    data: state.listUsers.data
  }
}

const dispatchToProps = (dispatch, props) => {
  return {
    requestDeleteUser: (value) => (dispatch( requestDeleteUser(value) )),
    deleteStatusReset: () => (dispatch( deleteStatusReset() )),
    ...props
  }
}

ListUsersPopupWindowDeleteUser.propTypes = {
  statusDelete: PropTypes.string.isRequired,
  errorDeleteMessage: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setPopupWindowDeleteUser: PropTypes.func.isRequired,
  requestDeleteUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  deleteStatusReset: PropTypes.object.isRequired
}

export default connect(stateToProps, dispatchToProps)(ListUsersPopupWindowDeleteUser);