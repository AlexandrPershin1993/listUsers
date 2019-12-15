import { call, put } from 'redux-saga/effects';
import { requestDataError, requestDataSucces } from '../reducers/listUsers';
import requestListUsers from '../APIRequest/requestListUsers';

export default function* listUsers(action){
  try {
    const data = yield call(requestListUsers, action.value);
    yield put( requestDataSucces(data) );
  } catch(e){
    yield put( requestDataError(e.message) );
  }
}