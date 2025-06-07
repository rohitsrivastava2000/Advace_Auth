import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from 'axios'


// export const createUser= createAsyncThunk("creatUser",async (data,{rejectWithValue})=>{
    
//     // const response= await axios.post('http://localhost:1000/api'+'/auth/register',data)
//     // console.log(response);
// });

export const createUser = createAsyncThunk(
  "userDetail/createUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:1000/api/user/get-userDetail', {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Request failed");
    }
  }
);
export const authentication = createAsyncThunk(
  "userDetail/authentication",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:1000/api/auth/is-auth', {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
       // force isLogin false in rejected case
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || "Request failed"
      });
    }
  }
);


export const userDetail=createSlice({
    name:"userDetail",
    initialState:{
        userData:[],
        loading:false,
        isLogin:false,
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
        state.userData = action.payload.detail;
        
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Something went wrong";
      })
      .addCase(authentication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authentication.fulfilled, (state, action) => {
        state.loading = false;        
        state.isLogin=action.payload.success;
      })
      .addCase(authentication.rejected, (state, action) => {
        state.loading = false;
        state.isLogin=false
        state.error = action.payload.message || "Something went wrong";
      });
  },
})

export default userDetail.reducer;