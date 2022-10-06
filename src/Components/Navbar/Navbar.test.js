import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from './Navbar';
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import reducers from '../../store/reducers';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['orderList', 'userId', 'language', 'theme'],
    blacklist: []
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

let persistor = persistStore(store);



const MockNavbar = () => {
    return (

        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </PersistGate>
        </Provider>


    )
}

describe("Navbar", () => {

    it("Brand name should be Ecommerce", async () => {
        render(
            <MockNavbar />
        );

        const element = await screen.findByTestId("navbar-brand");
        expect(element.textContent).toBe("ECommerce");
    });

    it("When click change language navbar translate is work?", async () => {
        render(
            <MockNavbar />
        );

        const element = await screen.findByTestId("language-en");
        expect(element.textContent).toBe("EN");
        fireEvent.click(element);
        const elementLogOut = await screen.findByTestId("logout");
        expect(elementLogOut.textContent).toBe("Log Out")
        expect(elementLogOut).toBeInTheDocument();
        const elementLanguageValue = await screen.findByTestId("language-tr");
        expect(elementLanguageValue.textContent).toBe("TR");       
    });

})