import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import DialogForm from 'ui-component/modal/DialogForm';
import { useState } from 'react';
import { getUserId } from 'store/authSlice';
import { useSelector } from 'react-redux';

import incomeService from '../../../service/incomeService';
import CustomAlert from 'ui-component/alert/CustomAlert';
const AddIncome = () => {
  const theme = useTheme();
  const userId = useSelector(getUserId);
  console.log(userId);

  const [message, setMessage] = useState({ open: false, type: 'success', message: 'KK' });

  const [isAddFormOpen, setIsAddFormOpen] = useState(true);

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { incomeType, amountReceived, dateReceived } = values;
    const dataIncome = {
      type: incomeType,
      amount: amountReceived,
      date: dateReceived,
      userId: userId
    };

    const response = await incomeService.addIncome(dataIncome);
    if (response.status === 201) {
      setStatus({ success: true });
      setSubmitting(false);
      setIsAddFormOpen(false);
      setMessage({ open: true, type: 'success', message: 'Revenu ajouté avec succès' });
    } else {
      setStatus({ success: false });
      setErrors({ submit: response.data.message });
      setSubmitting(false);
      setMessage({ open: true, type: 'error', message: response.data.message });
    }
  };

  return (
    <>
      <CustomAlert open={message.open} message={message.message} type={message.type} setMessage={setMessage} />
      <Formik
        initialValues={{
          incomeType: '',
          amountReceived: '',
          dateReceived: '',
          submit: null
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <DialogForm title="Ajouter Revenue" isOpen={isAddFormOpen} setIsOpen={setIsAddFormOpen} onSubmit={handleSubmit}>
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
                <MenuItem value="Revenus d'investissement">Revenus d&apos;investissement</MenuItem>
                <MenuItem value="Revenus locatifs">Revenus locatifs</MenuItem>
                <MenuItem value="Revenus d'entreprise">Revenus d&apos;entreprise</MenuItem>
                <MenuItem value="Revenus de retraite">Revenus de retraite</MenuItem>
                <MenuItem value="Autre">Autre</MenuItem>
              </Select>
              {touched.incomeType && errors.incomeType && (
                <FormHelperText error id="standard-weight-helper-text-incomeType">
                  {errors.incomeType}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.amountReceived && errors.amountReceived)}
              sx={{ ...theme.typography.customInput }}
            >
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
          </DialogForm>
        )}
      </Formik>
    </>
  );
};

export default AddIncome;
