import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export default function Investments() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Investments
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>
          Investment tracking and management features coming soon.
        </Typography>
      </Paper>
    </Box>
  );
}
