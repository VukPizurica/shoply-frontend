import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    categories: [],
    filteredPosts: [],
    activeCategory: '',
    page: 1,
    totalPages: 1,
    rerenderFilters: false,
    filters: { priceMin: 0, priceMax: 1000 },
    timeChanged: false,
    timeMode: false
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload
        },
        addCategories(state, action) {
            state.posts = action.payload
        },
        setFilteredPosts(state, action) {
            state.totalPages = action.payload.length
            state.filteredPosts = action.payload
        }, setCategory(state, action) {
            state.activeCategory = action.payload;
        }, setTotalPages(state, action) {
            state.totalPages = action.payload
        }, setActivePage(state, action) {
            state.page = action.payload
        }, setTimeChanged(state, action) {
            state.timeChanged = action.payload
        }, setTimeMode(state, action) {
            state.timeMode = action.payload
        },
        setFilters(state, action) {
            state.filters = action.payload
        },
        setRerenderFilters(state, action) {
            state.rerenderFilters = action.payload
        }, filter(state, action) {

            let filters = action.payload

            if (filters === undefined) {
                filters = { priceMin: state.filters.priceMin, priceMax: state.filters.priceMax, category: state.activeCategory }
            }
            if (filters.priceMin === undefined || filters.priceMin === '') {
                filters.priceMin = state.filters.priceMin;
            }
            if (filters.priceMax === undefined || filters.priceMax === '') {
                filters.priceMax = state.filters.priceMax;
            }

            if (filters.category === undefined) {
                filters.category = state.activeCategory;
            }

            const filteredPosts = state.posts.filter(post => post.price > filters.priceMin && post.price < filters.priceMax && post.category.includes(state.activeCategory))
            state.filteredPosts = filteredPosts

        }
    }
});


export const postActions = postSlice.actions;
export default postSlice
