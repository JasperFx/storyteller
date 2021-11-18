import { render, screen } from '@testing-library/react';
import App from './App';
import {Specification} from "./Model/Specifications";
import {SpecLeaf} from "./Tree";

test('render a specification node with no results', () => {
    const spec = new Specification('the spec', '1');
    const element: JSX.Element = SpecLeaf(spec);
    render (element);
    
    const span = screen.findAllByTestId('CircleOutlinedIcon');
    expect(span).toBeInTheDocument();
});
