document.addEventListener('DOMContentLoaded', () => {
    const bookData = localStorage.getItem('selectedBook');

    if(!bookData) {
        document.querySelector('.book-details-container').innerHTML = '<p>NO book data found</p>';
        return;
    }

    const book = JSON.parse(bookData);

    document.getElementById('book-image').src = book.images;
    document.getElementById('book-id').textContent = book.id;
    document.getElementById('book-title').textContent = book.title;
    document.getElementById('book-author').textContent = book.author;
    document.getElementById('book-year').textContent = book.year;
    document.getElementById('book-description').textContent = book.description;

    const borrow = document.getElementById('borrow-btn');
    borrow.addEventListener('click', () => {
        let borrowed = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

        const exist = borrowed.some(b => b.id===book.id);
        if(exist) {
            alert('you have already borrowed this book');
            return;
        }
        borrowed.push(book);
        localStorage.setItem('borrowedBooks',JSON.stringify(borrowed));
        alert('Book added to My Books');
        window.location.href = 'my-book.html';
    });

    const back = document.getElementById('back-btn');
    back.addEventListener('click', ()=>{
        window.location.href = 'index.html';
    })
});