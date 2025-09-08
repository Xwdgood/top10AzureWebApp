export interface KpiData {
  id: string;
  title: string;
  currentValue: number;
  islandAverage: number;
  previousMonth: number;
  chartData: {
    current: number[];
    comparison: number[];
  };
  yAxisRange: [number, number];
  unit?: string;
}

export interface FilterState {
  timeRange: 'Last week' | 'Last month' | 'Last 3 months' | 'YTD';
  comparison: 'Island avg' | 'National avg' | 'Previous period';
}

// Mock chart data based on time range
export const generateMockChartData = (
  baseValue: number,
  comparisonValue: number,
  timeRange: string
): { current: number[]; comparison: number[] } => {
  const getDataLength = (range: string) => {
    switch (range) {
      case 'Last week': return 7;
      case 'Last month': return 30;
      case 'Last 3 months': return 90;
      case 'YTD': return 365;
      default: return 30;
    }
  };

  const length = getDataLength(timeRange);
  const current: number[] = [];
  const comparison: number[] = [];

  // Use deterministic values instead of Math.random() to avoid hydration errors
  for (let i = 0; i < length; i++) {
    // Generate realistic fluctuations around base values using deterministic seed
    const seed = (baseValue * 100 + i * 17) % 1000;
    const currentVariation = ((seed % 200) - 100) / 1000; // Range -0.1 to 0.1
    const comparisonSeed = (comparisonValue * 100 + i * 13) % 1000;
    const comparisonVariation = ((comparisonSeed % 150) - 75) / 1000; // Range -0.075 to 0.075
    
    current.push(Math.max(0, baseValue + (baseValue * currentVariation)));
    comparison.push(Math.max(0, comparisonValue + (comparisonValue * comparisonVariation)));
  }

  return { current, comparison };
};

export const getMockKpiData = (filters: FilterState): KpiData[] => {
  const baseData: Omit<KpiData, 'chartData'>[] = [
    {
      id: 'nps',
      title: 'Net promoter score (NPS)',
      currentValue: 65,
      islandAverage: 67,
      previousMonth: 63,
      yAxisRange: [20, 80],
    },
    {
      id: 'gri',
      title: 'Global review index (GRI)',
      currentValue: 76,
      islandAverage: 75,
      previousMonth: 72,
      yAxisRange: [20, 80],
    },
    {
      id: 'cleanliness',
      title: 'ReviewPro Cleanliness',
      currentValue: 4.2,
      islandAverage: 4.3,
      previousMonth: 4.1,
      yAxisRange: [0, 5],
      unit: '/5',
    },
    {
      id: 'service',
      title: 'ReviewPro Service',
      currentValue: 4.8,
      islandAverage: 4.8,
      previousMonth: 4.7,
      yAxisRange: [0, 5],
      unit: '/5',
    },
  ];

  return baseData.map(item => ({
    ...item,
    chartData: generateMockChartData(
      item.currentValue,
      filters.comparison === 'Island avg' ? item.islandAverage : item.previousMonth,
      filters.timeRange
    ),
  }));
};

export const getComparisonData = (
  kpi: KpiData,
  comparison: FilterState['comparison']
): { label: string; value: number; trend: 'up' | 'down' | 'equal' }[] => {
  const islandTrend = kpi.currentValue > kpi.islandAverage ? 'up' : 
                     kpi.currentValue < kpi.islandAverage ? 'down' : 'equal';
  const previousTrend = kpi.currentValue > kpi.previousMonth ? 'up' : 
                        kpi.currentValue < kpi.previousMonth ? 'down' : 'equal';

  return [
    {
      label: 'Island average',
      value: kpi.islandAverage,
      trend: islandTrend === 'up' ? 'down' : islandTrend === 'down' ? 'up' : 'equal',
    },
    {
      label: 'Previous month',
      value: kpi.previousMonth,
      trend: previousTrend,
    },
  ];
};

// Internationalization placeholder
export const TEXTS = {
  header: {
    logo_alt: 'TOP 10 Holiday Parks Group',
    time_filter_label: 'Time Range',
    comparison_filter_label: 'Compare To',
  },
  banners: {
    main_title: 'Ōhope Beach (Whakatane)',
    subtitle: 'Guest Experience',
  },
  navigation: {
    home: 'Home',
    reports: 'Bookings', 
    teams: 'ReviewPro',
    campaigns: 'Membership',
  },
  kpi: {
    island_avg: 'Island average',
    previous_month: 'Previous month',
  },
} as const;