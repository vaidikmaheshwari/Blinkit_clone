import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { successLoginApi, failedLoginApi } from '../slices/userSlice';
import { loginUserApi } from '../../services/commonApis';
import Toast from 'react-native-toast-message';

export function* LoginSaga(action: { payload: any }): any {
    try {
        const response = yield call(loginUserApi, action.payload);
        if (response.status === 200) {
            console.log(response.data);
            // console.log("all set");
            yield put(successLoginApi(response.data));
        }
        else {
            // console.log("gdfsfgf", response);
            yield put(failedLoginApi('dfd'));

        }
    }
    catch (err) {
        console.log(err);
    }
}