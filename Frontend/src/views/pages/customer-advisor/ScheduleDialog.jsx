import { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { meetingService } from 'service/meetingService';

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
        setAlertMessage('Planning mis à jour avec succès.');
        handleClose();
      } else {
        setAlertMessage('Erreur lors de la sauvegarde des données de planification.');
      }
    } catch (error) {
      setAlertMessage('Erreur lors de la sauvegarde des données de planification.');
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Schedule</DialogTitle>
      {!isLoading && (
        <>
          <DialogContent>
            {scheduleData.map((schedule) => (
              <div key={schedule.id}>
                <span>{schedule.dayOfWeek}: </span>
                <TextField
                  label="Start Time"
                  value={schedule.startTime || ''}
                  onChange={handleChangeTime(schedule.dayOfWeek, 'startTime')}
                />
                <TextField label="End Time" value={schedule.endTime || ''} onChange={handleChangeTime(schedule.dayOfWeek, 'endTime')} />
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} color="primary">
              Save
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
