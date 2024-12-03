import React from 'react';
import { render, screen } from '@testing-library/react';
import CompositeScore from '../CompositeScore';

describe('CompositeScore', () => {
  const mockReviews = {
    reviews: [
      { score: 4, name: 'John', comment: 'Good' },
      { score: 5, name: 'Jane', comment: 'Excellent' }
    ],
    questionNumber: '1',
    questionText: 'Test question',
    maxScore: 5
  };

  it('renders all score sections correctly', () => {
    const props = {
      reviewsGiven: [mockReviews],
      reviewsReceived: [mockReviews]
    };

    render(<CompositeScore {...props} />);

    expect(screen.getByText('Reviews given')).toBeInTheDocument();
    expect(screen.getByText('Reviews received')).toBeInTheDocument();
    expect(screen.getByText('Overall score')).toBeInTheDocument();
  });

  // Edge case: Empty reviews
  it('handles empty reviews gracefully', () => {
    const props = {
      reviewsGiven: [],
      reviewsReceived: []
    };

    render(<CompositeScore {...props} />);

    expect(screen.getByText('0.00 / 5')).toBeInTheDocument();
  });

  // Edge case: Extreme scores
  it('handles extreme scores correctly', () => {
    const extremeReviews = {
      reviews: [
        { score: 0, name: 'John', comment: 'Poor' },
        { score: 5, name: 'Jane', comment: 'Perfect' }
      ],
      questionNumber: '1',
      questionText: 'Test question',
      maxScore: 5
    };

    const props = {
      reviewsGiven: [extremeReviews],
      reviewsReceived: [extremeReviews]
    };

    render(<CompositeScore {...props} />);
    
    expect(screen.getByText('2.50 / 5')).toBeInTheDocument();
  });
});
