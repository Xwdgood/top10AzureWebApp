'use client';

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  DragHandle,
} from '@mui/icons-material';
import { LineChart } from '@mui/x-charts/LineChart';
import { KpiData, getComparisonData, FilterState, TEXTS } from '../lib/mock';
import { COLORS } from '../theme';

interface KpiCardProps {
  data: KpiData;
  comparison: FilterState['comparison'];
}

export function KpiCard({ data, comparison }: KpiCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isHovered, setIsHovered] = useState(false);

  const comparisonData = getComparisonData(data, comparison);

  const getTrendIcon = (trend: 'up' | 'down' | 'equal') => {
    switch (trend) {
      case 'up':
        return <KeyboardArrowUp sx={{ color: '#4CAF50', fontSize: 32, fontWeight: 700 }} />;
      case 'down':
        return <KeyboardArrowDown sx={{ color: '#F44336', fontSize: 32, fontWeight: 700 }} />;
      case 'equal':
        return <DragHandle sx={{ color: '#4CAF50', fontSize: 32, fontWeight: 700 }} />;
    }
  };

  const formatValue = (value: number): string => {
    if (data.unit === '/5') {
      return value.toFixed(1);
    }
    return Math.round(value).toString();
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        bgcolor: 'info.main',
        p: { xs: 2, md: 3 },
        width: '100%',
        minWidth: 0,
        flex: 1,
        transition: 'elevation 0.3s ease-in-out',
        elevation: isHovered ? 8 : 2,
        borderRadius: 2,
      }}
    >
      {/* Header */}
      <CardHeader
        title={data.title}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          textAlign: 'center',
          mx: { xs: -2, md: -3 },
          mt: { xs: -2, md: -3 },
          mb: { xs: 2, md: 3 },
          borderRadius: '16px 16px 0 0',
          '& .MuiCardHeader-title': {
            fontSize: { xs: '0.875rem', md: '1rem' },
            fontWeight: 600,
            lineHeight: 1.2,
          },
        }}
      />

      {/* Content - Three Column Layout */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'stretch' },
          gap: { xs: 3, md: 2 },
        }}
      >
        {/* Left Column - Main Value */}
        <Box
          sx={{
            flex: { xs: 'none', md: '0 0 20%' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            order: { xs: 1, md: 1 },
          }}
        >
          <Typography
            variant="h2"
            aria-label={`${data.title} ${data.currentValue}${data.unit || ''}`}
            sx={{
              fontSize: { xs: '3.5rem', md: '4.5rem' },
              fontWeight: 700,
              color: 'primary.main',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            {formatValue(data.currentValue)}
            {data.unit && (
              <Typography
                component="span"
                variant="h5"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  color: 'text.secondary',
                  ml: 0.5,
                }}
              >
                {data.unit}
              </Typography>
            )}
          </Typography>
        </Box>

        {/* Middle Column - Chart */}
        <Box
          sx={{
            flex: { xs: 'none', md: '1 1 0' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            order: { xs: 3, md: 2 },
            width: { xs: '100%', md: 'auto' },
            minHeight: { xs: 140, md: 190 },
            minWidth: 0,
          }}
        >
          <LineChart
            xAxis={[{
              data: data.chartData.current.map((_, index) => index),
              scaleType: 'linear' as const,
              hideTooltip: false,
            }]}
            yAxis={[{
              min: data.yAxisRange[0],
              max: data.yAxisRange[1],
            }]}
            series={[
              {
                data: data.chartData.current,
                color: theme.palette.primary.main,
                curve: 'linear' as const,
                showMark: true,
              },
              {
                data: data.chartData.comparison,
                color: COLORS.bannerGreen,
                curve: 'linear' as const,
                showMark: true,
              },
            ]}
            width={isMobile ? 300 : 500}
            height={isMobile ? 140 : 190}
            grid={{ horizontal: true, vertical: false }}
            slotProps={{
              legend: { position: { vertical: 'top', horizontal: 'start' } },
            }}
            sx={{
              '& .MuiChartsGrid-line': {
                stroke: theme.palette.grey[300],
                strokeWidth: 1,
              },
            }}
          />
        </Box>

        {/* Right Column - Comparison Data */}
        <Box
          sx={{
            flex: { xs: 'none', md: '0 0 20%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', md: 'center' },
            gap: 4,
            order: { xs: 2, md: 3 },
            textAlign: 'center',
            px: 2,
          }}
        >
          {comparisonData.map((item, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                minWidth: 120,
              }}
            >
              {/* Number with Arrow on Left */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {getTrendIcon(item.trend)}
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 700,
                    color: '#666',
                    lineHeight: 1,
                  }}
                >
                  {formatValue(item.value)}
                  {data.unit && (
                    <Typography
                      component="span"
                      sx={{
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        color: '#666',
                        ml: 0.25,
                      }}
                    >
                      {data.unit}
                    </Typography>
                  )}
                </Typography>
              </Box>
              
              {/* Small Label */}
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  color: '#888',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  textAlign: 'center',
                  maxWidth: 80,
                  mt: 0.5,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
}