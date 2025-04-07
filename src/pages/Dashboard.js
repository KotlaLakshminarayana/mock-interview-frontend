import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Dashboard
      </Typography>
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1">
          Interview history and saved interviewers will appear here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;