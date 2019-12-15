import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';
import { toDoStepPagination } from '../../reducers/listUsers'

function ListUsersPagination({ data, pagesNumber, toDoStepPagination, ...props}){
  if(!data[1]) return null;
  let paginationArray = [];
  function clickButton(event){
    let value = {
      value: +event.target.value,
      cache: false
    };
    if(data[+event.target.value]){
      value.cache = true;
    }
    toDoStepPagination(value);
  }

  for(let i = 1; i <= data[1].total_pages; i++){
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