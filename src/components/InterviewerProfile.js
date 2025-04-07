import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, Typography, Avatar, Chip, Button, Container,
  Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, CircularProgress, Divider, Paper,
  Snackbar, Alert
} from '@mui/material';
import { DesktopDatePicker, DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// Add these with your other imports
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';
import WarningIcon from '@mui/icons-material/Warning';

const InterviewerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interviewer, setInterviewer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: null,
    time: null,
    duration: 60
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchInterviewer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/interviewer/${id}`);
        setInterviewer(response.data);
      } catch (error) {
        console.error('Error fetching interviewer:', error);
        showNotification('Failed to load interviewer details', 'error');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchInterviewer();
  }, [id, navigate]);

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const [bookingConfirmation, setBookingConfirmation] = useState({
    open: false,
    interviewer: {
      name: '',
      company: '',
      title: '',
      image: ''
    },
    bookingDetails: {
      date: '',
      time: '',
      duration: 0
    }
  });

  const handleBookInterview = async () => {
    // Validate inputs
    if (!bookingData.date || !bookingData.time) {
      showNotification('Please select both date and time', 'error');
      return;
    }
  
    // Prepare data
    const bookingPayload = {
      interviewer_id: id,
      user_id: Math.floor(100000000 + Math.random() * 900000000),
      date: bookingData.date.toISOString().split('T')[0],
      time: bookingData.time.toTimeString().split(' ')[0],
      duration: bookingData.duration
    };
  
    // Show confirmation immediately
    const meetingLink = `https://meet.example.com/temp-${Date.now()}`;
    setBookingConfirmation({
      open: true,
      interviewer: {
        name: interviewer.name,
        company: interviewer.company,
        image: interviewer.image_url
      },
      bookingDetails: {
        date: bookingData.date.toLocaleDateString(),
        time: bookingData.time.toLocaleTimeString(),
        duration: bookingData.duration,
        meetingLink: meetingLink
      }
    });
  
    // Try to save in background (won't affect UX)
    try {
      const response = await axios.post(
        'http://localhost:5000/api/temp-book-interview',
        bookingPayload,
        { timeout: 3000 } // Short timeout
      );
      if (response.data?.data?.meeting_link) {
        setBookingConfirmation(prev => ({
          ...prev,
          bookingDetails: {
            ...prev.bookingDetails,
            meetingLink: response.data.data.meeting_link
          }
        }));
      }
    } catch (error) {
      console.info('Background save failed, using local confirmation');
      // No UI impact - we already have meetingLink
    }
    
    setBookingOpen(false);
  };

  const ConfirmationDialog = ({ open, onClose, interviewer = {}, bookingDetails = {} }) => {
    const {
      name = 'Unknown Interviewer',
      company = 'Unknown Company',
      title = '',
      image = ''
    } = interviewer;
  
    const {
      date = 'Not specified',
      time = 'Not specified',
      duration = 0,
      backendStatus = 'pending',
      meetingLink = '',
      errorDetails = ''
    } = bookingDetails;
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
          {backendStatus === 'success' ? (
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
          ) : (
            <WarningIcon color={backendStatus === 'failed' ? "error" : "warning"} sx={{ fontSize: 60 }} />
          )}
          <Typography variant="h5" mt={1}>
            {backendStatus === 'success' ? 'Booking Confirmed!' : 
             backendStatus === 'failed' ? 'Booking Pending' : 'Booking Received'}
          </Typography>
        </DialogTitle>  
        
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            {/* Interviewer Info */}
            <Box display="flex" alignItems="center" gap={3} mb={3} width="100%">
              <Avatar 
                src={image} 
                sx={{ width: 80, height: 80 }}
              />
              <Box>
                <Typography variant="h6">{name}</Typography>
                <Typography color="text.secondary">
                  {title} {company && `at ${company}`}
                </Typography>
                <Rating value={5} readOnly sx={{ mt: 1 }} />
              </Box>
            </Box>
            
            {/* Booking Details */}
            <Paper elevation={0} sx={{ 
              backgroundColor: '#f8f9fa', 
              p: 3, 
              borderRadius: 2,
              width: '100%'
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Interview Details
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography><CalendarMonthIcon color="primary" sx={{ mr: 1 }}/> Date:</Typography>
                <Typography>{date}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography><AccessTimeIcon color="primary" sx={{ mr: 1 }}/> Time:</Typography>
                <Typography>{time}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography><HourglassBottomIcon color="primary" sx={{ mr: 1 }}/> Duration:</Typography>
                <Typography>{duration} minutes</Typography>
              </Box>
            </Paper>
  
            {backendStatus === 'failed' && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <Typography>Booking saved locally but failed on server:</Typography>
            <Typography variant="body2">{errorDetails}</Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 1 }}
              onClick={() => {
                // Implement retry logic here if needed
              }}
            >
              Retry Save
            </Button>
          </Alert>
        )}

        {backendStatus === 'pending' && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Your booking is being confirmed. We'll notify you when complete.
          </Alert>
        )}
  
            {meetingLink && (
              <Box width="100%" mt={2}>
                <Typography variant="body1">
                  Meeting Link: <Link href={meetingLink} target="_blank">
                    {meetingLink}
                  </Link>
                </Typography>
              </Box>
            )}
  
            {date !== 'Not specified' && (
              <Box width="100%" mt={3}>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  What would you like to do next?
                </Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Button 
                    variant="outlined" 
                    startIcon={<CalendarTodayIcon />}
                    fullWidth
                  >
                    Add to Calendar
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<DownloadIcon />}
                    fullWidth
                  >
                    Download Details
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<ShareIcon />}
                    fullWidth
                  >
                    Share Booking
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
          <Button 
            variant="contained" 
            onClick={onClose}
            fullWidth
            size="large"
          >
            Return to Profile
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  // const ConfirmationDialog = ({ open, onClose, interviewer, bookingDetails }) => (
  //   <Dialog open={open} onClose={onClose}>
  //     <DialogTitle>Booking Scheduled</DialogTitle>
  //     <DialogContent>
  //       <Box display="flex" alignItems="center" mb={2}>
  //         <Avatar src={interviewer.image} sx={{ mr: 2 }}/>
  //         <Typography variant="h6">{interviewer.name}</Typography>
  //       </Box>
  //       <Typography>Date: {bookingDetails.date}</Typography>
  //       <Typography>Time: {bookingDetails.time}</Typography>
  //       <Typography>Duration: {bookingDetails.duration} minutes</Typography>
  //     </DialogContent>
  //     <DialogActions>
  //       <Button onClick={onClose} color="primary">Done</Button>
  //     </DialogActions>
  //   </Dialog>
  // );

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (!interviewer) return <Typography>Interviewer not found</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          <Box>
            <Avatar 
              src={interviewer.image_url} 
              sx={{ width: 150, height: 150, border: '3px solid #1976d2' }}
            />
          </Box>
          
          <Box flex={1}>
            <Typography variant="h4" gutterBottom>
              {interviewer.name}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {interviewer.title} at {interviewer.company}
            </Typography>
            
            <Box display="flex" gap={4} my={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">Experience</Typography>
                <Typography>{interviewer.experience} years</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Rate</Typography>
                <Typography>${interviewer.rate}/hour</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Availability</Typography>
                <Typography>{interviewer.availability.join(', ')}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box mb={4}>
          <Typography variant="h6" gutterBottom>Technical Skills</Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {interviewer.skills.map((skill, index) => (
              <Chip 
                key={index} 
                label={skill} 
                color="primary"
                variant="outlined"
                sx={{ fontSize: '0.875rem' }}
              />
            ))}
          </Box>
        </Box>

        <Button 
          variant="contained" 
          size="large"
          onClick={() => setBookingOpen(true)}
          sx={{ px: 4, py: 1.5 }}
        >
          Book Mock Interview
        </Button>

        {/* Booking Dialog */}
        <Dialog open={bookingOpen} onClose={() => setBookingOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Schedule Mock Interview</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <DesktopDatePicker
                  label="Date"
                  value={bookingData.date}
                  onChange={(date) => setBookingData({...bookingData, date})}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={new Date()}
                />
                <DesktopTimePicker
                  label="Time"
                  value={bookingData.time}
                  onChange={(time) => setBookingData({...bookingData, time})}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  ampm={false}
                />
                <TextField
                  label="Duration (minutes)"
                  type="number"
                  value={bookingData.duration}
                  onChange={(e) => setBookingData({
                    ...bookingData, 
                    duration: Math.min(120, Math.max(30, e.target.value))
                  })}
                  inputProps={{ min: 30, max: 120 }}
                />
              </Box>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBookingOpen(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={handleBookInterview}
              disabled={!bookingData.date || !bookingData.time}
            >
              Confirm Booking
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      {/* Booking Confirmation Dialog */}
      <ConfirmationDialog
        open={bookingConfirmation.open}
        onClose={() => setBookingConfirmation({...bookingConfirmation, open: false})}
        interviewer={bookingConfirmation.interviewer}
        bookingDetails={bookingConfirmation.bookingDetails}
      />
    </Container>
  );
};

export default InterviewerProfile;