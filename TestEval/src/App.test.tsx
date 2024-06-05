//test integration

import { render, screen } from '@testing-library/react';
import App from './App';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { test,  describe } from 'vitest';


describe('App Integration Test', () => {
    test('renders App component', () => {
        render(<App />);

        // Create a new note
        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Note' } });
        fireEvent.change(screen.getByLabelText(/score/i), { target: { value: '15' } });
        fireEvent.change(screen.getByLabelText(/comment/i), { target: { value: 'This is a new note' } });
        fireEvent.click(screen.getByText(/save note/i));
    });
});