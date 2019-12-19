import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { requestDeleteLoading, requestDeleteError, requestDeleteSucces, deleteUserTimerEnd } from '../reducers/listUsers';
import requestDeleteUsers from '../APIRequest/requestListUsers';

export default function* listUsers(action){
  try {
    yield put( requestDeleteLoading() );
    yield call(requestDeleteUsers, action.value);
    yield put( requestDeleteSucces() );
    yield delay(1000);
    yield put(deleteUserTimerEnd(action.value))
  } catch(e){
    yield put( requestDeleteError(e.message) );
  }
}