import { createSlice } from "@reduxjs/toolkit";

// Create a slice for managing user data
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    // Initial state tries to load userData from localStorage or sets it to null if not present
    userData: JSON.parse(localStorage.getItem("userData")) || null,
  },
  reducers: {
    // Reducer to set userData in the state
    userDataReducer: (state, action) => {
      // Update userData in the state with the payload
      state.userData = action.payload;
      // Also store the updated userData in localStorage to persist it
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each reducer function
export const { userDataReducer } = counterSlice.actions;

// Export the reducer to be used in the store
export default counterSlice.reducer;
