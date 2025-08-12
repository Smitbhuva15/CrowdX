"use client"
import React from 'react'
import { ThirdwebProvider} from "thirdweb/react";

export const ThirdWebprovider = ({children}) => {
  return (
    <ThirdwebProvider>
        {children}
    </ThirdwebProvider>
  )
}
