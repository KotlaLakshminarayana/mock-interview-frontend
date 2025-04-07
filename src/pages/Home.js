// import React, { useState } from 'react';
// import axios from 'axios';
// import SearchForm from '../components/SearchForm';
// import ResultsList from '../components/ResultsList';

// const Home = () => {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (searchData) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/api/find-interviewers', searchData);
//       setResults(response.data.results);
//     } catch (error) {
//       console.error('Error fetching interviewers:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="home-container">
//       <h1>Find Mock Interviewers</h1>
//       <SearchForm onSubmit={handleSearch} loading={loading} />
//       <ResultsList results={results} loading={loading} />
//     </div>
//   );
// };

// export default Home;

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Alert, 
  CircularProgress, 
  Box, 
  Paper,
  Fade,
  Zoom,
  styled
} from '@mui/material';
import SearchForm from '../components/SearchForm';
import ResultsList from '../components/ResultsList';
import axios from 'axios';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  boxShadow: theme.shadows[4],
  textAlign: 'center'
}));

const AnimatedContainer = styled(Container)({
  transition: 'all 0.3s ease',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
}));

const Home = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:5000/api/find-interviewers', {
        skills: searchParams.skills,
        experienceLevel: searchParams.experienceLevel,
        matchAll: searchParams.matchAll
      });
      
      if (!response.data.results || response.data.results.length === 0) {
        setResults([]);
        setError('No interviewers found matching your criteria');
      } else {
        setResults(response.data.results);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search interviewers');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedContainer maxWidth="lg">
      <Fade in timeout={500}>
        <HeroSection>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Find Your Perfect Interviewer
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Connect with top tech professionals for mock interviews and career guidance
          </Typography>
        </HeroSection>
      </Fade>

      <Zoom in timeout={600}>
        <StyledPaper elevation={3}>
          <Typography variant="h5" gutterBottom sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            mb: 3
          }}>
            Refine Your Search
          </Typography>
          <SearchForm onSubmit={handleSearch} loading={loading} />
        </StyledPaper>
      </Zoom>

      {error && (
        <Fade in timeout={300}>
          <Alert 
            severity="error" 
            sx={{ 
              my: 3,
              borderRadius: '8px',
              boxShadow: 1
            }}
          >
            {error}
          </Alert>
        </Fade>
      )}
      
      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          my: 6,
          py: 4
        }}>
          <CircularProgress 
            size={60} 
            thickness={4}
            sx={{ 
              color: 'primary.main',
              animationDuration: '800ms' 
            }} 
          />
        </Box>
      ) : (
        <Fade in timeout={500}>
          <Box sx={{ mt: 4 }}>
            {results.length > 0 && (
              <Typography variant="h5" gutterBottom sx={{ 
                fontWeight: 600,
                mb: 3,
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '8px' }}>👨‍💻</span>
                {results.length} Interviewers Found
              </Typography>
            )}
            <ResultsList results={results} />
          </Box>
        </Fade>
      )}
    </AnimatedContainer>
  );
};

export default Home;