import React, { useEffect } from 'react';
import { useApiSearch } from '../hooks/useApiSearch';

function AddMovieModal({ onClose, onAdd, TMDB_GENRES }) {
    const { query, results, loading, search, setQuery, setResults } = useApiSearch();

    const handleAdd = (item) => {
        const movie = {
            id: Date.now(),
            title: item.title || item.name,
            rating: null,
            genre: TMDB_GENRES[item.genre_ids?.[0]] || "Unknown",
            year: (item.release_date || item.first_air_date)?.slice(0, 4) || "N/A",
            image: item.poster_path
                ? `https://image.tmdb.org/t/p/w400${item.poster_path}`
                : "https://via.placeholder.com/400x600",
            isFavorite: false,
            comments: []
        };

        onAdd(movie);
        handleClose();
    };

    const handleClose = () => {
        setQuery('');
        setResults([]);
        onClose();
    };

    // prevent scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    }, []);

    return (
        <div className="modal-backdrop" onClick={handleClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose}>×</button>

                <h3>Add Movie</h3>

                <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => search(e.target.value)}
                />

                <div className="modal-search-results">
                    {loading ? (
                        <div className="search-item">Searching...</div>
                    ) : results.length > 0 ? (
                        results.slice(0, 6).map(item => (
                            <div
                                key={item.id}
                                className="search-item"
                                onClick={() => handleAdd(item)}
                            >
                                <img
                                    src={item.poster_path
                                        ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                                        : 'https://via.placeholder.com/50x70'}
                                    alt=""
                                    width={50}
                                    height={70}
                                />
                                <div>
                                    <strong>{item.title || item.name}</strong><br/>
                                    {TMDB_GENRES[item.genre_ids?.[0]] || 'Unknown'} | {(item.release_date || item.first_air_date)?.slice(0, 4) || 'N/A'}
                                </div>
                            </div>
                        ))
                    ) : query ? (
                        <div className="search-item">No results</div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default AddMovieModal;