import { useState, useEffect } from 'react';

export function useMovies(initialMovies) {
    const [movies, setMovies] = useState(initialMovies);

    const toggleFavorite = (id) => {
        setMovies(prev =>
            prev.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m)
        );
    };

    const addMovie = (movie) => {
        setMovies(prev => [movie, ...prev]);
    };

    useEffect(() => {
        const saved = localStorage.getItem("movies");
        if (saved) setMovies(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("movies", JSON.stringify(movies));
    }, [movies]);

    return { movies, setMovies, toggleFavorite, addMovie };
}