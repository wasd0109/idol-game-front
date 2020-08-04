import React from 'react';
import { render, screen } from '@testing-library/react';
import Stats from './Stats';

const initialProps = {
    stats: [["name", ""], ["title", ""], ["HP", 0]],
}


let component;


describe("Stats component render correctly", () => {
    beforeEach(() => {
        component = render(<Stats {...initialProps} />)
    })
    test("Stats component render", () => {
        expect(component).toMatchSnapshot();
    })

    test.each(initialProps.stats)("Stats display skeleton before player info fetched", (expectedStat) => {

        expect(screen.getByText(String(expectedStat)).children[0].id).toEqual("skeleton")
    })
})

describe("Stats component function correctly", () => {
    const props = {
        stats: [["name", "Ken"], ["title", "Rookie"], ["HP", 25]],
    }
    test.each(props.stats)("Stats display correctly", (statName, stat) => {
        render(<Stats {...props} />)
        expect(screen.getByText(String(statName))).toBeInTheDocument();
        expect(screen.getByText(String(stat))).toBeInTheDocument();
    })
})

