import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  provider:{},
  campaignContract:{},
  chainId:{},
  Allcampaigns:[]
}

export const CampaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
   getProvider(state,action){
    state.provider=action.payload;
   },
   getcontract(state,action){
    state.campaignContract=action.payload;
   },
   getchainId(state,action){
    state.chainId=action.payload;
   },
   getCampaignEvents(state,action){
     state.Allcampaigns=action.payload
   }
  },
})

// Action creators are generated for each case reducer function
export const {getProvider,getcontract,getchainId,getCampaignEvents } = CampaignSlice.actions

export default CampaignSlice.reducer