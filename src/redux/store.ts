import {configureStore,} from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import createSagaMiddleware from 'redux-saga';

// import sagas from './saga';
import { RootReducer } from './slices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootSaga from './sagas';

const config = {
  key: 'root',
  storage: AsyncStorage,
    debug: true,
  blacklist: ['cart','cartProductModal','order'],
  // serialize: () => ({}),
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(config, RootReducer);

 const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(RootSaga);
export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

// middleware: getDefaultMiddleware =>
// getDefaultMiddleware().concat(sagaMiddleware),