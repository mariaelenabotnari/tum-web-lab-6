import { useState, useEffect } from 'react';

function Sidebar({ activeTab, setActiveTab, ratingFilter, setRatingFilter, isDarkMode, setIsDarkMode, setCurrentPage, onHome }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [range, setRange] = useState([1, 10]);

    const handleMinChange = (e) => {
        const val = Math.min(Number(e.target.value), range[1]);
        setRange([val, range[1]]);
        setRatingFilter({ type: 'range', min: val, max: range[1] });
        setCurrentPage(1);
    };

    const handleMaxChange = (e) => {
        const val = Math.max(Number(e.target.value), range[0]);
        setRange([range[0], val]);
        setRatingFilter({ type: 'range', min: range[0], max: val });
        setCurrentPage(1);
    };

    const handleUnrated = () => {
        setRatingFilter({ type: 'unrated' });
        setCurrentPage(1);
        setDropdownOpen(false);
    };

    const handleReset = () => {
        setRange([1, 10]);
        setRatingFilter({ type: 'all' });
        setCurrentPage(1);
    };

    const getLabel = () => {
        if (ratingFilter?.type === 'unrated') return 'Unrated only';
        if (ratingFilter?.type === 'range') {
            if (ratingFilter.min === ratingFilter.max) return `${ratingFilter.min} Stars`;
            if (ratingFilter.min !== 1 || ratingFilter.max !== 10) return `${ratingFilter.min} – ${ratingFilter.max} Stars`;
        }
        return 'All Ratings';
    };

    useEffect(() => {
        if (ratingFilter?.type === 'all' || ratingFilter === 'all') {
            setRange([1, 10]);
            setDropdownOpen(false);
        }
    }, [ratingFilter]);

    return (
        <aside className="sidebar">
            <div className="logo" onClick={onHome} style={{ cursor: 'pointer' }}>
                <i className="fas fa-video"></i> CINETRACK
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    <li className={`nav-item ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('all'); setCurrentPage(1); }}>
                        <i className="fas fa-film"></i> All Films
                    </li>
                    <li className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('favorites'); setCurrentPage(1); }}>
                        <i className="fas fa-heart"></i> Favorite Films
                    </li>
                </ul>

                <div className="sidebar-filter">
                    <label><i className="fas fa-filter"></i> Filter Rating</label>

                    <div className="filter-dropdown">
                        <button className="filter-dropdown-btn" onClick={() => setDropdownOpen(o => !o)}>
                            <span>{getLabel()}</span>
                            <i className={`fas fa-chevron-${dropdownOpen ? 'up' : 'down'}`}></i>
                        </button>

                        {dropdownOpen && (
                            <div className="filter-dropdown-panel">
                                <div className="range-label-row">
                                    {range[0] === range[1] ? (
                                        <span className="range-value-badge">{range[0]}</span>
                                    ) : (
                                        <>
                                            <span className="range-value-badge">{range[0]}</span>
                                            <span className="range-divider">to</span>
                                            <span className="range-value-badge">{range[1]}</span>
                                        </>
                                    )}
                                </div>

                                <div className="range-slider-group">
                                    <label className="range-slider-label">
                                        <i className="fas fa-arrow-down"></i> Min
                                    </label>
                                    <input
                                        type="range" min="1" max="10" step="1"
                                        value={range[0]}
                                        onChange={handleMinChange}
                                        className="rating-slider"
                                    />
                                </div>

                                <div className="range-slider-group">
                                    <label className="range-slider-label">
                                        <i className="fas fa-arrow-up"></i> Max
                                    </label>
                                    <input
                                        type="range" min="1" max="10" step="1"
                                        value={range[1]}
                                        onChange={handleMaxChange}
                                        className="rating-slider"
                                    />
                                </div>

                                <div className="filter-dropdown-actions">
                                    <button className="btn-secondary filter-action-btn" onClick={handleUnrated}>
                                        <i className="far fa-star"></i> Unrated
                                    </button>
                                    <button className="btn-secondary filter-action-btn" onClick={handleReset}>
                                        <i className="fas fa-rotate-left"></i> Reset
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
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