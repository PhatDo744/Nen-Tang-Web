import React, { useState, useEffect } from 'react';

function BookForm({onAdd, onUpdate, editingBook}) {
    // usf
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        if (editingBook) {
        setTitle(editingBook.title);
        setAuthor(editingBook.author);
        setYear(editingBook.year);
        } else {
        setTitle('');
        setAuthor('');
        setYear('');
        }
    }, [editingBook]);
    // cpf
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingBook) {
        // Update
        onUpdate({
            ...editingBook,
            title,
            author,
            year: parseInt(year, 10),
        });
        } else {
        // Add
        const newBook = {
            id: Date.now(),
            title,
            author,
            year: parseInt(year, 10),
        };
        onAdd(newBook);
        }
    };

    
    return ( 
        <form onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
            <h2>{editingBook ? 'Sửa sách' : 'Thêm sách'}</h2>
            <div>
                <label>Tiêu đề: </label>
                <input value={title} onChange={(e) => setTitle (e.target.value)} />
            </div>
            <div>
                <label>Tác giả: </label>
                <input value={author} onChange={(e) => setAuthor (e.target.value)} />
            </div>
            <div>
                <label>Năm XB: </label>
                <input type="number" value={year} onChange={(e) => setYear (e.target.value)} />
            </div>
            <button type='submit'>{editingBook ? 'Cập nhật' : 'Thêm'}</button>
        </form>
    );
}

export default BookForm;