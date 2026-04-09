function TopBar({ searchQuery, setSearchQuery, handleAddMovie, setCurrentPage }) {
    return (
        <header className="top-bar">
            <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Find whatever you want..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <button className="btn-primary" onClick={handleAddMovie}>
                <i className="fas fa-plus"></i> Add Movie
            </button>
        </header>
    );
}

export default TopBar;