"use client"
import { Toaster } from "react-hot-toast"

const Providers = ({ children }) => {
  return (
    <>
      <Toaster location="top-right" />
      {children}
    </>
  )
}

export default Providers
