import { Box, Button, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';

const AddExpense = ({ ...others }) => {
    const theme = useTheme();
    const handleSubmit = async ({ setErrors, setStatus, setSubmitting }) => {
        try {
            // Set the Formik status and submitting state
            setStatus({ success: true });
            setSubmitting(false);

            // Traitez les données du formulaire ici
        } catch (err) {
            console.error(err);
            // Set the Formik status, errors, and submitting state
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    expenseCategory: '',
                    amountSpent: '',
                    dateSpent: '',
                    description: '',
                    submit: null,
                }}
                onSubmit={handleSubmit}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.expenseCategory && errors.expenseCategory)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-expenseCategory">Catégorie de dépense</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-expenseCategory"
                                type="text"
                                value={values.expenseCategory}
                                name="expenseCategory"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Catégorie de dépense"
                                inputProps={{}}
                            />
                            {touched.expenseCategory && errors.expenseCategory && (
                                <FormHelperText error id="standard-weight-helper-text-expenseCategory">
                                    {errors.expenseCategory}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.amountSpent && errors.amountSpent)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-amountSpent">Montant dépensé</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amountSpent"
                                type="number"
                                value={values.amountSpent}
                                name="amountSpent"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Montant dépensé"
                                inputProps={{}}
                            />
                            {touched.amountSpent && errors.amountSpent && (
                                <FormHelperText error id="standard-weight-helper-text-amountSpent">
                                    {errors.amountSpent}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.dateSpent && errors.dateSpent)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-dateSpent">Date de dépense</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-dateSpent"
                                type="date"
                                value={values.dateSpent}
                                name="dateSpent"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Date de dépense"
                                inputProps={{}}
                            />
                            {touched.dateSpent && errors.dateSpent && (
                                <FormHelperText error id="standard-weight-helper-text-dateSpent">
                                    {errors.dateSpent}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.description && errors.description)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-description">Description</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-description"
                                type="text"
                                value={values.description}
                                name="description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Description"
                                inputProps={{}}
                            />
                            {touched.description && errors.description && (
                                <FormHelperText error id="standard-weight-helper-text-description">
                                    {errors.description}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                                Ajouter
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AddExpense;
