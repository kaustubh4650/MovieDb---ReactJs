import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const SearchResultsPage = () => {
    const { query } = useParams();
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}&page=${currentPage}`
                );
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (err) {
                setError('Failed to fetch search results.');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query, currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            navigate(`/search/${query}?page=${page}`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Search Results for: "{query}"</h1>
            <div className="movies-grid">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <div>No movies found.</div>
                )}
            </div>

            <div className="pagination">
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                    First
                </button>

                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>

                <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                    Last
                </button>
            </div>
        </div>
    );
};

export default SearchResultsPage;
