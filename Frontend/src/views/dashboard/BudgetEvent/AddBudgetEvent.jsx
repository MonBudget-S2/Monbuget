import React from 'react';
import Grid from '@mui/material/Grid';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DialogForm from 'ui-component/modal/DialogForm';

const AddBudgetEvent = ({ setAlertMessage, setIsBudgetEventChanged, isAddFormOpen, setIsAddFormOpen, budgetEvent = null }) => {
  const isEditing = Boolean({ budgetEvent });
  console.log({ setAlertMessage, setIsBudgetEventChanged, isAddFormOpen, setIsAddFormOpen });
  const handleAddBudget = async (values) => {
    console.log(values);
    const { name, date } = values;
    console.log(name);
    console.log(date);
    console.log('envoyer');
  };
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          dateStart: '',
          dateEnd: '',
          amount: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Budget Name is required'),
          dateStart: Yup.date().required('Budget date Start is required'),
          dateEnd: Yup.date().required('Budget date End is required'),
          amount: Yup.number().min(0).required('Budget Amount is required')
        })}
        onSubmit={handleAddBudget}
      >
        {({ errors, handleBlur, handleChange, isSubmitting, handleSubmit, touched, values }) => (
          <noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <DialogForm
                title={isEditing ? 'Modifier un revenu' : 'Ajouter un revenu'}
                isOpen={isAddFormOpen}
                setIsOpen={setIsAddFormOpen}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              >
                <Grid item xs={12}>
                  <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
                    <InputLabel htmlFor="outlined-budget-evenementiel-name">Nom du budget evenementiel</InputLabel>
                    <OutlinedInput
                      id="outlined-budget-evenementiel-name"
                      type="text"
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText error id="standard-weight-helper-text--name">
                        {errors.name}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <p>Période : </p>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth error={Boolean(touched.dateStart && errors.dateStart)}>
                    <InputLabel htmlFor="outlined-budget-evenementiel-dateStart">Du:</InputLabel>
                    <OutlinedInput
                      id="outlined-budget-evenementiel-dateStart"
                      type="date"
                      value={values.dateStart}
                      name="dateStart"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.dateStart && errors.dateStart && (
                      <FormHelperText error id="standard-weight-helper-text--dateStart">
                        {errors.dateStart}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth error={Boolean(touched.dateEnd && errors.dateEnd)}>
                    <InputLabel htmlFor="outlined-budget-evenementiel-dateEnd">Au:</InputLabel>
                    <OutlinedInput
                      id="outlined-budget-evenementiel-dateEnd"
                      type="date"
                      value={values.dateEnd}
                      name="dateEnd"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.dateEnd && errors.dateEnd && (
                      <FormHelperText error id="standard-weight-helper-text--date">
                        {errors.dateEnd}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={Boolean(touched.amount && errors.amount)}>
                    <InputLabel htmlFor="outlined-budget-evenementiel-amount">Montant Total du budget</InputLabel>
                    <OutlinedInput
                      id="outlined-budget-evenementiel-amount"
                      type="number"
                      value={values.amount}
                      name="amount"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.amount && errors.amount && (
                      <FormHelperText error id="standard-weight-helper-text--amount">
                        {errors.amount}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}
              </DialogForm>
            </Grid>
          </noValidate>
        )}
      </Formik>
    </>
  );
};

export default AddBudgetEvent;
