import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  provider: {},
  campaignContract: {},
  chainId: {},
  Allcampaigns: [],
  Allorders: [],
  Allwithdraws:[],
  donations:[]
}

export const CampaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    getProvider(state, action) {
      state.provider = action.payload;
    },
    getcontract(state, action) {
      state.campaignContract = action.payload;
    },
    getchainId(state, action) {
      state.chainId = action.payload;
    },
    getCampaignEvents(state, action) {
      state.Allcampaigns = action.payload
    },
    getOrdersEvents(state, action) {
      state.Allorders = action.payload
    },
    getwithdrawEvents(state, action) {
      state.Allwithdraws = action.payload
    },
    getRefundDonation(state,action){
      state.donations=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getProvider, getcontract, getchainId, getCampaignEvents, getOrdersEvents,getwithdrawEvents,getRefundDonation } = CampaignSlice.actions

export default CampaignSlice.reducer