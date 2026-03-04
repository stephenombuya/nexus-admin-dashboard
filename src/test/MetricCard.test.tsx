import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricCard } from '../components/Dashboard/MetricCard';
import { MetricCard as MetricCardType } from '../types';

const mockMetric: MetricCardType = {
  id: 'mrr',
  label: 'Monthly Recurring Revenue',
  value: 284750,
  change: 12.4,
  changeType: 'positive',
  prefix: '$',
  description: 'vs last month',
};

describe('MetricCard', () => {
  it('renders metric label', () => {
    render(<MetricCard metric={mockMetric} index={0} />);
    expect(screen.getByText('Monthly Recurring Revenue')).toBeInTheDocument();
  });

  it('renders formatted value with prefix', () => {
    render(<MetricCard metric={mockMetric} index={0} />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('284.8k')).toBeInTheDocument();
  });

  it('renders positive change indicator', () => {
    render(<MetricCard metric={mockMetric} index={0} />);
    expect(screen.getByText('+12.4%')).toBeInTheDocument();
  });

  it('has correct aria label', () => {
    render(<MetricCard metric={mockMetric} index={0} />);
    expect(screen.getByRole('article', { name: 'Monthly Recurring Revenue' })).toBeInTheDocument();
  });
});

describe('MetricCard - negative change', () => {
  const negativeMetric: MetricCardType = {
    ...mockMetric,
    id: 'churn_rate',
    label: 'Churn Rate',
    value: 2.4,
    change: -0.3,
    changeType: 'positive', // positive because lower churn is good
    suffix: '%',
  };

  it('renders negative change with - prefix', () => {
    render(<MetricCard metric={negativeMetric} index={0} />);
    expect(screen.getByText('-0.3pp')).toBeInTheDocument();
  });
});
