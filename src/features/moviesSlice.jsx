import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async ({ page, type }, { rejectWithValue }) => {
        if (!page || !type) {

            return rejectWithValue('Page or type is undefined');
        }
        try {
            const response = await axios.get(
                `${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const searchMovies = createAsyncThunk(
    'movies/searchMovies',
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
            );
            return response.data.results;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchMovieCast = createAsyncThunk(
    'movies/fetchMovieCast',
    async (movieId) => {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
        return response.data.cast;
    }
);


export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (movieId) => {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
        return response.data;
    }
);



const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        details: null,
        cast: [],
        currentType: 'popular',
        currentPage: 1,
        totalPages: 40,
        status: 'idle',
        error: null,
    },
    reducers: {

        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setType: (state, action) => {
            state.currentType = action.payload;
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.list = action.payload.results || [];
                state.status = 'succeeded';
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.details = action.payload;
            })
            .addCase(fetchMovieCast.fulfilled, (state, action) => {
                state.cast = action.payload;
            });
    },
});


export const { setPage, setType } = moviesSlice.actions;
export default moviesSlice.reducer;
