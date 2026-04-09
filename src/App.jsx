import React, { useState } from 'react';
import './style.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';
import AddMovieModal from './components/AddMovieModal';
import { useMovies } from './hooks/useMovies';
import { TMDB_GENRES } from './constants/tmdbGenres';

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

function App() {
    const { movies, toggleFavorite, addMovie } = useMovies(initialMovies);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [topSearchQuery, setTopSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 6;


    const filteredMovies = movies.filter(m =>
        m.title.toLowerCase().includes(topSearchQuery.toLowerCase())
    );

    const indexOfLast = currentPage * moviesPerPage;
    const indexOfFirst = indexOfLast - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    return (
        <div className="dashboard-container">
            <Sidebar />

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