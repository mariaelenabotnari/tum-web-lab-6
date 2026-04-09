import MovieCard from "./MovieCard";

function MovieGrid({ movies, toggleFavorite, onComment, onView, gridRef }) {
    return (
        <div className="movie-grid" ref={gridRef}>
            {movies.length > 0 ? (
                movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        toggleFavorite={toggleFavorite}
                        onComment={onComment}
                        onView={onView}
                    />
                ))
            ) : (
                <div className="empty-state">
                    <i className="fas fa-film"></i>
                    <h2>No movies tracked yet</h2>
                    <p>Hit <strong>Add Movie</strong> to start building your watchlist!</p>
                    <i className="fas fa-popcorn"></i>
                </div>
            )}
        </div>
    );
}

export default MovieGrid;