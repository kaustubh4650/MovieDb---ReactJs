import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                {movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-poster"
                    />
                ) : (
                    <div className="no-image">
                        <h2>{movie.title}</h2>
                    </div>
                )}
                <h3>{movie.title}</h3>
                <h4>Rating : {movie.vote_average && movie.vote_average.toFixed(2)}</h4>
            </div>
        </Link>
    );
};

export default MovieCard;
