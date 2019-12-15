import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import Button from '../Button';
import nameValidator from '../../validators/nameValidator';
import surnameValidator from '../../validators/surnameValidator';
import emailValidator from '../../validators/emailValidator';
import { requestRedactionUser } from '../../reducers/listUsers';

function upperCaseOneChar(value){
  return value[0].toUpperCase() + value.substring(1);
}

function ListUsersPopupWindowUser({ index, data, pagesNumber, setPopupWindowUser, requestRedactionUser, statusRedaction, errorRedactionMessage, ...props}){
  let userData = data[pagesNumber].data[index];

  let [redaction, setRedaction] = useState(false);
  let [name, setName] = useState(userData.first_name);
  let [surname, setSurname] = useState(userData.last_name);
  let [email, setEmail] = useState(userData.email);
  let [inputValid, setInputValid] = useState([
    true, 
    true, 
    true
  ]);

  const refInputName = useRef(null);
  const refInputSurname = useRef(null);
  const refInputEmail = useRef(null);

  function clickSendRedactionData(){
    setInputValid([nameValidator(name), surnameValidator(surname), emailValidator(email)]);

    if(!nameValidator(name)){
      refInputName.current.focus();
      return;
    }

    if(!surnameValidator(surname)){
      refInputSurname.current.focus();
      return;
    }

    if(!emailValidator(email)){
      refInputEmail.current.focus();
      return;
    }
    
    let statusRedaction = false;
    let objectData = {};

    if(userData.email !== email){
      objectData.email = email;
      statusRedaction = true;
    }

    if(userData.first_name !== name){
      objectData.first_name = upperCaseOneChar(name);
      statusRedaction = true;
    }

    if(userData.last_name !== surname){
      objectData.last_name = upperCaseOneChar(surname);
      statusRedaction = true;
    }

    let value = {
      id: userData.id, 
      objectData, 
      index
    };

    if(statusRedaction){
      requestRedactionUser(value);
      setRedaction(false);
    }
    
  }

  function inputRedactionName(event){
    const value = event.target.value.replace(/[\d\s]/g,'');
    let arrayInputValid = inputValid;
    arrayInputValid[0] = true;
    setInputValid(arrayInputValid);
    setName(value);
  }

  function inputRedactionSurname(event){
    let arrayInputValid = inputValid;
    arrayInputValid[1] = true;
    setInputValid(arrayInputValid);
    const value = event.target.value.replace(/[\d\s]/g,'');
    setSurname(value);
  }

  function inputRedactionEmail(event){
    let arrayInputValid = inputValid;
    arrayInputValid[2] = true;
    setInputValid(arrayInputValid);
    const value = event.target.value.replace(/[\s]/g,'');
    setEmail(value);
  }

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
              <br />
              {(redaction) ? (
                <input 
                  value={name} 
                  autoFocus 
                  ref={refInputName} 
                  className='list-users-popup-window-user-input'
                  onInput={inputRedactionName}
                  style = {(inputValid[0]) ? null : {color: 'red'}} 
                />
               ) : null}
              {(!redaction) ? (
                <span className='list-users-popup-window-user-span-value'>
                  {userData.first_name}
                </span>
              ) : null}
            </li>
            <li className='list-users-popup-window-user-li-data'>
              <span className='list-users-popup-window-user-span-item'>
                Фамилия: 
              </span>
              <br />
              {(redaction) ? (
                <input 
                  value={surname}
                  ref={refInputSurname} 
                  className='list-users-popup-window-user-input' 
                  onInput={inputRedactionSurname} 
                  style = {(inputValid[1]) ? null : {color: 'red'}} 
                />
              ) : null}
              {(!redaction) ? (
                <span className='list-users-popup-window-user-span-value'>
                  {userData.last_name}
                </span>
              ) : null}
            </li>
            <li className='list-users-popup-window-user-li-data'>
              <span className='list-users-popup-window-user-span-item'>
                Почта: 
              </span>
              <br />
              {(redaction) ? (
                <input 
                  value={email} 
                  ref={refInputEmail} 
                  className='list-users-popup-window-user-input' 
                  onInput={inputRedactionEmail} 
                  style = {(inputValid[2]) ? null : {color: 'red'}} 
                />
              ) : null}
              {(!redaction) ? (
                <span className='list-users-popup-window-user-span-value'>
                  {userData.email}
                </span>
              ) : null}
            </li>
          </ul>
          {(statusRedaction === 'error') ? <span className='list-users-popup-window-user-span-error'>{errorRedactionMessage}</span> : null}
          <form className='list-users-popup-window-user-form'>
            {(redaction) ? <Button value='Отправить' width='150px' click={clickSendRedactionData} /> : null}
            {(redaction) ? <Button value='Отменить' width='150px' click = {() => {
              setRedaction(false);
              setName(userData.first_name);
              setSurname(userData.last_name);
              setEmail(userData.email);
            }} /> : null}
            {(!redaction && statusRedaction !== 'loading') ? <Button value='Редактировать' width='150px' click = {() => {
              setRedaction(true);
              setName(userData.first_name);
              setSurname(userData.last_name);
              setEmail(userData.email);
            }} /> : null}
          </form>
          {(statusRedaction === 'loading') ? <img src='images/loading.gif' alt='loading' className='list-users-popup-window-user-img-loading' /> : null}
        </div>
      </div>
    </div>
  )
}

const stateToProps = (state, props) => {
  return {
    data: state.listUsers.data,
    pagesNumber: state.listUsers.pagesNumber,
    statusRedaction: state.listUsers.statusRedaction,
    errorRedactionMessage: state.listUsers.errorRedactionMessage,
    ...props
  }
}

const dispatchToProps = (dispatch, props) => {
  return {
    ...props,
    requestRedactionUser: (value) => (dispatch( requestRedactionUser(value) ))
  }
}

ListUsersPopupWindowUser.propTypes = {
  index: PropTypes.number.isRequired,
  pagesNumber: PropTypes.number.isRequired, 
  data: PropTypes.object.isRequired,
  setPopupWindowUser: PropTypes.func.isRequired,
  requestRedactionUser: PropTypes.func.isRequired,
  statusRedaction: PropTypes.string.isRequired, 
  errorRedactionMessage: PropTypes.string.isRequired
}

export default connect(stateToProps, dispatchToProps)(ListUsersPopupWindowUser);