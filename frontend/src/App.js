import React, { useState, useEffect } from 'react';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/items')
            .then(res => res.json())
            .then(data => setItems(data));
    }, []);

    const addItem = () => {
        fetch('http://localhost:5000/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newItem }),
        })
            .then(res => res.json())
            .then(item => setItems([...items, item]));
        setNewItem('');
    };

    return (
        <div>
            <h1>Item List</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                placeholder="Add new item"
            />
            <button onClick={addItem}>Add</button>
        </div>
    );
}

export default App;

