import React, { useState, useEffect, useRef } from 'react';
import './style.css';

// Initial dummy data
const initialMovies = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Awesome Movie ${i + 1}`,
    rating: Math.floor(Math.random() * 4) + 6, // Random rating 6-9
    genre: ['Action', 'Sci-Fi', 'Drama', 'Comedy', 'Thriller'][Math.floor(Math.random() * 5)],
    year: Math.floor(Math.random() * 24) + 2000,
    image: `https://picsum.photos/seed/${i + 10}/400/600`,
    isFavorite: false,
    comments: []
}));

function App() {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark' || false);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [ratingFilter, setRatingFilter] = useState('all');

    const [movies, setMovies] = useState(initialMovies);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(6);
    const gridRef = useRef(null);

    // Apply theme
    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-theme' : '';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    // Dynamic row calculation: always 2 rows
    useEffect(() => {
        const calculateRows = () => {
            if (gridRef.current) {
                const gridWidth = gridRef.current.offsetWidth;
                const columns = Math.floor(gridWidth / 330); // 300px min-width + 30px gap
                const count = Math.max(columns, 1) * 2;
                setMoviesPerPage(count);
            }
        };

        const resizeObserver = new ResizeObserver(() => calculateRows());
        if (gridRef.current) resizeObserver.observe(gridRef.current);

        calculateRows();
        return () => resizeObserver.disconnect();
    }, []);

    // Handlers
    const handleAddMovie = () => {
        const newMovie = {
            id: Date.now(),
            title: "New Custom Movie " + (movies.length + 1),
            rating: Math.floor(Math.random() * 5) + 5,
            genre: "TBD",
            year: new Date().getFullYear(),
            image: `https://picsum.photos/seed/${Date.now()}/400/600`,
            isFavorite: false,
            comments: []
        };
        setMovies([newMovie, ...movies]);
    };

    const toggleFavorite = (id) => {
        setMovies(movies.map(movie =>
            movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
        ));
    };

    // Filters
    const filteredMovies = movies.filter(movie => {
        if (activeTab === 'favorites' && !movie.isFavorite) return false;
        if (ratingFilter !== 'all' && movie.rating < parseInt(ratingFilter)) return false;
        if (searchQuery && !movie.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    return (
        <div className="dashboard-container">
            {/* SIDEBAR */}
            <aside className="sidebar">
                <div className="logo">
                    <i className="fas fa-video"></i> CINETRACK
                </div>

                <nav className="sidebar-nav">
                    <ul className="nav-list">
                        <li className={`nav-item ${activeTab === 'all' ? 'active' : ''}`} onClick={() => {setActiveTab('all'); setCurrentPage(1);}}>
                            <i className="fas fa-film"></i> All Films
                        </li>
                        <li className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`} onClick={() => {setActiveTab('favorites'); setCurrentPage(1);}}>
                            <i className="fas fa-heart"></i> Favorite Films
                        </li>
                    </ul>

                    {/* RATING FILTER IN SIDEBAR */}
                    <div className="sidebar-filter">
                        <label><i className="fas fa-filter"></i> Min Rating</label>
                        <select className="filter-select" value={ratingFilter} onChange={(e) => {setRatingFilter(e.target.value); setCurrentPage(1);}}>
                            <option value="all">All Ratings</option>
                            <option value="9">9+ Stars</option>
                            <option value="8">8+ Stars</option>
                            <option value="7">7+ Stars</option>
                            <option value="6">6+ Stars</option>
                        </select>
                    </div>
                </nav>

                <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                    <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <main className="main-content">
                <header className="top-bar">
                    <div className="search-container">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Find whatever you want..."
                            value={searchQuery}
                            onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
                        />
                    </div>
                    <button className="btn-primary" onClick={handleAddMovie}>
                        <i className="fas fa-plus"></i> Add Movie
                    </button>
                </header>

                <div className="content-header">
                    <h2>{activeTab === 'all' ? 'All Films' : 'Favorite Films'}</h2>
                </div>

                {/* MOVIE GRID */}
                <div className="movie-grid" ref={gridRef}>
                    {currentMovies.length > 0 ? (
                        currentMovies.map(movie => (
                            <div key={movie.id} className="movie-card">
                                <img src={movie.image} alt={movie.title} className="movie-poster" />
                                <div className="movie-info">
                                    <div className="movie-header">
                                        <h3>{movie.title}</h3>
                                        <span className="rating-badge"><i className="fas fa-star"></i> {movie.rating}/10</span>
                                    </div>

                                    <div className="movie-meta">
                                        <span className="genre">{movie.genre}</span>
                                        <span className="year">{movie.year}</span>
                                    </div>

                                    <div className="comment-actions">
                                        <button className="btn-secondary"><i className="fas fa-comment-medical"></i> Comment</button>
                                        <button className="btn-secondary"><i className="fas fa-comments"></i> View ({movie.comments.length})</button>
                                    </div>

                                    <button
                                        className={`btn-favorite ${movie.isFavorite ? 'active' : ''}`}
                                        onClick={() => toggleFavorite(movie.id)}
                                    >
                                        <i className={movie.isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
                                        {movie.isFavorite ? 'Favorited' : 'Favorite'}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">No movies found. Try adjusting your filters or search.</div>
                    )}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                            <i className="fas fa-chevron-left"></i> Prev
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
                            Next <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;