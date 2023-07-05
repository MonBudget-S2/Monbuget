import { Box, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import debtService from 'service/debtService';
import DialogForm from 'ui-component/modal/DialogForm';

const DebtPayment = ({ setAlertMessage, setIsDebtChanged, isOpen, setIsOpen, selectedDebt }) => {
  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { amountReceived } = values;
    const res = await debtService.payDebt(selectedDebt.id, amountReceived);
    if (res.status === 200) {
      setStatus({ success: true });
      setSubmitting(false);
      setIsOpen(false);
      setAlertMessage({ open: true, type: 'success', message: 'Dette remboursée avec succès' });
      setIsDebtChanged(true);
    } else {
      setStatus({ success: false });
      setErrors({ submit: res.data.message });
      setSubmitting(false);
      setAlertMessage({ open: true, type: 'error', message: res.data.message });
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Formik
      initialValues={{
        amountReceived: ''
      }}
      onSubmit={handleSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isSubmitting }) => (
        <DialogForm
          title="Rembourser la dette"
          isOpen={isOpen || false}
          setIsOpen={setIsOpen}
          onSubmit={handleSubmit}
          handleClose={handleCancel}
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

export default DebtPayment;
