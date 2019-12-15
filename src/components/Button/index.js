import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function Button({width = '70px', height = '40px', value = 'Отправить', click, ...props}){
  return (
    <input 
      type='button' 
      style={{width, height}} 
      value={value} 
      className='button-input'
      onClick={click ? click : null}
    />
  )
}

Button.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  value: PropTypes.string,
  click: PropTypes.func
}