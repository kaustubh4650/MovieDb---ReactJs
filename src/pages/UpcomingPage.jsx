import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setPage, setType } from '../features/moviesSlice';
import MovieCard from '../components/MovieCard';

const UpcomingPage = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.list);
    const currentPage = useSelector((state) => state.movies.currentPage);
    const totalPages = useSelector((state) => state.movies.totalPages);
    const status = useSelector((state) => state.movies.status);
    const currentType = useSelector((state) => state.movies.currentType);


    useEffect(() => {

        if (currentType !== 'upcoming') {
            dispatch(setType('upcoming'));
        }

        dispatch(fetchMovies({ page: currentPage, type: 'upcoming' }));
    }, [dispatch, currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            dispatch(setPage(page));
        }
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error loading upcoming movies.</div>;

    return (
        <div>
            <h1>Upcoming Movies</h1>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                >
                    First
                </button>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default UpcomingPage;

