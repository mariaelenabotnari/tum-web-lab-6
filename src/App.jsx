import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';
import AddMovieModal from './components/AddMovieModal';
import { useMovies } from './hooks/useMovies';
import CommentModal from './components/CommentModal';
import ViewCommentsModal from './components/ViewCommentsModal';
import { TMDB_GENRES } from './constants/tmdbGenres';

function App() {
    const { movies, toggleFavorite, addMovie, addComment, editComment, deleteComment } = useMovies();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [topSearchQuery, setTopSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(6);

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

    const [commentMovie, setCommentMovie] = useState(null);
    const [viewMovie, setViewMovie] = useState(null);

    const liveCommentMovie = movies.find(m => m.id === commentMovie?.id);
    const liveViewMovie = movies.find(m => m.id === viewMovie?.id);

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-theme' : '';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const gridRef = useRef(null);

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

    return (
        <div className={`dashboard-container ${(isModalOpen || commentMovie || viewMovie) ? 'modal-active' : ''}`}>
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

                <MovieGrid
                    movies={currentMovies}
                    toggleFavorite={toggleFavorite}
                    addComment={addComment}
                    onComment={(movie) => setCommentMovie(movie)}
                    onView={(movie) => setViewMovie(movie)}
                    gridRef={gridRef}
                />

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

            {commentMovie && (
                <CommentModal
                    movie={liveCommentMovie}
                    onClose={() => setCommentMovie(null)}
                    onSubmit={(text) => { addComment(commentMovie.id, text); setCommentMovie(null); }}
                />
            )}

            {viewMovie && (
                <ViewCommentsModal
                    movie={liveViewMovie}
                    onClose={() => setViewMovie(null)}
                    onEdit={(index, newText) => editComment(viewMovie.id, index, newText)}
                    onDelete={(index) => deleteComment(viewMovie.id, index)}
                />
            )}
        </div>
    );
}

export default App;