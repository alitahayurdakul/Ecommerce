import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import reducers from '../../store/reducers';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import Login from './Login';

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

const MockLogin = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
};

const getByTest = (obj) => {
    obj.forEach(o => {
        let element = screen.getByTestId(o.id);
        fireEvent.change(element, { target: { value: o.value } });
    })
    const button = screen.getByRole("button");
        fireEvent.click(button);
}

describe("Login", () => {

    beforeEach(() => {
        jest.mock("../../__mocks__/axios")
    });

    it("Login is not successful, error message is exist", async () => {
        render(
            <MockLogin />
        )
        getByTest([{
            id: "username",
            value: "a"
        },
        {
            id: "password",
            value: "b"
        }])

        waitFor(() => {
            const errorMessage = screen.findByTestId("errorMessage");
            expect(errorMessage).toBeInTheDocument()
        })

    })
})