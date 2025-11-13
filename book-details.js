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

    const t = new Date();
    const format = t.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    book.borrowedAt = format;
    const borrow = document.getElementById('borrow-btn');
    borrow.addEventListener('click', () => {
    let requests = JSON.parse(localStorage.getItem('borrowRequests')) || [];

    const exist = requests.some(b => b.id === book.id);
    if (exist) {
        alert('You have already requested this book.');
        return;
    }

    const t = new Date().toLocaleString();
    const request = { ...book, requestedAt: t, status: 'Pending' };

    requests.push(request);
    localStorage.setItem('borrowRequests', JSON.stringify(requests));

    alert('Borrow request sent!');
    });

    const back = document.getElementById('back-btn');
    back.addEventListener('click', ()=>{
        window.location.href = 'index.html';
    });
});