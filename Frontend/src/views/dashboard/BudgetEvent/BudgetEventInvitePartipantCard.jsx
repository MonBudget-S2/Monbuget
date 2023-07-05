import { Box, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import DialogForm from 'ui-component/modal/DialogForm';
import eventService from '../../../service/eventService';
import { useParams } from 'react-router-dom';

const BudgetInviteParticipantCard = ({ setAlertMessage, isAddFormOpen, setIsAddFormOpen }) => {
  const theme = useTheme();
  const { id: eventId } = useParams();

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { username } = values;

    try {
      console.log(`eventId: ${eventId}, username: ${username}`);
      const response = await eventService.sendInvitation(eventId, { username: username });
      if (response.status === 201) {
        setStatus({ success: true });
        setSubmitting(false);
        setIsAddFormOpen(false);
        setAlertMessage({ open: true, type: 'success', message: 'Une Invitation Mail sera envoyée au User si le mail existe' });
      }
    } catch (error) {
      // setStatus({ success: false });
      setErrors({ submit: error.message });
      // setSubmitting(false);
      // setAlertMessage({ open: true, type: 'error', message: error.message });
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          submit: null
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isSubmitting }) => (
          <DialogForm
            title="Inviter un utilisateur"
            isOpen={isAddFormOpen}
            setIsOpen={setIsAddFormOpen}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          >
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-participant-name">Nom d&apos;utilisateur</InputLabel>
              <OutlinedInput
                id="outlined-participant-name"
                type="text"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Nom d'utilisateur"
                inputProps={{}}
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text-username">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
          </DialogForm>
        )}
      </Formik>
    </>
  );
};

export default BudgetInviteParticipantCard;
