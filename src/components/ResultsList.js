// import React from 'react';
// import InterviewerCard from './InterviewerCard';
// import { Typography, Box } from '@mui/material';

// const ResultsList = ({ results, loading }) => {
//   if (loading) {
//     return <Typography>Loading results...</Typography>;
//   }

//   if (results.length === 0) {
//     return <Typography>No results found. Try a different search.</Typography>;
//   }

//   return (
//     <Box className="results-list" sx={{ mt: 4 }}>
//       {results.map((interviewer, index) => (
//         <InterviewerCard key={index} interviewer={interviewer} />
//       ))}
//     </Box>
//   );
// };

// export default ResultsList;

// import React from 'react';
// import { Box, Typography, Grid, CircularProgress } from '@mui/material';
// import InterviewerCard from './InterviewerCard';

// const ResultsList = ({ results, loading }) => {
//   if (loading) {
//     return (
//       <Box textAlign="center" py={4}>
//         <CircularProgress />
//         <Typography mt={2}>Finding matching interviewers...</Typography>
//       </Box>
//     );
//   }

//   if (!results || results.length === 0) {
//     return (
//       <Box textAlign="center" py={4}>
//         <Typography variant="h6" color="text.secondary">
//           No interviewers match your criteria
//         </Typography>
//         <Typography variant="body1" mt={1}>
//           Try adjusting your skill searches or experience level
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box mt={4}>
//       <Typography variant="h6" gutterBottom>
//         {results.length} {results.length === 1 ? 'Interviewer' : 'Interviewers'} Found
//       </Typography>
//       <Grid container spacing={3}>
//         {results.map((interviewer) => (
//           <Grid item xs={12} sm={6} md={4} key={interviewer.id}>
//             <InterviewerCard interviewer={interviewer} />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default ResultsList;

import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import InterviewerCard from './InterviewerCard';

const ResultsList = ({ results = [], loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!results || results.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
        No interviewers found matching your criteria
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      {results.map((interviewer) => (
        <InterviewerCard 
          key={interviewer?.id || Math.random().toString(36).substring(2, 9)} 
          interviewer={interviewer || {}} 
        />
      ))}
    </Box>
  );
};

export default ResultsList;