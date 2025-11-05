document.addEventListener('DOMContentLoaded', () => {

    /* -------- Local book data -------- */
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
            title: 'The Heart Hollow',
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
    ];

    /* -------- Display local books on homepage -------- */
    const grid = document.getElementById('popular-grid-container');
    popular.forEach(p => {
        const b = document.createElement('div');
        b.className = 'popular-grid';
        b.innerHTML = `<div class="popular-grid"><img id="img-grid" class="book-img" src="${p.images}" alt="book-img"><br>${p.author}</div>`;

        grid.appendChild(b);
        b.querySelector('.book-img').addEventListener('click', () => {
            localStorage.setItem('selectedBook', JSON.stringify(p));
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
            localStorage.setItem('selectedBook', JSON.stringify(p));
            window.location.href = 'book-details.html';
        });
    });

    /* -------- Combine all local books -------- */
    const allbooks = [...popular, ...novel];

    /* -------- Fetch from Google Books API -------- */
    async function fetchBooks(query) {
        const key = `books_${query.toLowerCase()}`;

        // Try to load from cache
        const cached = localStorage.getItem(key);
        if (cached) {
            const data = JSON.parse(cached);
            if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) { // 24 hours
                console.log("Loaded from cache:", query);
                return data.results;
            }
        }

        // Fetch new data from Google Books API
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (!data.items) return [];

            const results = data.items.map((item, index) => ({
                id: Date.now() + index, // unique id
                title: item.volumeInfo.title || "No Title",
                author: (item.volumeInfo.authors && item.volumeInfo.authors[0]) || "Unknown",
                images: (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) || "images/default.jpg",
                description: item.volumeInfo.description || "No description available.",
                year: item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate.slice(0, 4) : "N/A"
            }));

            // Save to cache
            localStorage.setItem(key, JSON.stringify({
                timestamp: Date.now(),
                results: results
            }));

            console.log("Fetched from API:", query);
            return results;
        } catch (error) {
            console.error("Error fetching from API:", error);
            return [];
        }
    }

    /* -------- Search logic (local + API) -------- */
    const searchbar = document.getElementById('search-bar');
    const suggestions = document.getElementById('suggestions');

    searchbar.addEventListener('input', async () => {
        const query = searchbar.value.toLowerCase().trim();
        suggestions.innerHTML = '';

        if (query === '') {
            suggestions.style.display = 'none';
            return;
        }

        // Local search
        const localResults = allbooks.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.author.toLowerCase().includes(query) ||
            p.year.toString().includes(query)
        );

        // API search
        const apiResults = await fetchBooks(query);

        // Merge results
        const results = [...localResults, ...apiResults];

        // Show results
        if (results.length > 0) {
            suggestions.style.display = 'block';
            results.forEach(book => {
                const div = document.createElement('div');
                div.className = 'suggestions';
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
        } else {
            suggestions.style.display = 'block';
            const div = document.createElement('div');
            div.style.padding = '8px';
            div.textContent = 'No result found';
            suggestions.appendChild(div);
        }
    });

    /* -------- Hide suggestions on outside click -------- */
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            suggestions.style.display = 'none';
        }
    });

    /* -------- Search by Enter key -------- */
    searchbar.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const query = searchbar.value.toLowerCase().trim();

            // Check in local books first
            let result = allbooks.find(books =>
                books.title.toLowerCase() === query ||
                books.author.toLowerCase() === query ||
                books.year.toString() === query
            );

            // If not found, try API
            if (!result) {
                const apiResults = await fetchBooks(query);
                result = apiResults.length > 0 ? apiResults[0] : null;
            }

            if (result) {
                localStorage.setItem('selectedBook', JSON.stringify(result));
                window.location.href = 'book-details.html';
            } else {
                alert('No matching book found.');
            }
        }
    });
});
