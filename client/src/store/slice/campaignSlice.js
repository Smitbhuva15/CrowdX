import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  provider:{},
  champaignContract:{},
  chainId:{}
}

export const CampaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
   getProvider(state,action){
    state.provider=action.payload;
   },
   getcontract(state,action){
    state.champaignContract=action.payload;
   },
   getchainId(state,action){
    state.chainId=action.payload;
   }
  },
})

// Action creators are generated for each case reducer function
export const {getProvider,getcontract,getchainId  } = CampaignSlice.actions

export default CampaignSlice.reducer