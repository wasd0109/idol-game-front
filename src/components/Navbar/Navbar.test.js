import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';

const initialProps = {
    onLogout: jest.fn(),
};

const navBarContent = [
    ['Home', '/'],
    ['Player List', '/players'],
    ['Battle', '/battle'],
    ['Setting', '/setting'],
    ["Logout", "/"]
]

let component;

beforeEach(() => {
    component = render(<Router><Navbar {...initialProps} /></Router>);
});

describe('Navbar component render correctly', () => {
    test('Navbar component render', () => {

        expect(component).toMatchSnapshot();
    });


    test.each(navBarContent)("Navbar render correct link", (linkName, linkRef) => {
        expect(screen.getByText(linkName)).toBeInTheDocument();
        expect(screen.getByText(linkName).parentElement.getAttribute("href")).toEqual(linkRef);
    })
});

describe("Navbar component function correctly", () => {
    test.each(navBarContent)("Navbar link redirect to correct path", (linkName, linkRef) => {
        const url = `http://localhost${linkRef}`;
        userEvent.click(screen.getByText(linkName));
        expect(document.URL).toEqual(url);
    })
    test("Clicking logout button trigger logout", () => {
        userEvent.click(screen.getByText("Logout"));
        expect(initialProps.onLogout).toBeCalled();
    })
})
