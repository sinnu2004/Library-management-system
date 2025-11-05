document.addEventListener('DOMContentLoaded', () =>{
    /* my book */
    const container = document.getElementById('my-book-container');
    const borrowed = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

    if(borrowed.length === 0) {
        container.innerHTML = '<p>No borrowed books</p>';
        return;
    }

    borrowed.forEach(book =>{
        const time = Date.now();
        const list = document.createElement('div');
        list.className = 'book-card';
        list.innerHTML = `<div><img class="book-img" src="${book.images}" alt="${book.title}"></div><table class="detail-table" border="1">
        <th>Name</th>
        <th>Author</th>
        <th>Year</th>
        <th>time</th>
        <tr>
        <td> ${book.title}</td>
        <td> ${book.author}</td>
        <td> ${book.year}</td>
        <td>${time}</td>
        </tr></table><div><button class="return-btn">Return</button></div>`;
        container.appendChild(list);

        list.querySelector('.return-btn').addEventListener('click',() => {
            let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
            borrowedBooks = borrowedBooks.filter(b => b.id !=book.id);
            localStorage.setItem('borrowedBooks',JSON.stringify(borrowedBooks));
            alert(`${book.title} has been returned`);
            list.remove();
        });
    });

    const back = document.getElementById('back-btn');
    back.addEventListener('click', ()=>{
        window.location.href = 'index.html';
    })
});