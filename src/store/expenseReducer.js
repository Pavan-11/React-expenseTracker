import {createSlice} from '@reduxjs/toolkit';


const initialExpenseState = {
    expenses : [],
    showPremiumButton : false,
};

const expenseSlice = createSlice({
    name : 'expense',
    initialState : initialExpenseState,
    reducers : {
        setExpenses(state , action){
            state.expenses = action.payload.expense;
            state.showPremiumButton = state.expenses.some(expense => expense.price > 10000);
        },
        addExpenses(state, action){
            state.expenses.push(action.payload.expense);
            state.showPremiumButton = state.expenses.some(expense => expense.price > 10000);
        },
        updateExpense(state, action){
            const { id, description, price, category } = action.payload;
            const expenseToUpdate = state.expenses.find(expense => expense.id === id);

            if (expenseToUpdate) {
                expenseToUpdate.description = description;
                expenseToUpdate.price = price;
                expenseToUpdate.category = category;
                state.showPremiumButton = state.expenses.some(expense => expense.price > 10000);
            }
        },
        deleteExpense(state, action) {
            const idToDelete = action.payload.id;
            state.expenses = state.expenses.filter(expense => expense.id !== idToDelete);
            state.showPremiumButton = state.expenses.some(expense => expense.price > 10000);
        },
    },
});

export const {setExpenses, addExpenses, updateExpense,deleteExpense} = expenseSlice.actions;


export default expenseSlice.reducer;