import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import DialogForm from 'ui-component/modal/DialogForm';
import { getUserId } from 'store/authSlice';
import { useSelector } from 'react-redux';

import incomeService from '../../../service/incomeService';
const AddIncome = ({ setAlertMessage, setIsIncomeChanged, isAddFormOpen, setIsAddFormOpen, income = null }) => {
  const theme = useTheme();
  const isEditing = Boolean(income);
  console.log('test', income);

  const userId = useSelector(getUserId);
  console.log(userId);

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { incomeType, amountReceived, dateReceived } = values;
    const dataIncome = {
      type: incomeType,
      amount: amountReceived,
      date: dateReceived,
      userId: userId
    };

    if (!isEditing) {
      const response = await incomeService.addIncome(dataIncome);

      if (response.status === 201) {
        setStatus({ success: true });
        setSubmitting(false);
        setIsAddFormOpen(false);
        setAlertMessage({ open: true, type: 'success', message: 'Revenu ajouté avec succès' });
        setIsIncomeChanged(true);
      } else {
        setStatus({ success: false });
        setErrors({ submit: response.data.message });
        setSubmitting(false);
        setAlertMessage({ open: true, type: 'error', message: response.data.message });
      }
    } else {
      const response = await incomeService.updateIncome(income.id, dataIncome);
      if (response.status === 200) {
        setStatus({ success: true });
        setSubmitting(false);
        setIsAddFormOpen(false);
        setAlertMessage({ open: true, type: 'success', message: 'Revenu modifié avec succès' });
        setIsIncomeChanged(true);
      } else {
        setStatus({ success: false });
        setErrors({ submit: response.data.message });
        setSubmitting(false);
        setAlertMessage({ open: true, type: 'error', message: response.data.message });
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          incomeType: isEditing ? income.type : '',
          amountReceived: isEditing ? income.amount : '',
          dateReceived: isEditing ? income.date : '',
          submit: null
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isSubmitting }) => (
          <DialogForm
            title={isEditing ? 'Modifier un revenu' : 'Ajouter un revenu'}
            isOpen={isAddFormOpen}
            setIsOpen={setIsAddFormOpen}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          >
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
