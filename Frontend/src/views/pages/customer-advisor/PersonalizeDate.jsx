import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, FormControlLabel, Checkbox, Button, Grid } from '@mui/material';

const PersonalizeDate = ({ open, onClose, onSave, initialSettings }) => {
  const weekdays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  const timeslots = ['9h', '10h', '11h', '14h', '15h'];

  const [slotSettings, setSlotSettings] = useState(initialSettings || {});

  const handleCheckboxChange = (day, slot, checked) => {
    setSlotSettings((prevSettings) => ({
      ...prevSettings,
      [day]: {
        ...prevSettings[day],
        [slot]: checked
      }
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Personnaliser les heures de travail</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {weekdays.map((day) => (
            <Grid item xs={2} key={day}>
              <FormGroup>
                <div>{day}</div>
                {timeslots.map((slot) => (
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
