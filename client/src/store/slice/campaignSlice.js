import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  provider:{},
  champaignContract:{},
  chainId:{},
  Allchampaigns:[]
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
   },
   getCampaignEvents(state,action){
     state.Allchampaigns=action.payload
   }
  },
})

// Action creators are generated for each case reducer function
export const {getProvider,getcontract,getchainId,getCampaignEvents } = CampaignSlice.actions

export default CampaignSlice.reducer