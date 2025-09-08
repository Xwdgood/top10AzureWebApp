'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Header } from '../../components/Header';
import { Banners } from '../../components/Banners';
import { KpiGrid } from '../../components/KpiGrid';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import { FilterState, getMockKpiData } from '../../lib/mock';

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    timeRange: 'Last month',
    comparison: 'Island avg',
  });

  const kpiData = getMockKpiData(filters);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Header filters={filters} onFiltersChange={setFilters} />
      
      <Box sx={{ py: { xs: 2, md: 3 } }}>
        <Banners />
        <KpiGrid data={kpiData} filters={filters} />
      </Box>
      
      <MobileBottomNav />
    </Box>
  );
}