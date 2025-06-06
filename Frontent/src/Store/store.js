import { configureStore } from '@reduxjs/toolkit'
import  userDetail  from '../Features/userDetailSlice';

const store = configureStore({
  reducer: {
    app:userDetail
  },
})

export default store;