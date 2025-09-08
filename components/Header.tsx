'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Container,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import Image from 'next/image';
import { FilterState, TEXTS } from '../lib/mock';

interface HeaderProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function Header({ filters, onFiltersChange }: HeaderProps) {
  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    onFiltersChange({
      ...filters,
      timeRange: event.target.value as FilterState['timeRange'],
    });
  };

  const handleComparisonChange = (event: SelectChangeEvent<string>) => {
    onFiltersChange({
      ...filters,
      comparison: event.target.value as FilterState['comparison'],
    });
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'primary.main',
        boxShadow: 4,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2 } }}>
        <Toolbar 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            py: { xs: 1, sm: 0 },
            gap: { xs: 2, sm: 0 },
            minHeight: { xs: 'auto', sm: 64 },
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              order: { xs: 1, sm: 1 },
            }}
          >
            <Image
              src="/brand.png"
              alt={TEXTS.header.logo_alt}
              width={180}
              height={48}
              style={{
                height: 'auto',
                maxHeight: '48px',
              }}
            />
          </Box>

          {/* Filter Controls */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              order: { xs: 2, sm: 2 },
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              width: { xs: '100%', sm: 'auto' },
              justifyContent: { xs: 'flex-start', sm: 'flex-end' },
            }}
          >
            {/* Time Range Filter */}
            <FormControl 
              size="small"
              sx={{
                minWidth: 140,
                flex: { xs: '1 1 auto', sm: '0 0 auto' },
              }}
            >
              <Select
                value={filters.timeRange}
                onChange={handleTimeRangeChange}
                IconComponent={KeyboardArrowDown}
                aria-label={TEXTS.header.time_filter_label}
                sx={{
                  bgcolor: 'white',
                  borderRadius: 999,
                  px: 1.5,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              >
                <MenuItem value="Last week">Last week</MenuItem>
                <MenuItem value="Last month">Last month</MenuItem>
                <MenuItem value="Last 3 months">Last 3 months</MenuItem>
                <MenuItem value="YTD">YTD</MenuItem>
              </Select>
            </FormControl>

            {/* Comparison Filter */}
            <FormControl 
              size="small"
              sx={{
                minWidth: 140,
                flex: { xs: '1 1 auto', sm: '0 0 auto' },
              }}
            >
              <Select
                value={filters.comparison}
                onChange={handleComparisonChange}
                IconComponent={KeyboardArrowDown}
                aria-label={TEXTS.header.comparison_filter_label}
                sx={{
                  bgcolor: 'white',
                  borderRadius: 999,
                  px: 1.5,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              >
                <MenuItem value="Island avg">Island avg</MenuItem>
                <MenuItem value="National avg">National avg</MenuItem>
                <MenuItem value="Previous period">Previous period</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}