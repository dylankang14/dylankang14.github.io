import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const getMovies = createAsyncThunk("get/movies", async () => {
  return axios.get('https://yts.mx/api/v2/list_movies.json?limit=50&minimum_rating=8&sort_by=year')
    .then(res => res.data.data.movies)
    .catch(error => console.log('Error : ' + error));
})

export const movieSlice = createSlice({
  name: 'movieData',
  initialState: {
    movies: [],
    loading: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
  }
})

export default movieSlice.reducer