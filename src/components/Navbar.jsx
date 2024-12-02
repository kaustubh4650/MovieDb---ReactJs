import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search/${searchQuery}`);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    MovieDb
                </Link>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link">
                        Popular
                    </Link>
                    <Link to="/top-rated" className="navbar-link">
                        Top Rated
                    </Link>
                    <Link to="/upcoming" className="navbar-link">
                        Upcoming
                    </Link>
                </div>
                <div className="navbar-search">
                    <input
                        type="text"
                        placeholder="Movie Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
