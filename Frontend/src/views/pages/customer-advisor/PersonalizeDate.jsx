import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, FormControlLabel, Checkbox, Button, Grid } from '@mui/material';

const PersonalizeDate = ({ open, onClose, onSave, initialSettings }) => {
  const [slotSettings, setSlotSettings] = useState(initialSettings || {});

  // Simulated data from the database
  const days = [
    { "day": "lundi", "startHour": "08:00", "endHour": "17:00" },
    { "day": "mardi", "startHour": "08:00", "endHour": "17:00" },
    { "day": "mercredi", "startHour": "08:00", "endHour": "17:00" },
    { "day": "jeudi", "startHour": "08:00", "endHour": "17:00" },
    { "day": "vendredi", "startHour": "08:00", "endHour": "17:00" },
    // Add more days if needed...
  ];

  const handleCheckboxChange = (day, slot, checked) => {
    setSlotSettings((prevSettings) => ({
      ...prevSettings,
      [day]: {
        ...prevSettings[day],
        [slot]: checked
      }
    }));
  };

  // Generate 1h timeslots for a given range
  const getTimeSlots = (start, end) => {
    let startHour = parseInt(start.split(':')[0], 10);
    const endHour = parseInt(end.split(':')[0], 10);
    const slots = [];

    while (startHour < endHour) {
      slots.push(`${startHour}h - ${startHour + 1}h`);
      startHour++;
    }

    return slots;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Personnaliser les heures de travail</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {days.map(({ day, startHour, endHour }) => (
            <Grid item xs={2} key={day}>
              <FormGroup>
                <div>{day}</div>
                {getTimeSlots(startHour, endHour).map((slot) => (
                  <FormControlLabel
                    key={`${day}-${slot}`}
                    control={
                      <Checkbox
                        checked={slotSettings[day]?.[slot] || false}
                        onChange={(e) => handleCheckboxChange(day, slot, e.target.checked)}
                      />
                    }
                    label={slot}
                  />
                ))}
              </FormGroup>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onSave(slotSettings)} color="primary">
          Enregistrer
        </Button>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PersonalizeDate;
