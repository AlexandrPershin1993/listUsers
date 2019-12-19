import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';
import { requestDeleteUser, deleteUserTimerEnd } from '../../reducers/listUsers';
import Button from '../Button';

function ListUsersPopupWindowDeleteUser({data, setPopupWindowDeleteUser, statusDelete, errorDeleteMessage, deleteUserTimerEnd, index, requestDeleteUser, ...props}){

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
            <Button type='button' value='Да' width='70px' click={() => (requestDeleteUser({id, index}))}/>
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
    deleteUserTimerEnd: () => (dispatch( deleteUserTimerEnd() )),
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
  deleteUserTimerEnd: PropTypes.func.isRequired
}

export default connect(stateToProps, dispatchToProps)(ListUsersPopupWindowDeleteUser);