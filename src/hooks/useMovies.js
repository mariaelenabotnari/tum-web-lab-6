import React, { useState, useEffect } from 'react';

export function useMovies() {
    const [movies, setMovies] = useState(() => {
        const saved = localStorage.getItem("movies");
        return saved ? JSON.parse(saved) : [];
    });

    const toggleFavorite = (id) => {
        setMovies(prev =>
            prev.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m)
        );
    };

    const addMovie = (movie) => {
        setMovies(prev => [movie, ...prev]);
    };

    const addComment = (id, text) => {
        setMovies(prev => prev.map(m =>
            m.id === id
                ? { ...m, comments: [...m.comments, { text, date: new Date().toLocaleDateString() }] }
                : m
        ));
    };

    const editComment = (movieId, commentIndex, newText) => {
        setMovies(prev => prev.map(m =>
            m.id === movieId
                ? {
                    ...m,
                    comments: m.comments.map((c, i) =>
                        i === commentIndex ? { ...c, text: newText } : c
                    )
                }
                : m
        ));
    };

    const deleteComment = (movieId, commentIndex) => {
        setMovies(prev => prev.map(m =>
            m.id === movieId
                ? { ...m, comments: m.comments.filter((_, i) => i !== commentIndex) }
                : m
        ));
    };

    useEffect(() => {
        localStorage.setItem("movies", JSON.stringify(movies));
    }, [movies]);

    return { movies, setMovies, toggleFavorite, addMovie, addComment, editComment, deleteComment };
}