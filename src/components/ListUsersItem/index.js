import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';
import ListUsersPopupWindowUser from '../ListUsersPopupWindowUser';

function ListUsersItem({ index, data, pagesNumber, ...props}){
  let [popupWindowUser, setPopupWindowUser] = useState(false);
  return (
    <div>
      {(popupWindowUser) ? <ListUsersPopupWindowUser index={index} setPopupWindowUser={setPopupWindowUser} /> : null}
      <figure className='list-users-item-figure' onClick={() => (setPopupWindowUser(true))} >
        <img 
          src={data.data[index].avatar} 
          alt='user' className='list-users-item-img-avatar'
        />
        <figcaption className='list-users-item-figcaption'>
          {data.data[index].first_name}
        </figcaption>
      </figure>
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

ListUsersItem.propTypes = {
    index: PropTypes.number.isRequired,
    pagesNumber: PropTypes.number.isRequired, 
    data: PropTypes.object.isRequired
  }
  

export default connect(stateToProps)(ListUsersItem);