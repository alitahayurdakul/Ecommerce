import { render, screen } from "@testing-library/react";
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import reducers from '../../store/reducers';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import HomeBody from "./HomeBody";

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

const productList = [
    {
        "id": 1, "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "rating": { "rate": 3.9, "count": 120 }
    },
    {
        "id": 2, "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "rating": { "rate": 3.9, "count": 120 }
    },
]

const MockHomeBody = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <HomeBody productList={productList}/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

describe("HomeBody", () => {
    it("Products count is true", () => {
        render(
            <MockHomeBody />
        )
        const elements = screen.getAllByTestId("card")
        expect(elements.length).toBe(2)
    });

    it("Products count is true", () => {
        render(
            <MockHomeBody />
        )
        const elements = screen.getAllByTestId("card-title")
        expect(elements[0].textContent).toBe("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
    });
})