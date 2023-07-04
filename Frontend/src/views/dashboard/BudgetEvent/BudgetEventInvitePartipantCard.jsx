import { Box, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import DialogForm from 'ui-component/modal/DialogForm';

const BudgetInviteParticipantCard = ({ setAlertMessage, setIsIncomeChanged, isAddFormOpen, setIsAddFormOpen}) => {
    const theme = useTheme();
    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
        /*const { email } = values;
        const data = {
            email: email,
        };*/

/*
            const response = await BudgetEventService.inviteEventParticipant(data);
*/
        const response = {
            statm : 201,
        };
        if (response.statm === 201) {
            setStatus({ success: true });
            setSubmitting(false);
            setIsAddFormOpen(false);
            setAlertMessage({ open: true, type: 'success', message: 'Une Invitation Mail sera envoyée au User si le mail existe' });
            setIsIncomeChanged(true);
        } else {
            setStatus({ success: false });
            setErrors({ submit: response.data.message });
            setSubmitting(false);
            setAlertMessage({ open: true, type: 'error', message: response.data.message });
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    submit: null
                }}
                onSubmit={handleSubmit}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isSubmitting }) => (
                    <DialogForm
                        title='Inviter un utilisateur'
                        isOpen={isAddFormOpen}
                        setIsOpen={setIsAddFormOpen}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                    >
                        <FormControl
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-participant-name">Email d&apos;utilisateur</InputLabel>
                            <OutlinedInput
                                id="outlined-participant-name"
                                type="text"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email d&apos;utilisateur"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email">
                                    {errors.email}
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
