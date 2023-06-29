import { Box, Button, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { getUserId } from 'store/authSlice';
import expenseService from 'service/expenseService';
import DialogForm from 'ui-component/modal/DialogForm';

const AddExpense = ({ setAlertMessage, setIsExpenseChanged, isAddFormOpen, setIsAddFormOpen, expense = null }) => {
  const theme = useTheme();
  const isEditing = Boolean(expense);

  const userId = useSelector( getUserId);

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { expenseCategory, amountSpent, dateSpent, description } = values;
    const dataExpense = {
      category: expenseCategory,
      amount: amountSpent,
      date: dateSpent,
      description: description,
      userId: userId
    };

    if (!isEditing) {
      const response = await expenseService.addExpense(dataExpense);

      if (response.status === 201) {
        setStatus({ success: true });
        setSubmitting(false);
        setIsAddFormOpen(false);
        setAlertMessage({ open: true, type: 'success', message: 'Revenu ajouté avec succès' });
        setIsExpenseChanged(true);
      } else {
        setStatus({ success: false });
        setErrors({ submit: response.data.message });
        setSubmitting(false);
        setAlertMessage({ open: true, type: 'error', message: response.data.message });
      }
    } else {
      const response = await expenseService.updateExpense(expense.id, dataExpense);
      if (response.status === 200) {
        setStatus({ success: true });
        setSubmitting(false);
        setIsAddFormOpen(false);
        setAlertMessage({ open: true, type: 'success', message: 'Revenu modifié avec succès' });
        setIsExpenseChanged(true);
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
          expenseCategory: isEditing ? expense.category : '',
          amountSpent: isEditing ? expense.amount : '',
          dateSpent: isEditing ? expense.date : '',
          description: isEditing ? expense.description : '',
          submit: null
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isSubmitting }) => (
          <DialogForm
            title={isEditing ? 'Modifier une dépense' : 'Ajouter une dépense'}
            isOpen={isAddFormOpen}
            setIsOpen={setIsAddFormOpen}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          >
            <FormControl
              fullWidth
              error={Boolean(touched.expenseCategory && errors.expenseCategory)}
              sx={{ ...theme.typography.customInput }}
            >
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
            </DialogForm>
        )}
      </Formik>
    </>
  );
};

export default AddExpense;
