import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import reducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const myPersistReducer = persistReducer(persistConfig, reducer)

const store = createStore(myPersistReducer,composeWithDevTools(applyMiddleware(thunk)))

export const persistor = persistStore(store)

export default store