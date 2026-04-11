import React, { useState, useRef, useEffect } from 'react';

function TopBar({ openModal, handleTopSearch, allMovies }) {
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef(null);

    const dropdownResults = inputValue
        ? allMovies.filter(m => m.title.toLowerCase().includes(inputValue.toLowerCase()))
        : [];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setShowDropdown(e.target.value.length > 0);
        if (!e.target.value) handleTopSearch('');
    };

    const handleSearch = () => {
        handleTopSearch(inputValue);
        setShowDropdown(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const selectMovie = (title) => {
        setInputValue(title);
        handleTopSearch(title);
        setShowDropdown(false);
    };

    const clearSearch = () => {
        setInputValue('');
        handleTopSearch('');
        setShowDropdown(false);
    };

    return (
        <div className="top-bar">
            <div className="search-container" ref={containerRef}>
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search movies in your library..."
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                {inputValue && (
                    <button className="search-clear-btn" onClick={clearSearch}>
                        <i className="fas fa-times"></i>
                    </button>
                )}
                <button className="search-btn" onClick={handleSearch}>
                    <i className="fas fa-search"></i>
                </button>

                {showDropdown && dropdownResults.length > 0 && (
                    <div className="search-results">
                        {dropdownResults.map(movie => (
                            <div
                                key={movie.id}
                                className="search-item"
                                onClick={() => selectMovie(movie.title)}
                            >
                                <img src={movie.image} alt="" className="search-item-poster" />
                                <div className="search-item-info">
                                    <span className="search-item-title">{movie.title}</span>
                                    <span className="search-item-meta">{movie.genre} · {movie.year}</span>
                                </div>
                                {movie.rating && (
                                    <span className="search-item-rating">
                                        <i className="fas fa-star"></i> {movie.rating}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {showDropdown && inputValue && dropdownResults.length === 0 && (
                    <div className="search-results">
                        <div className="search-no-results">
                            <i className="fas fa-film"></i>
                            <span>No movies found for "<strong>{inputValue}</strong>"</span>
                        </div>
                    </div>
                )}
            </div>

            <button className="btn-primary" onClick={openModal}>
                <i className="fas fa-plus"></i> Add Movie
            </button>
        </div>
    );
}

export default TopBar;