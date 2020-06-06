import React from 'react';
import { render } from '@testing-library/react';
import ButtonRow from '../ButtonRow';

test('renders buttons when length is 0', () => {
    const testProps = {
        isLoading: false,
        countClicked: 0
    }
    const { getByTestId } = render(<ButtonRow {...testProps} />);

    const updateButton = getByTestId('button-update');
    expect(updateButton).toBeInTheDocument();
    expect(updateButton).toHaveTextContent('Update');

    const filterButton = getByTestId('button-filter');
    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveTextContent('Filter');
});

test('renders loading on Button', () => {
    const testProps = {
        isLoading: true,
        countClicked: 0
    }
    const { getByTestId } = render(<ButtonRow {...testProps} />);

    const updateButton = getByTestId('button-update');
    expect(updateButton).toBeInTheDocument();
    expect(updateButton).toHaveTextContent('Loading...');

    const loadingSpinner = getByTestId('spinner-loading');
    expect(loadingSpinner).toBeInTheDocument();
});

test('renders aditional buttons when length is > 0', () => {
    const testProps = {
        isLoading: false,
        countClicked: 1
    }
    const { getByTestId } = render(<ButtonRow {...testProps} />);

    const resetButton = getByTestId('button-reset');
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toHaveTextContent('Reset');

    const addButton = getByTestId('button-add');
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent('Add');
});

test('renders proper count on add button', () => {
    const randomNum = Math.floor((Math.random() * 50));
    const testProps = {
        isLoading: false,
        countClicked: randomNum
    }
    const { getByTestId } = render(<ButtonRow {...testProps} />);

    const addBadge = getByTestId('badge-add');
    expect(addBadge).toBeInTheDocument();
    expect(addBadge).toHaveTextContent(randomNum.toString());
});