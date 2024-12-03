import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewToggle from '../ReviewToggle';

describe('ReviewToggle', () => {
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  it('renders both buttons when showTeammateReviews is true', () => {
    render(
      <ReviewToggle
        viewMode="given"
        onToggle={mockOnToggle}
        showTeammateReviews={true}
        isInstructor={false}
      />
    );

    expect(screen.getByText('Reviews given')).toBeInTheDocument();
    expect(screen.getByText('Reviews received')).toBeInTheDocument();
  });

  it('handles button clicks correctly', () => {
    render(
      <ReviewToggle
        viewMode="given"
        onToggle={mockOnToggle}
        showTeammateReviews={true}
        isInstructor={false}
      />
    );

    fireEvent.click(screen.getByText('Reviews received'));
    expect(mockOnToggle).toHaveBeenCalledWith('received');
  });

  // Edge case: Student without teammate review access
  it('shows only Reviews given button when student cannot see teammate reviews', () => {
    render(
      <ReviewToggle
        viewMode="given"
        onToggle={mockOnToggle}
        showTeammateReviews={false}
        isInstructor={false}
      />
    );

    expect(screen.getByText('Reviews given')).toBeInTheDocument();
    expect(screen.queryByText('Reviews received')).not.toBeInTheDocument();
  });

  // Edge case: Instructor override
  it('shows both buttons for instructor regardless of showTeammateReviews', () => {
    render(
      <ReviewToggle
        viewMode="given"
        onToggle={mockOnToggle}
        showTeammateReviews={false}
        isInstructor={true}
      />
    );

    expect(screen.getByText('Reviews given')).toBeInTheDocument();
    expect(screen.getByText('Reviews received')).toBeInTheDocument();
  });
}); 