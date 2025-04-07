// import React, { useState } from 'react';
// import { 
//   TextField, 
//   Button, 
//   Select, 
//   MenuItem, 
//   InputLabel, 
//   FormControl, 
//   CircularProgress,
//   Box
// } from '@mui/material';

// const SearchForm = ({ onSubmit, loading }) => {
//   const [skills, setSkills] = useState('');
//   const [industry, setIndustry] = useState('technology');
//   const [experienceLevel, setExperienceLevel] = useState('mid');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({
//       skills: skills.split(',').map(skill => skill.trim()),
//       industry,
//       experience_level: experienceLevel
//     });
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} className="search-form">
//       <TextField
//         label="Skills (comma separated)"
//         value={skills}
//         onChange={(e) => setSkills(e.target.value)}
//         fullWidth
//         margin="normal"
//         required
//       />
      
//       <TextField
//         label="Industry"
//         value={industry}
//         onChange={(e) => setIndustry(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
      
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Experience Level</InputLabel>
//         <Select
//           value={experienceLevel}
//           onChange={(e) => setExperienceLevel(e.target.value)}
//           label="Experience Level"
//         >
//           <MenuItem value="junior">Junior</MenuItem>
//           <MenuItem value="mid">Mid-Level</MenuItem>
//           <MenuItem value="senior">Senior</MenuItem>
//           <MenuItem value="executive">Executive</MenuItem>
//         </Select>
//       </FormControl>
      
//       <Button 
//         type="submit" 
//         variant="contained" 
//         color="primary"
//         disabled={loading}
//         startIcon={loading ? <CircularProgress size={20} /> : null}
//         sx={{ mt: 2 }}
//       >
//         {loading ? 'Searching...' : 'Find Interviewers'}
//       </Button>
//     </Box>
//   );
// };

// export default SearchForm;

import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Switch,
  Grid
} from '@mui/material';

const SearchForm = ({ onSubmit, loading }) => {
  const [formState, setFormState] = useState({
    skills: '',
    experienceLevel: '',
    matchAll: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (e) => {
    setFormState(prev => ({ ...prev, matchAll: e.target.checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const skillsArray = formState.skills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    onSubmit({
      skills: skillsArray,
      experienceLevel: formState.experienceLevel,
      matchAll: formState.matchAll
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm={6}>
          <TextField
            name="skills"
            label="Skills (comma separated)"
            value={formState.skills}
            onChange={handleInputChange}
            fullWidth
            required
            placeholder="e.g., JavaScript, React, Node.js"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Experience Level</InputLabel>
            <Select
              name="experienceLevel"
              value={formState.experienceLevel}
              onChange={handleInputChange}
              label="Experience Level"
            >
              <MenuItem value="">Any Level</MenuItem>
              <MenuItem value="junior">Junior (0-3 years)</MenuItem>
              <MenuItem value="mid">Mid (4-7 years)</MenuItem>
              <MenuItem value="senior">Senior (8+ years)</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            fullWidth
            sx={{ height: 56 }}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={formState.matchAll}
                onChange={handleToggleChange}
                color="primary"
              />
            }
            label={`Match ${formState.matchAll ? 'ALL' : 'ANY'} skills`}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchForm;