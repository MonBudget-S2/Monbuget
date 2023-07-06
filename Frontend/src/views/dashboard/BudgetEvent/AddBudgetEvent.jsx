import React from 'react';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DialogForm from 'ui-component/modal/DialogForm';
import eventService from 'service/eventService';

const AddBudgetEvent = ({ setAlertMessage, setIsBudgetEventChanged, isAddFormOpen, setIsAddFormOpen, budgetEvent = null }) => {
  const isEditing = Boolean(budgetEvent);

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { name, dateStart, dateEnd, amount } = values;
    const dataEvent = {
      name: name,
      startDate: dateStart,
      endDate: dateEnd,
      amount: amount
    };

    if (!isEditing) {
      const response = await eventService.addEvent(dataEvent);

      if (response.status === 201) {
        setStatus({ success: true });
        setSubmitting(false);
        setIsAddFormOpen(false);
        setAlertMessage({ open: true, type: 'success', message: 'Evénement ajouté avec succès' });
        setIsBudgetEventChanged(true);
      } else {
        setStatus({ success: false });
        setErrors({ submit: response.data.message });
        setSubmitting(false);
        setAlertMessage({ open: true, type: 'error', message: response.data.message });
      }
    } else {
      const response = await eventService.updateEvent(budgetEvent.id, dataEvent);
      if (response.status === 200) {
        setStatus({ success: true });
        setSubmitting(false);
        setIsAddFormOpen(false);
        setAlertMessage({ open: true, type: 'success', message: 'Evénement modifié avec succès' });
        setIsBudgetEventChanged(true);
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
          name: '',
          dateStart: '',
          dateEnd: '',
          amount: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Nom du budget evenementiel est requis'),
          dateStart: Yup.date().required('La date de debut est requise'),
          dateEnd: Yup.date().required('La date de fin est requise'),
          amount: Yup.number().min(0).required('Le montant est requis')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, isSubmitting, handleSubmit, touched, values }) => (
          <DialogForm
            title={isEditing ? 'Modifier un budget evenementiel' : 'Ajouter un budget evenementiel'}
            isOpen={isAddFormOpen}
            setIsOpen={setIsAddFormOpen}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          >
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

export default AddBudgetEvent;
