document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('requests-container');
  const requests = JSON.parse(localStorage.getItem('borrowRequests')) || [];

  if (requests.length === 0) {
    container.innerHTML = '<p>No borrow requests</p>';
    return;
  }

  requests.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book-card';
    div.innerHTML = `
      <img class="book-img" src="${book.images}" alt="${book.title}" style="width:80px;height:100px;">
      <div class="admin-book-detail">
      <table class="admin-table" border="1">
      <th>Name</th>
      <th>Request At</th>
      <th>Status</th>
      <tr>
      <td>${book.title}${book.author}</td>
      <td>${book.requestedAt}</td>
      <td>${book.status}</td>
      </table>
      <div class="admin-button">
      <button class="admin-btn">Approve</button>
      <button class="admin-btn">Reject</button></div>
    `;

    container.appendChild(div);

    div.querySelector('.approve-btn').addEventListener('click', () => {
      book.status = 'Approved';
      let borrowed = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
      borrowed.push(book);
      localStorage.setItem('borrowedBooks', JSON.stringify(borrowed));

      removeRequest(book.id);
      div.remove();
      alert(`${book.title} has been approved and moved to My Books.`);
    });

    div.querySelector('.reject-btn').addEventListener('click', () => {
      removeRequest(book.id);
      div.remove();
      alert(`${book.title} request has been rejected.`);
    });
  });

  function removeRequest(id) {
    let updated = requests.filter(b => b.id !== id);
    localStorage.setItem('borrowRequests', JSON.stringify(updated));
  }
});
