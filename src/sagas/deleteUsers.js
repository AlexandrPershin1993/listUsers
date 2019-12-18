import { call, put } from 'redux-saga/effects';
import { requestDeleteLoading, requestDeleteError, requestDeleteSucces } from '../reducers/listUsers';
import requestDeleteUsers from '../APIRequest/requestListUsers';

export default function* listUsers(action){
  try {
    yield put( requestDeleteLoading() );
    yield call(requestDeleteUsers, action.value);
    yield put( requestDeleteSucces() );
  } catch(e){
    yield put( requestDeleteError(e.message) );
  }
}