import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCast } from '../features/moviesSlice';

const MovieDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const details = useSelector((state) => state.movies.details);
    const cast = useSelector((state) => state.movies.cast);

    useEffect(() => {
        dispatch(fetchMovieDetails(id));
        dispatch(fetchMovieCast(id));
    }, [dispatch, id]);

    if (!details || Object.keys(details).length === 0) return <div>Loading movie details...</div>;
    if (!cast || cast.length === 0) return <div>Loading cast details...</div>;

    const backgroundImageUrl = details.backdrop_path
        ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
        : '';

    return (
        <div className="movie-details-page">
            <div className="movie-header" style={{
                backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : '',
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                padding: '20px',
                boxSizing: 'border-box',
            }}>
                <div className="movie-header-top">
                    <div className="movie-poster-container">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                            alt={details.title}
                            className="movie-poster-details"
                        />
                    </div>

                    <div className="movie-info">
                        <h3 className="movie-title">{details.title}</h3>
                        <p><strong>Rating:</strong> {details.vote_average.toFixed(2)}</p>
                        <p>{details.runtime} min {details.genres.map(genre => genre.name).join(", ")}</p>
                        <p><strong>Release Date:</strong> {details.release_date}</p>
                    </div>
                </div>


                <div className="movie-overview">
                    <strong>Overview:</strong>
                    <p>{details.overview}</p>
                </div>
            </div>

            {/* Movie Cast */}
            <div className="movie-cast">
                <h2>Cast</h2>
                <div className="cast-grid">
                    {cast.slice(0, 10).map((actor) => (
                        <div key={actor.id} className="cast-card">
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                        : 'https://via.placeholder.com/150'
                                }
                                alt={actor.name}
                                className="cast-photo"
                            />
                            <p className="cast-name">{actor.name}</p>
                            <p className="character-name">Character : {actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;


