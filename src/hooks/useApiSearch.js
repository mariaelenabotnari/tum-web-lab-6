import { useState } from 'react';

export function useApiSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = async (q) => {
        setQuery(q);
        if (!q) { setResults([]); return; }
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/multi?api_key=8cb92ee670543a9cd994410ce56fb3e1&query=${q}`
            );
            const data = await res.json();
            setResults(data.results || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { query, results, loading, search, setQuery, setResults };
}