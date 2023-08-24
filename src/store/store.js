import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authReducer';
import expenseReducer from './expenseReducer';
import themeReducer from './themeReducer';


const store = configureStore({
    reducer : {expense : expenseReducer, auth : authReducer, theme : themeReducer},
});

console.log(store.getState())

export default store;