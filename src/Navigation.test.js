import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './Navigation';

const mockupProps = {
    local: {
        localData: [],
    },
    alert: {
        alertOptions: {
            show: false
        }
    }
}

test('renders navbar', () => {
    const { getByRole } = render(<Navigation {...mockupProps} />);
    const navBar = getByRole('navigation');
    expect(navBar).toBeInTheDocument();
});

test('renders nav-links', () => {
    const { getByTestId } = render(<Navigation {...mockupProps} />);

    const logo = getByTestId('nav-link_logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveTextContent('Coronavirus Tracker');

    const liveData = getByTestId('nav-link_live-data');
    expect(liveData).toBeInTheDocument();
    expect(liveData).toHaveTextContent('Live data');

    const localData = getByTestId('nav-link_local-data');
    expect(localData).toBeInTheDocument();
    expect(localData).toHaveTextContent('Local data');

    const about = getByTestId('nav-link_about');
    expect(about).toBeInTheDocument();
    expect(about).toHaveTextContent('About');
});

test('expect badge with proper number', () => {
    const randomNum = Math.floor((Math.random() * (50 - 1) + 1));
    const randomArr = Array.apply(null, { length: randomNum }).map(Number.call, Number);
    const mockupPropsWithObjects = {
        local: {
            localData: randomArr,
        },
        alert: {
            alertOptions: {
                show: false
            }
        }
    };

    const { getByTestId } = render(<Navigation{...mockupPropsWithObjects} />);
    const countBadge = getByTestId('nav-link_local-data_badge');
    expect(countBadge).toBeInTheDocument();
    expect(countBadge).toHaveTextContent(randomNum !== 0 ? randomNum.toString() : '');
})