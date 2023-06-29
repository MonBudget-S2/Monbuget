import { Box, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import DialogForm from 'ui-component/modal/DialogForm';

const SelectedDebtModal = ({ selectedDebt, setSelectedDebt, isOpen, setIsOpen }) => {
    const handleSubmit = (values, { setSubmitting }) => {
        const { amountReceived } = values;

        // Vérifier que le montant reçu est valide
        if (!amountReceived || isNaN(amountReceived) || amountReceived <= 0) {
            return;
        }
        const receivedAmount = parseFloat(amountReceived);
        const updatedRemainingAmount = selectedDebt.remainingAmount - receivedAmount;

        const updatedDebt = {
            ...selectedDebt,
            remainingAmount: updatedRemainingAmount,
        };

        setSelectedDebt(updatedDebt);

        console.log("Montant restant :", updatedRemainingAmount);

        setIsOpen(false);
        setSubmitting(false);
    };


    return (
        <Formik
            initialValues={{
                amountReceived: '',
                dateReceived: ''
            }}
            onSubmit={handleSubmit}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isSubmitting }) => (
                <DialogForm
                    title="Rembourser la dette"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                >
                    <FormControl fullWidth error={Boolean(touched.amountReceived && errors.amountReceived)}>
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

                    <FormControl fullWidth error={Boolean(touched.dateReceived && errors.dateReceived)}>
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
                </DialogForm>
            )}
        </Formik>
    );
};

export default SelectedDebtModal;
