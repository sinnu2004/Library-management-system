document.addEventListener('DOMContentLoaded',()=>{

    const popular = [
        {
            id: 1,
            title : 'R.D.sharma',
            images: 'images/Mathematics for Class 10 by R D Sharma (1).jpeg',
            author: 'R.D. Sharma',
            description: 'This is a best book for mathematics',
            year: 2025
        },
        {
            id: 2,
            title: 'A Year of Positive Thinking',
            images: 'images/thinking.jpeg',
            author: 'Amanda Fox',
            description: 'A Book for positivity',
            year: 2025
        },
        {
            id: 3,
            title: 'A Parallel Universe',
            images: 'images/parallel.jpeg',
            author: 'Dr. joey',
            description: 'A sci-fi Book by Dr. joey',
            year: 2025
        },
        {
            id: 4,
            title: 'The Land of Clouds',
            images: 'images/clouds.jpeg',
            author: 'Fyadar josh',
            description: 'A Fictional Book',
            year: 2025
        }
    ];

    const novel = [
        {
            id: 1,
            title : 'The Heart Hollow',
            images: 'images/heart.jpeg',
            author: 'fyadar dovetesky',
            description: 'A Love Novel',
            year: 2025
        },
        {
            id: 2,
            title: 'War of Eden',
            images: 'images/eden.jpeg',
            author: 'Renu kumar',
            description: 'A Novel of history war',
            year: 2025
        },
        {
            id: 3,
            title: 'The Silver Crow',
            images: 'images/crow.jpeg',
            author: 'Trif Premade',
            description: 'A kings story',
            year: 2025
        },
        {
            id: 4,
            title: 'The Lost Gods',
            images: 'images/lostgod.jpeg',
            author: 'fyadar hussain',
            description: 'A Lost God conquered Again',
            year: 2025
        }
    ]

    const grid = document.getElementById('popular-grid-container');
    popular.forEach(p => {
        const b = document.createElement('div');
        b.className = 'popular-grid';
        b.innerHTML = `<div class="popular-grid"><img id="img-grid" class="book-img" src="${p.images}" alt="book-img"><br>${p.author}</div>`;

        grid.appendChild(b);
        b.querySelector('.book-img').addEventListener('click', () => {
            localStorage.setItem('selectedBook',JSON.stringify(p));
            window.location.href = 'book-details.html';
        });
    });

    const novel_grid = document.getElementById('novel-grid-container');
    novel.forEach(p => {
        const b = document.createElement('div');
        b.className = 'novel-grid';
        b.innerHTML = `<div class="novel-grid"><img id="img-grid" class="book-img" src="${p.images}" alt="book-img"><br>${p.author}</div>`;
        novel_grid.appendChild(b);
        b.querySelector('.book-img').addEventListener('click', () => {
            localStorage.setItem('selectedBook',JSON.stringify(p));
            window.location.href = 'book-details.html';
        })
    });

    const allbooks = [...popular, ...novel];

    const searchbar = document.getElementById('search-bar');
    const suggestions = document.getElementById('suggestions');

    searchbar.addEventListener('input', () => {
        const query = searchbar.value.toLowerCase().trim();
        suggestions.innerHTML = '';

        if(query === '') {
            suggestions.style.display = 'none';
            return;
        }

        const result = allbooks.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.author.toLowerCase().includes(query) || 
            p.year.toString().includes(query)
        );

        if(result.length > 0) {
            suggestions.style.display = 'block';
            result.forEach(book => {
                const div = document.createElement('div');
                div.className = 'suggetions'
                div.style.padding = '8px';
                div.style.cursor = 'pointer';
                div.style.width = '200px';
                div.textContent = `${book.title} (${book.author}, ${book.year})`;
                suggestions.appendChild(div);

                div.addEventListener('click', () => {
                    localStorage.setItem('selectedBook', JSON.stringify(book));
                    window.location.href = 'book-details.html';
                });
            });
        }
        else {
            suggestions.style.display = 'block';
            const div = document.createElement('div');
            div.style.padding = '8px';
            div.textContent = 'No result found';
            suggestions.appendChild(div);
        }
    });

    document.addEventListener('click', (e) => {
        if(!e.target.closest('.search-container')) {
            suggestions.style.display = 'none';
        }
    });

    searchbar.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            const query = searchbar.value.toLowerCase().trim();
            const result = allbooks.find(books =>
                books.title.toLowerCase() === query ||
                books.author.toLowerCase() === query ||
                books.year.toString() === query
            );
            if (result) {
                localStorage.setItem('selectedBook', JSON.stringify(result));
                window.location.href = 'book-details.html';
            } 
            else {
                alert('No matching book found.');
            }
        }
    });
});
