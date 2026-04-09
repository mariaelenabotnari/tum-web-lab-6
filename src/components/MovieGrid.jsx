import MovieCard from "./MovieCard";

function MovieGrid({ movies, toggleFavorite, gridRef }) {
    return (
        <div className="movie-grid" ref={gridRef}>
            {movies.length > 0 ? (
                movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        toggleFavorite={toggleFavorite}
                    />
                ))
            ) : (
                <div className="empty-state">
                    No movies found. Try adjusting your filters or search.
                </div>
            )}
        </div>
    );
}

export default MovieGrid;