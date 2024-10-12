import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const jamaah = createSlice({
  name: "jamaah",
  initialState,
  reducers: {
    addJamaah: (state, action) => {
      state.data = action.payload;
    },
    editJamaah: (state, action) => {
      state.data = action.payload;
    },
    removeJamaah: (state) => {
      state.data = null;
    },
  },
});

export const { addJamaah, editJamaah, removeJamaah } = jamaah.actions;
export default jamaah.reducer;
