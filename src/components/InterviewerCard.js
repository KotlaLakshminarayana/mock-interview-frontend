// import React from 'react';
// import { 
//   Card, 
//   CardContent, 
//   Typography, 
//   Chip, 
//   Button, 
//   Avatar, 
//   Box,
//   Stack
// } from '@mui/material';

// const InterviewerCard = ({ interviewer }) => {
//   return (
//     <Card sx={{ mb: 3 }}>
//       <CardContent>
//         <Box display="flex" alignItems="center" mb={2}>
//           <Avatar 
//             src={interviewer.image} 
//             alt={interviewer.name}
//             sx={{ width: 56, height: 56, mr: 2 }}
//           />
//           <Box>
//             <Typography variant="h6">{interviewer.name}</Typography>
//             <Typography color="textSecondary">
//               {interviewer.title} at {interviewer.company}
//             </Typography>
//           </Box>
//         </Box>
        
//         <Typography variant="body2" gutterBottom>
//           <strong>Experience:</strong> {interviewer.experience} years
//         </Typography>
        
//         <Typography variant="body2" gutterBottom>
//           <strong>Availability:</strong> {interviewer.availability?.join(', ') || 'Not specified'}
//         </Typography>
        
//         <Typography variant="body2" gutterBottom>
//           <strong>Rate:</strong> ${interviewer.rate}/hour
//         </Typography>
        
//         {interviewer.match_score && (
//           <Typography variant="body2" color="primary" gutterBottom>
//             <strong>Match Score:</strong> {interviewer.match_score}%
//           </Typography>
//         )}
        
//         <Stack direction="row" spacing={1} sx={{ my: 2 }} flexWrap="wrap">
//           {interviewer.skills?.map((skill, index) => (
//             <Chip 
//               key={index} 
//               label={skill} 
//               color={
//                 interviewer.matched_skills?.includes(skill.toLowerCase()) 
//                 ? 'primary' 
//                 : 'default'
//               }
//             />
//           ))}
//         </Stack>
        
//         <Button 
//           variant="contained" 
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           Request Interview
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default InterviewerCard;

// import React from 'react';
// import { Card, CardContent, Typography, Chip, Button, Avatar, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const InterviewerCard = ({ interviewer }) => {
//   const navigate = useNavigate();

//   return (
//     <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//       <CardContent sx={{ flexGrow: 1 }}>
//         <Box display="flex" alignItems="center" mb={2}>
//           <Avatar src={interviewer.image} sx={{ width: 60, height: 60, mr: 2 }} />
//           <Box>
//             <Typography variant="h6">{interviewer.name}</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {interviewer.title}
//             </Typography>
//           </Box>
//         </Box>
        
//         <Typography variant="body2" gutterBottom>
//           <strong>{interviewer.company}</strong> • {interviewer.experience} yrs exp
//         </Typography>
        
//         <Box sx={{ my: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//           {interviewer.skills.slice(0, 3).map((skill, index) => (
//             <Chip 
//               key={index} 
//               label={skill} 
//               size="small" 
//               color="primary"
//               variant="outlined"
//             />
//           ))}
//           {interviewer.skills.length > 3 && (
//             <Chip label={`+${interviewer.skills.length - 3}`} size="small" />
//           )}
//         </Box>
        
//         <Typography variant="body2" color="text.secondary" mt={1}>
//           Available: {interviewer.availability.join(', ')}
//         </Typography>
//       </CardContent>
      
//       <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
//         <Typography variant="h6" color="primary">
//           ${interviewer.rate}/hr
//         </Typography>
//         <Button 
//           size="small" 
//           variant="contained"
//           onClick={() => navigate(`/interviewer/${interviewer.id}`)}
//         >
//           View Profile
//         </Button>
//       </Box>
//     </Card>
//   );
// };

// export default InterviewerCard;

import React from 'react';
import { Card, CardContent, Typography, Avatar, Chip, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InterviewerCard = ({ interviewer }) => {
  const navigate = useNavigate();

  // Ensure skills is always an array
  const skills = interviewer?.skills || [];
  
  return (
    <Card sx={{ mb: 3, '&:hover': { boxShadow: 6 } }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={3}>
          <Avatar 
            src={interviewer?.image_url} 
            sx={{ width: 80, height: 80 }}
            alt={interviewer?.name}
          />
          <Box flex={1}>
            <Typography variant="h6" fontWeight="bold">
              {interviewer?.name || 'No name'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {interviewer?.title || ''} {interviewer?.company ? `at ${interviewer.company}` : ''}
            </Typography>
            <Box display="flex" gap={2} mt={1}>
              <Typography variant="body2">
                <strong>Exp:</strong> {interviewer?.experience || 0} yrs
              </Typography>
              <Typography variant="body2">
                <strong>Rate:</strong> ${interviewer?.rate || 0}/hr
              </Typography>
            </Box>
          </Box>
          <Button 
            variant="contained"
            onClick={() => navigate(`/interviewer/${interviewer?.id}`)}
            disabled={!interviewer?.id}
          >
            View Profile
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Skills:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {skills.map((skill, index) => (
              <Chip 
                key={index} 
                label={skill} 
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
            {skills.length === 0 && (
              <Typography variant="caption" color="text.disabled">
                No skills listed
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InterviewerCard;