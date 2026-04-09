import React, { useState, useEffect } from 'react';
import './style.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';
import AddMovieModal from './components/AddMovieModal';
import { useMovies } from './hooks/useMovies';
import { TMDB_GENRES } from './constants/tmdbGenres';

function App() {
    const { movies, toggleFavorite, addMovie } = useMovies();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [topSearchQuery, setTopSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 6;

    const [activeTab, setActiveTab] = useState('all');
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [ratingFilter, setRatingFilter] = useState('all');

    const filteredMovies = movies.filter(m => {
        if (activeTab === 'favorites' && !m.isFavorite) return false;
        if (ratingFilter !== 'all' && m.rating < parseInt(ratingFilter)) return false;
        if (topSearchQuery && !m.title.toLowerCase().includes(topSearchQuery.toLowerCase())) return false;
        return true;
    });

    const indexOfLast = currentPage * moviesPerPage;
    const indexOfFirst = indexOfLast - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-theme' : '';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

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
                    openModal={() => setIsModalOpen(true)}
                    topSearchQuery={topSearchQuery}
                    handleTopSearch={setTopSearchQuery}
                    topSearchResults={topSearchQuery ? filteredMovies : []}
                />

                <MovieGrid movies={currentMovies} toggleFavorite={toggleFavorite} />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </main>

            {isModalOpen && (
                <AddMovieModal
                    onClose={() => setIsModalOpen(false)}
                    onAdd={addMovie}
                    TMDB_GENRES={TMDB_GENRES}
                />
            )}
        </div>
    );
}

export default App;