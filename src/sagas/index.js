import { takeLatest } from 'redux-saga/effects';
import listUsers from './listUsers';
import { REQUEST_LIST_USERS } from '../reducers/listUsers';

export default function* rootSaga(){
   yield takeLatest(REQUEST_LIST_USERS, listUsers);
};