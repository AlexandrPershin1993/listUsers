import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';
import { requestListUsers } from '../../reducers/listUsers';
import ListUsersItem from '../ListUsersItem';

function ListUsers({statusData, pagesNumber, errorDataMessage, requestListUsers, data, ...props}){
  const requestListUsersEffect = () => {
    if(data[pagesNumber]) return;
    requestListUsers(pagesNumber);
  }
  
  useEffect(requestListUsersEffect, [ pagesNumber ]);
  let itemUsers;

  if(statusData === 'succes'){
    itemUsers = data[pagesNumber].data.map((item, index) => {
      return (
        <li className='list-users-li' key = {item.id}>
          <ListUsersItem first_name={item.first_name} avatar={item.avatar} index={index}/>
        </li>
      );
    })
  }

  return (
    <ul 
      className='list-users' 
      style={(statusData === 'loading' || statusData === 'error') ? {justifyContent: 'center', alignContent: 'center'} : null}
    >
      {(statusData === 'loading') ? (
        <li className='list-users-li'>
          <img src="images/loading.gif" alt='loading' className='list-users-img-loading'/>
        </li>
      ) : null}
      {(statusData === 'error') ? (
        <li className='list-users-li list-users-li-error'>
          {errorDataMessage}
        </li>
      ):null}
      {itemUsers}
    </ul>
  );
};

const stateToProps = (state, props) => {
  return {
    statusData: state.listUsers.statusData,
    pagesNumber: state.listUsers.pagesNumber,
    data: state.listUsers.data,
    errorDataMessage: state.listUsers.errorDataMessage
  }
}

const dispatchToProps = (dispatch, props) => {
  return {
    requestListUsers: (value) => ( dispatch( requestListUsers(value) ) )
  }
}

ListUsers.propTypes = {
  statusData: PropTypes.string.isRequired,
  pagesNumber: PropTypes.number.isRequired, 
  errorDataMessage: PropTypes.string.isRequired, 
  requestListUsers: PropTypes.func.isRequired, 
  data: PropTypes.object.isRequired
}

export default connect(stateToProps, dispatchToProps)(ListUsers);