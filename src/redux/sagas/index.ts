
import { fetchLoginApi } from '../slices/userSlice';
import {all, takeLatest} from 'redux-saga/effects';
import {TakeableChannel} from 'redux-saga';
import { LoginSaga } from './LoginSaga';
function* LoginApi() {
    yield takeLatest(
      fetchLoginApi.type as unknown as TakeableChannel<unknown>,
      LoginSaga,
    );
  }
export default function* RootSaga() {
    yield all([LoginApi()]);
}