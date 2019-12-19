import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { requestAddError, requestAddLoading, requestAddSucces, addUserTimerEnd } from '../reducers/listUsers';
import requestAddUsers from '../APIRequest/requestListUsers';

export default function* addUsers(action){
  try {
    yield put( requestAddLoading() );
    yield call(requestAddUsers, action.value);
    yield put( requestAddSucces() );
    yield delay(1000);
    yield put(addUserTimerEnd(action.value))
  } catch(e){
    yield put( requestAddError(e.message) );
  }
}