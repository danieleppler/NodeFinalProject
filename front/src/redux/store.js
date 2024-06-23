import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistStore,persistReducer} from 'redux-persist'
import Reducer from './Reducer'
import storage from 'redux-persist/lib/storage'
import { legacy_createStore as createStore } from 'redux';

const persistConfig = {
    key:"root",
    storage
}

const persistedRecuer = persistReducer(persistConfig,Reducer)

const rootReducer = combineReducers({root:persistedRecuer})


export const store = createStore(rootReducer)
export const persistor = persistStore(store)