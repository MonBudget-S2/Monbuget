import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';

const AddIncome = ({ ...others }) => {
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
                    incomeType: '',
                    amountReceived: '',
                    dateReceived: '',
                    submit: null,
                }}
                onSubmit={handleSubmit}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.incomeType && errors.incomeType)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel id="outlined-adornment-incomeType">Type de revenu</InputLabel>
                            <Select
                                labelId="outlined-adornment-incomeType"
                                id="outlined-adornment-incomeType"
                                value={values.incomeType}
                                name="incomeType"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Type de revenu"
                            >
                                <MenuItem value="">Sélectionner un type de revenu</MenuItem>
                                <MenuItem value="Salaire">Salaire</MenuItem>
                                <MenuItem value="Revenus d&apos;investissement">Revenus d&apos;investissement</MenuItem>
                                <MenuItem value="Revenus locatifs">Revenus locatifs</MenuItem>
                                <MenuItem value="Revenus d&apos;entreprise">Revenus d&apos;entreprise</MenuItem>
                                <MenuItem value="Revenus de retraite">Revenus de retraite</MenuItem>
                                <MenuItem value="Autre">Autre</MenuItem>
                            </Select>
                            {touched.incomeType && errors.incomeType && (
                                <FormHelperText error id="standard-weight-helper-text-incomeType">
                                    {errors.incomeType}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.amountReceived && errors.amountReceived)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-amountReceived">Montant reçu</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amountReceived"
                                type="number"
                                value={values.amountReceived}
                                name="amountReceived"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Montant reçu"
                                inputProps={{}}
                            />
                            {touched.amountReceived && errors.amountReceived && (
                                <FormHelperText error id="standard-weight-helper-text-amountReceived">
                                    {errors.amountReceived}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.dateReceived && errors.dateReceived)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-dateReceived">Date de réception</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-dateReceived"
                                type="date"
                                value={values.dateReceived}
                                name="dateReceived"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Date de réception"
                                inputProps={{}}
                            />
                            {touched.dateReceived && errors.dateReceived && (
                                <FormHelperText error id="standard-weight-helper-text-dateReceived">
                                    {errors.dateReceived}
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

export default AddIncome;
