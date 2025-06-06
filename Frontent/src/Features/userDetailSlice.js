import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const createUser= createAsyncThunk("creatUser",async (data,{rejectWithValue})=>{
    
    // const response= await axios.post('http://localhost:1000/api'+'/auth/register',data)
    // console.log(response);
});


export const userDetail=createSlice({
    name:"userDetail",
    initialState:{
        userData:[],
        loading:false,
        error:null,
        baseURL:'http://localhost:1000/api'
    },
    reducers:{

    },
    extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
})

export default userDetail.reducer;