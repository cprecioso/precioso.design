import React from "react"

const PreviewContext = React.createContext<boolean>(false)

export const PreviewProvider = PreviewContext.Provider
export const usePreview = () => React.useContext(PreviewContext)
