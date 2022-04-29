import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    user: null,
    favorite: []
  },
  reducers: {
    getUser: (state, action) => { state.user = action.payload },
    getFav: (state, action) => {
      if (!state.favorite.includes(action.payload)) {
        state.favorite.unshift(action.payload);
        localStorage.setItem('favorite', JSON.stringify(state.favorite));
      }
    },
    delFav: (state, action) => {
      const fixed = state.favorite.filter(id => {
        return id !== action.payload;
      });
      state.favorite = fixed;
      localStorage.setItem('favorite', JSON.stringify(state.favorite));
    },
    setFav: (state, action) => {
      state.favorite = action.payload;
    }
  },
})

export const { getUser, getFav, delFav, setFav } = userSlice.actions

export default userSlice.reducer