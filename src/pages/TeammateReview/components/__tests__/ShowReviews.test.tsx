import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ShowReviews from '../ShowReviews';

const mockStore = configureStore([]);

describe('ShowReviews', () => {
  const store = mockStore({
    authentication: {
      isAuthenticated: true,
      user: { role: 'Student' }
    }
  });

  const mockData = [
    {
      questionNumber: '1',
      questionText: 'Test Question 1',
      reviews: [
        { score: 4, name: 'John', comment: 'Good work' },
        { score: 5, name: 'Jane', comment: 'Excellent effort' }
      ],
      maxScore: 5
    }
  ];

  it('renders reviews correctly', () => {
    render(
      <Provider store={store}>
        <ShowReviews data={mockData} isAnonymous={false} />
      </Provider>
    );

    expect(screen.getByText(/Test Question 1/)).toBeInTheDocument();
    expect(screen.getByText('Good work')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  // Edge case: Empty reviews
  it('handles empty reviews gracefully', () => {
    render(
      <Provider store={store}>
        <ShowReviews data={[]} isAnonymous={false} />
      </Provider>
    );

    expect(screen.getByText('No reviews available')).toBeInTheDocument();
  });

  // Edge case: Anonymous mode with comments
  it('shows anonymous names but preserves comments', () => {
    render(
      <Provider store={store}>
        <ShowReviews data={mockData} isAnonymous={true} />
      </Provider>
    );

    expect(screen.queryByText('John')).not.toBeInTheDocument();
    expect(screen.getByText('Review 1')).toBeInTheDocument();
    expect(screen.getByText('Good work')).toBeInTheDocument();
  });
}); 