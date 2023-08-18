import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './expenseForm.module.css';
import { Button } from 'react-bootstrap';

const ExpensesForm = () => {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('fuel');
    const [editingExpenseId, setEditingExpenseId] = useState(null);


    useEffect(() => {

        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('https://expensetracker-d7655-default-rtdb.firebaseio.com/expenses.json');
            if (response.data) {
                const expenseList = Object.values(response.data);
                setExpenses(expenseList);
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const addExpense = async (event) => {
        event.preventDefault();
        const newExpense = {
            description,
            price: parseFloat(price),
            category
        };

        try {
            await axios.post('https://expensetracker-d7655-default-rtdb.firebaseio.com/expenses.json', newExpense);
            setDescription('');
            setPrice('');
            setCategory('fuel');
            fetchExpenses();
        } catch (error) {
            console.error('Error adding expense:', error)
        }
    };

    const deleteExpense = async (id) => {
        console.log('delete clicked')
        try {
            await axios.delete(`https://expensetracker-d7655-default-rtdb.firebaseio.com/expenses/${id}.json`);
            fetchExpenses();//fetching updated expenses after deleting
        } catch (error) {
            console.error('Error deleting expense: ', error);
        }
    }

    const editExpense = (id) => {
        setEditingExpenseId(id);
        const expenseToEdit = expenses.find(expense => expense.id === id);
        setDescription(expenseToEdit.description);
        setPrice(expenseToEdit.price);
        setCategory(expenseToEdit.category);
    };

    const cancelEdit = () => {
        setEditingExpenseId(null);
        setDescription('')
        setCategory('fuel')
        setPrice('');
    };


    const saveEdit = async () => {
        const editedExpense = {
            description,
            price: parseFloat(price),
            category
        };

        try {
            await axios.put(`https://expensetracker-d7655-default-rtdb.firebaseio.com/expenses/${editingExpenseId}.json`, editedExpense)
            cancelEdit();
            fetchExpenses();//fetch updated expense after editing
        } catch (error) {
            console.error('Error editing expense: ', error);
        }
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
                            <th style={{ padding: '1rem 10rem' }}>Description</th>
                            <th style={{ padding: '1rem 10rem' }}>Price</th>
                            <th style={{ padding: '1rem 10rem' }}>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(expenses).map(([expenseId, expense]) => (
                            <tr key={expenseId} className={classes.tr}>
                                <td style={{ padding: '1rem 10rem', position: 'relative', left: '2rem' }}>{expense.description}</td>
                                <td style={{ padding: '1rem 10rem', position: 'relative', left: '4rem' }}>{expense.price}</td>
                                <td style={{ padding: '1rem 10rem', position: 'relative', left: '5rem' }}>{expense.category}</td>
                                <td>
                                    {editingExpenseId === expenseId ? (
                                        <div>
                                            <Button variant="secondary" size="sm" onClick={() => cancelEdit()}>Cancel</Button>
                                            <Button variant="success" size="sm" onClick={() => saveEdit()}>Save</Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Button className='m-3' size="sm" onClick={() => editExpense(expenseId)}>Edit</Button>
                                            <Button size="sm" onClick={() => deleteExpense(expenseId)}>Delete</Button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpensesForm;
