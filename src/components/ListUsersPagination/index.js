import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';
import { toDoStepPagination } from '../../reducers/listUsers'

function ListUsersPagination({ data, pagesNumber, toDoStepPagination, ...props}){
  let paginationArray = [];
  
  function clickButton(event){
    if(+event.target.value === pagesNumber) return;
    toDoStepPagination(+event.target.value);
  }

  for(let i = 1; i <= data.total_pages; i++){
    paginationArray.push((
      <input 
        type='button' 
        value={i} 
        className='list-users-pagination-button' 
        key={i} 
        style={(pagesNumber === i) ? {color: 'black'} : null}
        onClick={clickButton}
      />
    ))
  }

  return (
    <form className='list-users-pagination'>
      {paginationArray}
    </form>
  )
}

function stateToProps(state, props){
  return {
    data: state.listUsers.data,
    pagesNumber: state.listUsers.pagesNumber
  }
}

function dispatchToProps(dispatch, props){
  return {
    toDoStepPagination: (value) => ( dispatch( toDoStepPagination(value) ) )
  }
}

ListUsersPagination.propTypes = {
  toDoStepPagination: PropTypes.func.isRequired,
  pagesNumber: PropTypes.number.isRequired, 
  data: PropTypes.object.isRequired
}


export default connect(stateToProps, dispatchToProps)(ListUsersPagination);