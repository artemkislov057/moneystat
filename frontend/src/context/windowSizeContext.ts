import React from "react";

type InitValueType = {
    windowWidth: number
}

export const WindowSizeContext = React.createContext<InitValueType>(null);