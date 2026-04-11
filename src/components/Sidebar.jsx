function Sidebar({
                     activeTab,
                     setActiveTab,
                     ratingFilter,
                     setRatingFilter,
                     isDarkMode,
                     setIsDarkMode,
                     setCurrentPage
                 }) {
    return (
        <aside className="sidebar">
            <div className="logo">
                <i className="fas fa-video"></i> CINETRACK
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    <li
                        className={`nav-item ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('all'); setCurrentPage(1); }}
                    >
                        <i className="fas fa-film"></i> All Films
                    </li>

                    <li
                        className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('favorites'); setCurrentPage(1); }}
                    >
                        <i className="fas fa-heart"></i> Favorite Films
                    </li>
                </ul>

                <div className="sidebar-filter">
                    <label><i className="fas fa-filter"></i> Filter Rating</label>
                    <select
                        className="filter-select"
                        value={ratingFilter}
                        onChange={(e) => { setRatingFilter(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="all">All Ratings</option>
                        <option value="10">10 Stars</option>
                        <option value="9">9+ Stars</option>
                        <option value="8">8+ Stars</option>
                        <option value="7">7+ Stars</option>
                        <option value="6">6+ Stars</option>
                        <option value="5">5+ Stars</option>
                        <option value="4">4+ Stars</option>
                        <option value="unrated">Unrated only</option>
                    </select>
                </div>
            </nav>

            <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </aside>
    );
}

export default Sidebar;