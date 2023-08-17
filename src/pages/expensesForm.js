import React, { useState } from 'react';
import classes from './expenseForm.module.css';

const ExpensesForm = () => {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('fuel');

    const addExpense = (event) => {
        event.preventDefault();
        const newExpense = {
            description,
            price: parseFloat(price),
            category
        };
        setExpenses([...expenses, newExpense]);
        setDescription('');
        setPrice('');
        setCategory('fuel');
    };

    return (
        <div>
            <form onSubmit={addExpense} className={classes.form}>
                <h2>Daily Expenses</h2>
                <label htmlFor='description'>Description: </label>
                <input
                    type="text"
                    name='description'
                    id='description'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <label htmlFor='price'>Price: </label>
                <input
                    type="number"
                    name='price'
                    id='price'
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />

                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value="fuel">Fuel</option>
                    <option value="movie">Movie</option>
                    <option value="food">Food</option>
                    <option value="health">Health Care</option>
                </select>

                <button type="submit">Add Expense</button>
            </form>

            <div>
                <table className={classes.table}>
                <h2>Expenses entered by the user:</h2>
                    <thead>
                        <tr className={classes.tr}>
                            <th style={{padding : '1rem 10rem'}}>Description</th>
                            <th style={{ padding: '1rem 10rem' }}>Price</th>
                            <th style={{ padding: '1rem 10rem' }}>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr key={index} className={classes.tr}>
                                <td style={{ padding: '1rem 10rem' }}>{expense.description}</td>
                                <td style={{ padding: '1rem 10rem' }}>{expense.price}</td>
                                <td style={{ padding: '1rem 10rem' }}>{expense.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpensesForm;
