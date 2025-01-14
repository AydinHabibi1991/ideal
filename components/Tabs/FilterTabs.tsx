import React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';

interface FilterTabsProps {
  activeFilterTab: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  all: number;
  open: number;
  closed: number;
  archived: number;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilterTab,
  onChange,
  all,
  open,
  closed,
  archived,
}) => {
  const TabLabel = (label: string, count: number) => (
    <Box display="flex" alignItems="center">
      <Typography variant="caption" mr={0.3} sx={{ fontSize: '0.8rem' }}>
        {label}
      </Typography>
      <Box
        component="span"
        sx={{
          backgroundColor: 'grey',
          color: '#fff',
          borderRadius: '8px',
          padding: '1px 4px',
          fontSize: '0.6rem',
          fontWeight: 500,
          minWidth: '16px',
          textAlign: 'center',
        }}
      >
        {count}
      </Box>
    </Box>
  );

  return (
    <Tabs
      value={activeFilterTab}
      onChange={onChange}
      variant="scrollable"
      scrollButtons
      sx={{
        marginBottom: 2,
        '& .MuiTabs-indicator': { display: 'none' },
        '& .MuiTab-root': {
          fontWeight: 500,
          textTransform: 'capitalize',
          color: '#757575',
          fontSize: { xs: '0.7rem', md: '0.8rem' },
          minWidth: 'auto',
          padding: { xs: '0 8px', md: '0 10px' },
        },
        '& .Mui-selected': {
          color: '#1a73e8',
          borderBottom: '2px solid #1a73e8',
        },
      }}
    >
      <Tab label={TabLabel('All', all)} aria-label={`All ${all} items`} />
      <Tab label={TabLabel('Open', open)} aria-label={`Open ${open} items`} />
      <Tab label={TabLabel('Closed', closed)} aria-label={`Closed ${closed} items`} />
      <Tab label={TabLabel('Archived', archived)} aria-label={`Archived ${archived} items`} />
    </Tabs>
  );
};

export default FilterTabs;
