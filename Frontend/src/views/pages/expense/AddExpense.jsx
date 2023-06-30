import React, { useState } from 'react';
import { Box, FormControl, InputLabel, OutlinedInput, FormHelperText, Select, MenuItem } from '@mui/material';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { getUserId } from 'store/authSlice';
import expenseService from 'service/expenseService';
import DialogForm from 'ui-component/modal/DialogForm';
import categoricalBudgetService from 'service/categoricalBudgetService';
import { useEffect } from 'react';
import eventService from 'service/eventService';

const AddExpense = ({ setAlertMessage, setIsExpenseChanged, isAddFormOpen, setIsAddFormOpen, expense = null }) => {
  const theme = useTheme();
  const isEditing = Boolean(expense);
  const userId = useSelector(getUserId);

  const [selectedImage, setSelectedImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [budgetEvents, setBudgetEvents] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { expenseCategory, expenseEventBudget, amountSpent, dateSpent, description, location } = values;
    if (!expenseCategory) {
      setErrors({ expenseCategory: 'Please select a category' });
      return;
    }

    if (!amountSpent) {
      setErrors({ amountSpent: 'Please enter the amount spent' });
      return;
    }
    const dataExpense = {
      categoryId: expenseCategory,
      eventBudget: expenseEventBudget,
      amount: amountSpent,
      date: dateSpent,
      description: description,
      location: location,
      userId: userId,
      receiptImage: selectedImage // Include the selected image in the data
    };

    if (!isEditing) {
      const response = await expenseService.addExpense(dataExpense);

      if (response.status === 201) {
        setStatus({ success: true });
        setSubmitting(false);
        setIsAddFormOpen(false);
        setAlertMessage({
          open: true,
          type: 'success',
          message: 'Expense added successfully'
        });
        setIsExpenseChanged(true);
      } else {
        setStatus({ success: false });
        setErrors({ submit: response.data.message });
        setSubmitting(false);
        setAlertMessage({
          open: true,
          type: 'error',
          message: response.data.message
        });
      }
    } else {
      const response = await expenseService.updateExpense(expense.id, dataExpense);
      if (response.status === 200) {
        setStatus({ success: true });
        setSubmitting(false);
        setIsAddFormOpen(false);
        setAlertMessage({
          open: true,
          type: 'success',
          message: 'Expense updated successfully'
        });
        setIsExpenseChanged(true);
      } else {
        setStatus({ success: false });
        setErrors({ submit: response.data.message });
        setSubmitting(false);
        setAlertMessage({
          open: true,
          type: 'error',
          message: response.data.message
        });
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoricalBudgetService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchBudgetEvents = async () => {
      try {
        const response = await eventService.getEvents();
        setBudgetEvents(response.data);
      } catch (error) {
        console.error('Error fetching budget events:', error);
      }
    };

    fetchCategories();
    fetchBudgetEvents();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          expenseCategory: isEditing ? expense.category?.id : '',
          expenseBudget: isEditing ? expense.budget?.id : '',
          amountSpent: isEditing ? expense.amount : '',
          dateSpent: isEditing ? expense.date : '',
          description: isEditing ? expense.description : '',
          location: isEditing ? expense.location : '',
          recieptImage: isEditing ? expense.recieptImage : '',
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
              <Select
                id="outlined-adornment-expenseCategory"
                value={values.expenseCategory}
                name="expenseCategory"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Catégorie de dépense"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {touched.expenseCategory && errors.expenseCategory && (
                <FormHelperText error id="standard-weight-helper-text-expenseCategory">
                  {errors.expenseCategory}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.expenseEventBudget && errors.expenseEventBudget)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-expenseEventBudget">Budget Event</InputLabel>
              <Select
                id="outlined-adornment-expenseEventBudget"
                value={values.expenseEventBudget}
                name="expenseEventBudget"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Budget Event"
              >
                {budgetEvents.map((event) => (
                  <MenuItem key={event.id} value={event.id}>
                    {event.name}
                  </MenuItem>
                ))}
              </Select>
              {touched.expenseEventBudget && errors.expenseEventBudget && (
                <FormHelperText error id="standard-weight-helper-text-expenseEventBudget">
                  {errors.expenseEventBudget}
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

            <FormControl fullWidth error={Boolean(touched.location && errors.location)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-location">Lieu</InputLabel>
              <OutlinedInput
                id="outlined-adornment-location"
                type="text"
                value={values.location}
                name="location"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Lieu"
                inputProps={{}}
              />
              {touched.location && errors.location && (
                <FormHelperText error id="standard-weight-helper-text-location">
                  {errors.location}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-receiptImage">Receipt Image</InputLabel>
              <OutlinedInput
                id="outlined-adornment-receiptImage"
                type="file"
                name="receiptImage"
                onBlur={handleBlur}
                onChange={(event) => {
                  handleChange(event);
                  handleImageChange(event); // Update selectedImage state
                }}
                label="Receipt Image"
                inputProps={{}}
              />
              {selectedImage && (
                <img src={URL.createObjectURL(selectedImage)} alt="Receipt Preview" style={{ width: '100%', marginTop: '1rem' }} />
              )}
              {touched.receiptImage && errors.receiptImage && (
                <FormHelperText error id="standard-weight-helper-text-receiptImage">
                  {errors.receiptImage}
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

export default AddExpense;
