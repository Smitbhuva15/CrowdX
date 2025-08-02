import { configureStore } from '@reduxjs/toolkit'
import campaignReducer from '@/store/slice/campaignSlice'

export const store = configureStore({
  reducer: {
     campaign: campaignReducer
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
})