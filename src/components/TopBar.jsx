import React from 'react';

function TopBar({ openModal, topSearchQuery, handleTopSearch, topSearchResults }) {
    return (
        <div className="top-bar">
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search movies in your library..."
                    value={topSearchQuery}
                    onChange={(e) => handleTopSearch(e.target.value)}
                />
                {topSearchResults.length > 0 && (
                    <div className="search-results">
                        {topSearchResults.map(movie => (
                            <div key={movie.id} className="search-item">{movie.title}</div>
                        ))}
                    </div>
                )}
            </div>

            <button className="btn-primary" onClick={openModal}>
                Add Movie
            </button>
        </div>
    );
}

export default TopBar;