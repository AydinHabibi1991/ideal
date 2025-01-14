import React from 'react';
import { Tabs, Tab } from '@mui/material';

interface DayTabsProps {
  activeMainTab: 'today' | 'tomorrow';
  onChange: (event: React.SyntheticEvent, newValue: 'today' | 'tomorrow') => void;
}

const DayTabs: React.FC<DayTabsProps> = ({ activeMainTab, onChange }) => {
  return (
    <Tabs
      value={activeMainTab}
      onChange={onChange}
      variant="fullWidth"
      sx={{
        marginBottom: 2,
        '& .MuiTabs-indicator': { backgroundColor: '#000' },
        '& .MuiTab-root': {
          fontWeight: { xs: 500, md: 600 },
          fontSize: { xs: '14px', md: '16px' },
          textTransform: 'capitalize',
          color: '#757575',
          padding: { xs: '6px 8px', md: '8px 16px' },
        },
        '& .Mui-selected': { color: '#000' },
      }}
    >
      <Tab value="today" label="Today's Task" />
      <Tab value="tomorrow" label="Tomorrow's Task" />
    </Tabs>
  );
};

export default DayTabs;
