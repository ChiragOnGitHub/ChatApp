import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import ChatProvider from "./Context/ChatProvider";
import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./reducer";

const store = configureStore({
    reducer:rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store = {store}>
            <BrowserRouter>
                <ChatProvider>
                    <App />
                    <Toaster/>
                </ChatProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
