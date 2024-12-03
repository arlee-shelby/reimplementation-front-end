import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TeammateReview from '../TeammateReview';

const mockStore = configureStore([]);

describe('TeammateReview', () => {
  const initialState = {
    authentication: {
      isAuthenticated: true,
      user: {
        role: 'Student'
      }
    }
  };

  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders the main component with initial state', () => {
    render(
      <Provider store={store}>
        <TeammateReview />
      </Provider>
    );

    // Check for main elements
    expect(screen.getByText('Teammate Reviews')).toBeInTheDocument();
    expect(screen.getByText('Assignment: Final Project')).toBeInTheDocument();
    expect(screen.getByText('Team: group1')).toBeInTheDocument();
    expect(screen.getByText('Toggle Question List')).toBeInTheDocument();
    expect(screen.getByText('Anonymous Mode')).toBeInTheDocument();
  });

  it('toggles between given and received reviews', () => {
    render(
      <Provider store={store}>
        <TeammateReview />
      </Provider>
    );

    // Initially should show 'received' view
    const givenButton = screen.getByText('Reviews given');
    const receivedButton = screen.getByText('Reviews received');

    fireEvent.click(givenButton);
    expect(givenButton).toHaveClass('btn-primary'); // Active button
    expect(receivedButton).toHaveClass('btn-outline-primary'); // Inactive button

    fireEvent.click(receivedButton);
    expect(receivedButton).toHaveClass('btn-primary'); // Active button
    expect(givenButton).toHaveClass('btn-outline-primary'); // Inactive button
  });

  it('toggles question list visibility', () => {
    render(
      <Provider store={store}>
        <TeammateReview />
      </Provider>
    );

    const questionToggle = screen.getByLabelText('Toggle Question List');
    
    // Questions should be visible by default
    expect(questionToggle).toBeChecked();

    fireEvent.click(questionToggle);
    expect(questionToggle).not.toBeChecked();
  });

  it('toggles anonymous mode', () => {
    render(
      <Provider store={store}>
        <TeammateReview />
      </Provider>
    );

    const anonymousToggle = screen.getByLabelText('Anonymous Mode');
    
    // Should be off by default
    expect(anonymousToggle).not.toBeChecked();

    fireEvent.click(anonymousToggle);
    expect(anonymousToggle).toBeChecked();
  });

  it('shows and hides reviews section', () => {
    render(
      <Provider store={store}>
        <TeammateReview />
      </Provider>
    );

    const showReviewsButton = screen.getByText(/Show Reviews/);
    fireEvent.click(showReviewsButton);
    
    // After clicking, button text should change
    expect(screen.getByText(/Hide Reviews/)).toBeInTheDocument();
  });

  // Edge case: Testing instructor view with different permissions
  it('handles instructor role with different permissions', () => {
    const instructorState = {
      authentication: {
        isAuthenticated: true,
        user: {
          role: 'Instructor'
        }
      }
    };
    const instructorStore = mockStore(instructorState);

    render(
      <Provider store={instructorStore}>
        <TeammateReview />
      </Provider>
    );

    // Instructor should see both review options regardless of showTeammateReviews
    expect(screen.getByText('Reviews given')).toBeInTheDocument();
    expect(screen.getByText('Reviews received')).toBeInTheDocument();

    // Additional instructor-specific elements can be tested here
    const showReviewsButton = screen.getByText(/Show Reviews/);
    fireEvent.click(showReviewsButton);
    expect(screen.getByText(/Hide Reviews/)).toBeInTheDocument();
  });
}); 