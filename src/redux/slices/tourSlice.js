import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTour = createAsyncThunk('tours/fetchTour', async (id) => {
  const response = await axios.get(`http://localhost:3001/tours/${id}`);
  return response.data;
});

const tourSlice = createSlice({
  name: 'tours',
  initialState: {
    allTours: [],
    filteredTours: [],
    selectedTour: null,
    loading: false,
  },
  reducers: {
    setTours: (state, action) => {
      state.allTours = action.payload;
      state.filteredTours = action.payload;
    },
    filterTours: (state, action) => {
      const { search, category, priceRange } = action.payload;
      state.filteredTours = state.allTours.filter((tour) => {
        const matchesSearch = tour.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category ? tour.category === category : true;
        const price = parseFloat(tour.price.replace(/[^0-9]/g, '')) / 1000000;
        const matchesPrice = priceRange
          ? (priceRange === '0-10' && price <= 10) ||
            (priceRange === '10-20' && price > 10 && price <= 20) ||
            (priceRange === '20+' && price > 20)
          : true;
        return matchesSearch && matchesCategory && matchesPrice;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTour.fulfilled, (state, action) => {
        state.selectedTour = action.payload;
        state.loading = false;
      })
      .addCase(fetchTour.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setTours, filterTours } = tourSlice.actions;
export default tourSlice.reducer;