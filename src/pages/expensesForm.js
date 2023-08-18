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
                console.log('fetched Data', response.data)
                const fetchedExpenses = response.data;
                const expenseList = Object.entries(fetchedExpenses).map(([id, expense]) => ({
                    id,
                    ...expense
                }));
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
        try {
            await axios.delete(`https://expensetracker-d7655-default-rtdb.firebaseio.com/expenses/${id}.json`);
            console.log('id deleted', id);
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

    const saveEdit = async() => {
        const editedExpense = {
            description,
            price :parseFloat(price ),
            category
        };
        try{
            await axios.put(`https://expensetracker-d7655-default-rtdb.firebaseio.com/expenses/${editingExpenseId}.json`, editedExpense);
            setEditingExpenseId(null);
            fetchExpenses();
        }catch(error){
            console.error('Error editing exoense', error)
        }
    }

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
                <h2 className={classes.h2}>Expenses entered by the user:</h2>
                <table className={classes.table}>
                    <thead style={{width: '100vw'}}>
                        <tr className={classes.tr}>
                            <th style={{ padding: '1rem 10rem' }}>Description</th>
                            <th style={{ padding: '1rem 10rem' }}>Price</th>
                            <th style={{ padding: '1rem 10rem' }}>Category</th>
                            <th style={{ padding: '1rem 10rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{width: '100vw'}}>
                        {expenses.map((expense) => (
                            <tr key={expense.id} className={classes.tr}>
                                <td style={{ padding: '1rem 10rem', position: 'relative', left: '2rem' }}>
                                    {editingExpenseId === expense.id ? (
                                        <input
                                            type="text"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                    ) : (
                                        expense.description || 'N/A'
                                    )}
                                </td>
                                <td style={{ padding: '1rem 10rem', position: 'relative', left: '4rem' }}>
                                    {editingExpenseId === expense.id ? (
                                        <input
                                            type="number"
                                            value={price}
                                            onChange={(event) => setPrice(event.target.value)}
                                        />
                                    ) : (
                                        expense.price || 'N/A'
                                    )}
                                </td>
                                <td style={{ padding: '1rem 10rem', position: 'relative', left: '5rem' }}>
                                    {editingExpenseId === expense.id ? (
                                        <select
                                            value={category}
                                            onChange={(event) => setCategory(event.target.value)}
                                        >
                                            <option value="fuel">Fuel</option>
                                            <option value="movie">Movie</option>
                                            <option value="food">Food</option>
                                            <option value="health">Health Care</option>
                                        </select>
                                    ) : (
                                        expense.category || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editingExpenseId === expense.id ? (
                                        <div>
                                            <Button variant="secondary" size="sm" onClick={cancelEdit}>Cancel</Button>
                                            <Button variant="success" size="sm" onClick={saveEdit}>Save</Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Button className='m-3' size="sm" onClick={() => editExpense(expense.id)}>Edit</Button>
                                            <Button size="sm" onClick={() => deleteExpense(expense.id)}>Delete</Button>
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
