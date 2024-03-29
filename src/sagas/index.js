import { takeLatest, takeEvery } from 'redux-saga/effects';
import listUsers from './listUsers';
import redactionUsers from './redactionUsers';
import deleteUsers from './deleteUsers';
import addUsers from './addUsers';
import { REQUEST_LIST_USERS, REQUEST_REDACTION_USER, REQUEST_DELETE_USER, REQUEST_ADD_USER } from '../reducers/listUsers';

export default function* rootSaga(){
  yield takeLatest(REQUEST_LIST_USERS, listUsers);
  yield takeEvery(REQUEST_REDACTION_USER, redactionUsers);
  yield takeEvery(REQUEST_DELETE_USER, deleteUsers);
  yield takeEvery(REQUEST_ADD_USER, addUsers);
};