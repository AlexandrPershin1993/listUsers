import { call, put } from 'redux-saga/effects';
import { requestRedactionError, requestRedactionSucces, requestRedactionLoading } from '../reducers/listUsers';
import requestRedactionUsers from '../APIRequest/requestRedactionUsers';

export default function* redactionUsers(action){
  try {
    yield put( requestRedactionLoading() );
    yield call(requestRedactionUsers, action.value);
    yield put( requestRedactionSucces(action.value) );
  } catch(e){
    yield put( requestRedactionError(e.message) );
  }
}