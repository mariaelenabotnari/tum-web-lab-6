function MovieCard({ movie, toggleFavorite, onComment, onView }) {
    return (
        <div className="movie-card">
            <img src={movie.image} alt={movie.title} className="movie-poster" />

            <div className="movie-info">
                <div className="movie-header">
                    <h3>{movie.title}</h3>
                    <span className="rating-badge">
                        <i className="fas fa-star"></i> {movie.rating}/10
                    </span>
                </div>

                <div className="movie-meta">
                    <span className="genre">{movie.genre}</span>
                    <span className="year">{movie.year}</span>
                </div>

                <div className="comment-actions">
                    <button className="btn-secondary" onClick={() => onComment(movie)}>
                        <i className="fas fa-comment-medical"></i> Comment
                    </button>
                    <button className="btn-secondary" onClick={() => onView(movie)}>
                        <i className="fas fa-comments"></i> View ({movie.comments.length})
                    </button>
                </div>

                <button
                    className={`btn-favorite ${movie.isFavorite ? 'active' : ''}`}
                    onClick={() => toggleFavorite(movie.id)}
                >
                    <i className={movie.isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
                    {movie.isFavorite ? 'Favorited' : 'Favorite'}
                </button>
            </div>
        </div>
    );
}

export default MovieCard;