'use client';

import React from 'react';
import { Grid, Container } from '@mui/material';
import { KpiCard } from './KpiCard';
import { KpiData, FilterState } from '../lib/mock';

interface KpiGridProps {
  data: KpiData[];
  filters: FilterState;
}

export function KpiGrid({ data, filters }: KpiGridProps) {
  return (
    // Container组件：Material-UI的响应式容器组件
    // - maxWidth={false}：移除最大宽度限制，让卡片完全扩展
    // - sx={{ px: { xs: 1, sm: 2 }, pb: { xs: 10, md: 4 } }}：响应式padding设置
    //   * px: 水平padding，移动端1单位，小屏及以上2单位
    //   * pb: 底部padding，移动端10单位（为底部导航预留空间），桌面端4单位
    <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2 }, pb: { xs: 10, md: 4 } }}>
      {/* 
        Grid容器组件：Material-UI的网格系统
        自动生成的CSS类名解析：
        - MuiGrid-root: Grid组件的根类名
        - MuiGrid-container: 表示这是一个Grid容器（而非item）
        - MuiGrid-direction-xs-row: 在xs断点及以上使用row方向（水平排列）
        - MuiGrid-spacing-xs-2: 在xs断点及以上使用2单位的间距
        - mui-zo46s4-MuiGrid-root: Material-UI生成的唯一哈希类名，用于样式隔离
      */}
      <Grid 
        container  /* 声明这是Grid容器，会生成MuiGrid-container类 */
        spacing={2}  /* 设置子项间距为2单位，生成MuiGrid-spacing-xs-2类 */
        sx={{
          // 自定义样式：确保所有Grid item都使用flex布局并保持一致宽度
          '& .MuiGrid-item': {
            display: 'flex',
            width: '100%',
          },
        }}
      >
        {data.map((kpiData) => (
          <Grid 
            key={kpiData.id}
            size={12}
          >
            <KpiCard 
              data={kpiData} 
              comparison={filters.comparison}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}