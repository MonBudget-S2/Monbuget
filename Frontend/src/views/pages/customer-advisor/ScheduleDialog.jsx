import { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
import { meetingService } from 'service/meetingService';
import { Stack } from '@mui/system';

const ScheduleDialog = ({ isOpen, handleClose, setAlertMessage }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated API call to fetch schedule data
    const fetchScheduleData = async () => {
      const res = await meetingService.getSchedules();
      if (res.status === 200) {
        setScheduleData(res.data);
      }
      setIsLoading(false);
    };

    fetchScheduleData();
  }, []);

  const handleChangeTime = (dayOfWeek, field) => (event) => {
    const updatedScheduleData = scheduleData.map((schedule) => {
      if (schedule.dayOfWeek === dayOfWeek) {
        return { ...schedule, [field]: event.target.value };
      }
      return schedule;
    });

    setScheduleData(updatedScheduleData);
  };

  const handleSubmit = async () => {
    console.log('scheduleData', scheduleData);
    const updatedDays = scheduleData.filter((schedule) => {
      return (
        schedule.startTime !== null &&
        schedule.endTime !== null &&
        (schedule.startTime !== schedule.originalStartTime || schedule.endTime !== schedule.originalEndTime)
      );
    });

    const payload = {
      schedules: updatedDays.map((schedule) => ({
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime,
        endTime: schedule.endTime
      }))
    };

    try {
      // Simulated API call to save schedule data
      const res = await meetingService.updateSchedule(payload);
      if (res.status === 200) {
        setAlertMessage({ open: true, type: 'success', message: 'Données de planification enregistrées avec succès.' });
        handleClose();
      } else {
        setAlertMessage({ open: true, type: 'error', message: 'Erreur lors de la sauvegarde des données de planification.' });
      }
    } catch (error) {
      console.log('error', error);
      setAlertMessage({ open: true, type: 'error', message: 'Erreur lors de la sauvegarde des données de planification.' });
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Schedule</DialogTitle>
      {!isLoading && (
        <>
          <DialogContent>
            <Grid container spacing={2}>
              {scheduleData.map((schedule) => (
                <Grid item xs={12} key={schedule.id}>
                  <Stack direction="row" spacing={2}>
                    <Grid item xs={3}>
                      <span>{schedule.dayOfWeek}: </span>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Start Time"
                        value={schedule.startTime || ''}
                        onChange={handleChangeTime(schedule.dayOfWeek, 'startTime')}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="End Time"
                        value={schedule.endTime || ''}
                        onChange={handleChangeTime(schedule.dayOfWeek, 'endTime')}
                      />
                    </Grid>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} color="primary">
              Modifier
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ScheduleDialog;
