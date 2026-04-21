import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';
import AddMovieModal from './components/AddMovieModal';
import CommentModal from './components/CommentModal';
import ViewCommentsModal from './components/ViewCommentsModal';
import RatingModal from './components/RatingModal';
import { useMovies } from './hooks/useMovies';
import ConfirmModal from './components/ConfirmModal.jsx';
import { TMDB_GENRES } from './constants/tmdbGenres';

function App() {

    const { movies, toggleFavorite, addMovie, addComment, editComment, deleteComment, setRating, deleteMovie } = useMovies();

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [activeTab, setActiveTab]  = useState('all');
    const [ratingFilter, setRatingFilter] = useState('all');
    const [currentPage, setCurrentPage]   = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(6);

    const [topSearchQuery, setTopSearchQuery] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentMovie, setCommentMovie] = useState(null);
    const [viewMovie, setViewMovie] = useState(null);
    const [rateMovie, setRateMovie] = useState(null);

    const liveCommentMovie = movies.find(m => m.id === commentMovie?.id);
    const liveViewMovie = movies.find(m => m.id === viewMovie?.id);
    const liveRateMovie = movies.find(m => m.id === rateMovie?.id);

    const [searchResetKey, setSearchResetKey] = useState(0);
    const [confirmDeleteMovie, setConfirmDeleteMovie] = useState(null);

    const anyModalOpen = isModalOpen || commentMovie || viewMovie || rateMovie || confirmDeleteMovie;

    const filteredMovies = movies.filter(m => {
        if (activeTab === 'favorites' && !m.isFavorite) return false;
        if (ratingFilter?.type === 'unrated' && m.rating !== null) return false;
        if (ratingFilter?.type === 'range') {
            if (m.rating === null) return false;
            if (m.rating < ratingFilter.min || m.rating > ratingFilter.max) return false;
        }
        if (topSearchQuery && !m.title.toLowerCase().includes(topSearchQuery.toLowerCase())) return false;
        return true;
    });

    const indexOfLast= currentPage * moviesPerPage;
    const indexOfFirst= indexOfLast - moviesPerPage;
    const currentMovies= filteredMovies.slice(indexOfFirst, indexOfLast);
    const totalPages= Math.ceil(filteredMovies.length / moviesPerPage);

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

    return (
        <div className={`dashboard-container ${anyModalOpen ? 'modal-active' : ''}`}>

            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                ratingFilter={ratingFilter}
                setRatingFilter={setRatingFilter}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                setCurrentPage={setCurrentPage}
                onHome={() => {
                    setActiveTab('all');
                    setCurrentPage(1);
                    setRatingFilter({ type: 'all' });
                    setTopSearchQuery('');
                    setSearchResetKey(k => k + 1);
                }}
            />

            <main className="main-content">
                <TopBar
                    openModal={() => setIsModalOpen(true)}
                    handleTopSearch={(q) => setTopSearchQuery(q)}
                    allMovies={movies}
                    key={searchResetKey}
                />

                <MovieGrid
                    movies={currentMovies}
                    toggleFavorite={toggleFavorite}
                    onComment={(movie) => setCommentMovie(movie)}
                    onView={(movie) => setViewMovie(movie)}
                    onRate={(movie) => setRateMovie(movie)}
                    gridRef={gridRef}
                    onDelete={(movie) => setConfirmDeleteMovie(movie)}
                    isFiltered={activeTab !== 'all' || ratingFilter?.type !== 'all' || topSearchQuery !== ''}
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

            {rateMovie && (
                <RatingModal
                    movie={liveRateMovie}
                    onClose={() => setRateMovie(null)}
                    onSubmit={(rating) => { setRating(rateMovie.id, rating); setRateMovie(null); }}
                />
            )}

            {confirmDeleteMovie && (
                <ConfirmModal
                    title="Delete Movie"
                    message={`Are you sure you want to remove "${confirmDeleteMovie.title}" from your library?`}
                    icon="fas fa-film"
                    confirmLabel="Delete Movie"
                    onConfirm={() => { deleteMovie(confirmDeleteMovie.id); setConfirmDeleteMovie(null); }}
                    onCancel={() => setConfirmDeleteMovie(null)}
                />
            )}

        </div>
    );
}

export default App;