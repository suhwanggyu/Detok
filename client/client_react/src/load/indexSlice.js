import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice ({
    name : 'index',
    initialState: {
        menu : 0
    },
    reducers : {
        changeMenu: (state, action) => {
            state.menu = action.payload;
        }
    }
});

const { actions, reducer } = slice;
export const { changeMenu } = actions;
export default slice.reducer;