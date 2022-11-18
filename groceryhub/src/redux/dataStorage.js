import {createSlice} from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: "data",
    initialState : {
        currentLocation : "",
        latitude : "",
        longitude : "",
    },
    reducers :{
        locationFetched: (state,action) =>{
            state.currentLocation = action.payload.formatted_address;
            state.latitude = action.payload.geometry.location.lat;
            state.longitude = action.payload.geometry.location.lng;
        },
        clearlocation : (state,action) =>{
            state.currentLocation = "" ;
            state.latitude = "";
            state.longitude = "";
        },
  },
});

export const { locationFetched,clearlocation} = dataSlice.actions;
export default dataSlice.reducer;
