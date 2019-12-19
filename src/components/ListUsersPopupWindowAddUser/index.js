import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';
import Button from '../Button';
import { requestAddUser } from '../../reducers/listUsers';
import emailValidator from '../../validators/emailValidator';
import nameValidator from '../../validators/nameValidator';
import surnameValidator from '../../validators/surnameValidator';
import imgValidator from '../../validators/imgValidator';

function upperCaseOneChar(value){
  return value[0].toUpperCase() + value.substring(1).toLowerCase();
}

function ListUsersPopupWindowAddUser({setPopupWindowAddUser, statusAdd, errorAddMessage, requestAddUser, ...props}){
 
  if(statusAdd === 'succes' || statusAdd === 'error'){
    setTimeout(() => (setPopupWindowAddUser(false)), 900)
  }

  let [inputName, setInputName] = useState('');
  let [inputSurname, setInputSurname] = useState('');
  let [inputMail, setInputMail] = useState('');
  let [inputImg, setInputImg] = useState('');
  let [inputValid, setInputValid] = useState([
    true, 
    true, 
    true,
    true
  ]);

  const refInputName = useRef(null);
  const refInputSurname = useRef(null);
  const refInputMail = useRef(null);
  const refInputImg = useRef(null);

  function clickSendRedactionData(){
  setInputValid([
    nameValidator(inputName), 
    surnameValidator(inputSurname),
    emailValidator(inputMail), 
    imgValidator(inputImg)
  ]);

    if(!nameValidator(inputName)){
      refInputName.current.focus();
      return;
    }

    if(!surnameValidator(inputSurname)){
      refInputSurname.current.focus();
      return;
    }

    if(!emailValidator(inputMail)){
      refInputMail.current.focus();
      return;
    }

    if(!emailValidator(inputMail)){
      refInputMail.current.focus();
      return;
    }

    if(!imgValidator(inputImg)){
      refInputImg.current.focus();
      return;
    }

    requestAddUser({
      email: inputMail,
      first_name: upperCaseOneChar(inputName),
      last_name: upperCaseOneChar(inputSurname),
      avatar: inputImg
    })

  }

  function inputRedactionName(event){
    const value = event.target.value.replace(/[^a-z^а-я]/gi,'');
    let arrayInputValid = inputValid;
    arrayInputValid[0] = true;
    setInputValid(arrayInputValid);
    setInputName(value);
  }
    
  function inputRedactionSurname(event){
    let arrayInputValid = inputValid;
    arrayInputValid[1] = true;
    setInputValid(arrayInputValid);
    const value = event.target.value.replace(/[^a-z^а-я]/gi,'');
    setInputSurname(value);
  }
    
  function inputRedactionMail(event){
    let arrayInputValid = inputValid;
    arrayInputValid[2] = true;
    setInputValid(arrayInputValid);
    const value = event.target.value.replace(/[\s]/g,'');
    setInputMail(value);
  }

  function inputRedactionImg(event){
    let arrayInputValid = inputValid;
    arrayInputValid[3] = true;
    setInputValid(arrayInputValid);
    const value = event.target.value.replace(/[\s]/g,'');
    setInputImg(value);
  }

  return (
    <div className='list-users-popup-window-add-user' onClick={() => (setPopupWindowAddUser(false))}>
      <div className='list-users-popup-window-add-user-div-data' onClick={(event) => (event.stopPropagation())}>
        {(statusAdd !== 'error' && statusAdd !== 'succes') ? (
          <img src='images/close.png' 
            alt='close' 
            className='list-users-popup-window-add-img-close' 
            onClick={() => (setPopupWindowAddUser(false))} 
          />
        ) : null}
        {!statusAdd ? (
          <h3 className='list-users-popup-window-add-user-div-h3'>
            Добавьте нового пользователя!
          </h3>
        ) : null}
        {(statusAdd === 'loading') ? <img src='images/loading.gif' alt='loading' className='list-users-popup-window-add-user-img-loading' /> : null}
        {(statusAdd === 'error') ? (
          <span className='list-users-popup-window-add-user-span-error'>
            {errorAddMessage}
          </span>
        ) : null}
        {(statusAdd === 'succes') ? (
          <span className='list-users-popup-window-add-user-span-succes'> 
            Пользователь добавлен! 
          </span>
        ) : null}
        { !statusAdd ? (
          <form className='list-users-popup-window-add-user-form'>
            <input 
              type='text' 
              ref={refInputName} 
              value={inputName} 
              onInput={inputRedactionName} 
              autoFocus 
              className='list-users-popup-window-add-user-input' 
              placeholder='введите имя'
              style={!inputValid[0] ? {borderColor: 'red'} : null}
            />
            <br />
            <input 
              type='text' 
              ref={refInputSurname} 
              value={inputSurname} 
              onInput={inputRedactionSurname} 
              className='list-users-popup-window-add-user-input' 
              placeholder='введите Фамилию'
              style={!inputValid[1] ? {borderColor: 'red'} : null}
            />
            <br />
            <input 
              type='text' 
              ref={refInputMail} 
              value={inputMail} 
              onInput={inputRedactionMail} 
              className='list-users-popup-window-add-user-input' 
              placeholder='введите свою почту'
              style={!inputValid[2] ? {borderColor: 'red'} : null}
            />
            <br />
            <input 
              type='text' 
              ref={refInputImg} 
              value={inputImg} 
              onInput={inputRedactionImg} 
              className='list-users-popup-window-add-user-input' 
              placeholder='введите ссылку на изображение'
              style={!inputValid[3] ? {borderColor: 'red'} : null}
            />
            <br />
            <Button type='button' value='Отправить' width='120px' click={() => (clickSendRedactionData())}/>
          </form>
        ) : null}
      </div>
    </div>
  )
}

const stateToProps = (state, props) => {
  return {
    statusAdd: state.listUsers.statusAdd,
    errorAddMessage: state.listUsers.errorDeleteMessage
  }
}

const dispatchToProps = (dispatch, props) => {
  return {
    requestAddUser: (value) => (dispatch( requestAddUser(value) )),
    ...props
  }
}

ListUsersPopupWindowAddUser.propTypes = {
  statusAdd: PropTypes.string.isRequired,
  errorAddMessage: PropTypes.string.isRequired,
  setPopupWindowAddUser: PropTypes.func.isRequired,
  requestAddUser: PropTypes.func.isRequired
}

export default connect(stateToProps, dispatchToProps)(ListUsersPopupWindowAddUser);