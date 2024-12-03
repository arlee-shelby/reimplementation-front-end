import React from 'react';
import { render, screen } from '@testing-library/react';
import TeammateHeatmap from '../TeammateHeatmap';

describe('TeammateHeatmap', () => {
  const mockData = [
    {
      questionNumber: '1',
      questionText: 'Test Question 1',
      reviews: [
        { score: 4, name: 'John', comment: 'Good' },
        { score: 5, name: 'Jane', comment: 'Excellent' }
      ],
      maxScore: 5
    }
  ];

  const mockColumnAverages = [4.5, 4.5];

  it('renders heatmap with correct data', () => {
    render(
      <TeammateHeatmap
        data={mockData}
        showQuestions={true}
        isAnonymous={false}
        columnAverages={mockColumnAverages}
      />
    );

    expect(screen.getByText('Test Question 1')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  // Edge case: Anonymous mode
  it('anonymizes reviewer names when isAnonymous is true', () => {
    render(
      <TeammateHeatmap
        data={mockData}
        showQuestions={true}
        isAnonymous={true}
        columnAverages={mockColumnAverages}
      />
    );

    expect(screen.getByText('Student 100')).toBeInTheDocument();
    expect(screen.queryByText('John')).not.toBeInTheDocument();
  });

  // Edge case: Empty data
  it('handles empty data gracefully', () => {
    render(
      <TeammateHeatmap
        data={[]}
        showQuestions={true}
        isAnonymous={false}
        columnAverages={[]}
      />
    );

    expect(screen.getByText('Question No.')).toBeInTheDocument();
    expect(screen.queryByText('Review 1')).not.toBeInTheDocument();
  });
}); 