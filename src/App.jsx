import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';

function App() {
    const initialMovies = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Awesome Movie ${i + 1}`,
        rating: Math.floor(Math.random() * 4) + 6,
        genre: ['Action', 'Sci-Fi', 'Drama', 'Comedy', 'Thriller'][Math.floor(Math.random() * 5)],
        year: Math.floor(Math.random() * 24) + 2000,
        image: `https://picsum.photos/seed/${i + 10}/400/600`,
        isFavorite: false,
        comments: []
    }));

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [ratingFilter, setRatingFilter] = useState('all');

    const [movies, setMovies] = useState(initialMovies);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(6);

    const gridRef = useRef(null);

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-theme' : '';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        const calculateRows = () => {
            if (gridRef.current) {
                const gridWidth = gridRef.current.offsetWidth;
                const columns = Math.floor(gridWidth / 330);
                setMoviesPerPage(Math.max(columns, 1) * 2);
            }
        };

        const resizeObserver = new ResizeObserver(calculateRows);
        if (gridRef.current) resizeObserver.observe(gridRef.current);

        calculateRows();
        return () => resizeObserver.disconnect();
    }, []);

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
        setMovies(prev => [newMovie, ...prev]);
    };

    const toggleFavorite = (id) => {
        setMovies(prev =>
            prev.map(movie =>
                movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
            )
        );
    };

    const filteredMovies = movies.filter(movie => {
        if (activeTab === 'favorites' && !movie.isFavorite) return false;
        if (ratingFilter !== 'all' && movie.rating < parseInt(ratingFilter)) return false;
        if (searchQuery && !movie.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const indexOfLast = currentPage * moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfLast - moviesPerPage, indexOfLast);
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    return (
        <div className="dashboard-container">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                ratingFilter={ratingFilter}
                setRatingFilter={setRatingFilter}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                setCurrentPage={setCurrentPage}
            />

            <main className="main-content">
                <TopBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleAddMovie={handleAddMovie}
                    setCurrentPage={setCurrentPage}
                />

                <h2>{activeTab === 'all' ? 'All Films' : 'Favorite Films'}</h2>

                <MovieGrid
                    movies={currentMovies}
                    toggleFavorite={toggleFavorite}
                    gridRef={gridRef}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </main>
        </div>
    );
}

export default App;