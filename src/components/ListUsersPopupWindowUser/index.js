import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import Button from '../Button';

function ListUsersPopupWindowUser({ index, data, pagesNumber, setPopupWindowUser, ...props}){
  const userData = data[pagesNumber].data[index];
  return (
    <div className='list-users-popup-window-user' onClick={() => (setPopupWindowUser(false))}>
      <div className='list-users-popup-window-user-div-data' onClick={(event) => (event.stopPropagation())}>
        <img src='images/close.png' 
          alt='close' 
          className='list-users-popup-window-user-img-close' 
          onClick={() => (setPopupWindowUser(false))} 
        />
        <div className='list-users-popup-window-user-div-data-image' style={{backgroundImage: `url(${userData.avatar})`}} />
        <div className='list-users-popup-window-user-div-data-content'>
          <ul className='list-users-popup-window-user-ul-data'>
            <li className='list-users-popup-window-user-li-data'>
              <span className='list-users-popup-window-user-span-item'>
                Имя: 
              </span>
              <span className='list-users-popup-window-user-span-value'>
                {' '+userData.first_name}
              </span>
            </li>
            <li className='list-users-popup-window-user-li-data'>
              <span className='list-users-popup-window-user-span-item'>
                Фамилия: 
              </span>
              <span className='list-users-popup-window-user-span-value'>
                {' '+userData.last_name}
              </span>
            </li>
            <li className='list-users-popup-window-user-li-data'>
              <span className='list-users-popup-window-user-span-item'>
                Почта: 
              </span>
              <span className='list-users-popup-window-user-span-value'>
                {' '+userData.email}
              </span>
            </li>
          </ul>
          <form className='list-users-popup-window-user-form'>
            <Button value='Редактировать' width='150px' />
          </form>
        </div>
      </div>
    </div>
  )
}

const stateToProps = (state, props) => {
  return {
    data: state.listUsers.data,
    pagesNumber: state.listUsers.pagesNumber,
    ...props
  }
}

ListUsersPopupWindowUser.propTypes = {
  index: PropTypes.number.isRequired,
  pagesNumber: PropTypes.number.isRequired, 
  data: PropTypes.object.isRequired,
  setPopupWindowUser: PropTypes.func.isRequired
}

export default connect(stateToProps)(ListUsersPopupWindowUser);