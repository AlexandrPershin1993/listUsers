import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';

function ListUsersItem({ index, data, pagesNumber, ...props}){
  return (
    <figure className='list-users-item-figure'>
      <img src={data[pagesNumber].data[index].avatar} alt='user' className='list-users-item-img-avatar'/>
      <figcaption className='list-users-item-figcaption'>
        {data[pagesNumber].data[index].first_name}
      </figcaption>
    </figure>
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