import React from 'react';
import { findByText, getByText, render, screen, waitFor, waitForElement, } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock'
import Profile from './Profile';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

const initialProps = {
    userID: "0",
}

let container;

beforeEach(async () => await act(async () => {
    container = render(<Profile {...initialProps} />)
}))


describe("Profile container render correctly", () => {
    test("Profile container render", async () => {
        expect(container).toMatchSnapshot();
    })
})

describe("Profile container function correctly", () => {
    test("Passing action result to Actions component", async () => {
        fetchMock.mockResponse(() => Promise.resolve(JSON.stringify("Success")));
        const button = screen.getByText("Practice")
        await act(async () => { userEvent.click(button) });
        expect(screen.getByText("Success")).toBeInTheDocument();
    })

    test("Performing action trigger stats reload", async () => {
        const check = jest.fn();
        fetchMock.mockResponse(req => {
            if (req.url === `https://idol-game.herokuapp.com/${initialProps.userID}`) {
                check();
            }
            return Promise.resolve("Success")
        })
        const button = screen.getByText("Practice")
        await act(async () => { userEvent.click(button) });
        waitFor(() => expect(check).toBeCalled())
    })
})