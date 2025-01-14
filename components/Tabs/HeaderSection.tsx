import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface HeaderSectionProps {
  activeMainTab: 'today' | 'tomorrow';
  getFormattedDate: (day: 'today' | 'tomorrow') => string;
  onOpenDialog: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  activeMainTab,
  getFormattedDate,
  onOpenDialog,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
        flexWrap: 'wrap',
        padding: 2,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '18px', md: '20px' },
          }}
        >
          {activeMainTab === 'today' ? "Today's Task" : "Tomorrow's Task"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#9e9e9e',
            fontSize: { xs: '12px', md: '14px' },
          }}
        >
          {getFormattedDate(activeMainTab)}
        </Typography>
      </Box>

      <Button
        variant="text"
        onClick={onOpenDialog}
        sx={{
          backgroundColor: '#e7f3ff',
          color: '#1a73e8',
          fontWeight: 300,
          textTransform: 'none',
          borderRadius: '6px',
          padding: { xs: '6px 16px', md: '8px 20px' },
          marginTop: { xs: 1, md: 0 },
        }}
      >
        + New Task
      </Button>
    </Box>
  );
};

export default HeaderSection;
