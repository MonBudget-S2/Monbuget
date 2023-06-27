import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, FormHelperText, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import DialogForm from 'ui-component/modal/DialogForm';
import { useEffect } from 'react';
import categoricalBudgetService from 'service/categoricalBudgetService';

const AddCategoricalBudget = ({ setAlertMessage, setIsBudgetChanged, isAddFormOpen, setIsAddFormOpen, budget = null }) => {
  const theme = useTheme();
  const isEditing = Boolean(budget);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState([]);

  console.log('test', isAddFormOpen, customCategory);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCustomCategory('');
  };

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { budgetName, periodStart, periodEnd, totalAllocation, customCategory, selectedCategory } = values;
    const dataBudget = {
      name: budgetName,
      startDate: periodStart,
      endDate: periodEnd,
      amount: totalAllocation,
      categoryId: selectedCategory ? selectedCategory : null,
      customCategory: customCategory ? customCategory : null
    };

    if (!isEditing) {
      const response = await categoricalBudgetService.addBudget(dataBudget);

      if (response.status === 201) {
        setStatus({ success: true });
        setSubmitting(false);
        setIsAddFormOpen(false);
        setAlertMessage({ open: true, type: 'success', message: 'Revenu ajouté avec succès' });
        setIsBudgetChanged(true);
      } else {
        setStatus({ success: false });
        setErrors({ submit: response.data.message });
        setSubmitting(false);
        setAlertMessage({ open: true, type: 'error', message: response.data.message });
      }
    } else {
      const response = await incomeService.updateBudget(income.id, dataBudget);
      if (response.status === 200) {
        setStatus({ success: true });
        setSubmitting(false);
        setIsAddFormOpen(false);
        setAlertMessage({ open: true, type: 'success', message: 'Revenu modifié avec succès' });
        setIsBudgetChanged(true);
      } else {
        setStatus({ success: false });
        setErrors({ submit: response.data.message });
        setSubmitting(false);
        setAlertMessage({ open: true, type: 'error', message: response.data.message });
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await categoricalBudgetService.getCategories();
      if (response.status === 200) {
        setCategories(response.data);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          budgetName: '',
          periodStart: '',
          periodEnd: '',
          selectedCategory: '',
          customCategory: '',
          totalAllocation: '',
          submit: null
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <DialogForm
            title={isEditing ? 'Modifier un budget' : 'Ajouter un budget'}
            isOpen={isAddFormOpen}
            setIsOpen={setIsAddFormOpen}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          >
            <FormControl fullWidth error={Boolean(touched.budgetName && errors.budgetName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-budgetName">Nom du budget</InputLabel>
              <OutlinedInput
                id="outlined-adornment-budgetName"
                type="text"
                value={values.budgetName}
                name="budgetName"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Nom du budget"
                inputProps={{}}
              />
              {touched.budgetName && errors.budgetName && (
                <FormHelperText error id="standard-weight-helper-text-budgetName">
                  {errors.budgetName}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.periodStart && errors.periodStart)} sx={{ ...theme.typography.customInput }}>
              <TextField
                id="outlined-start-date"
                label="Période - Début"
                type="date"
                name="periodStart"
                value={values.periodStart}
                onBlur={handleBlur}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
              {touched.periodStart && errors.periodStart && (
                <FormHelperText error id="standard-weight-helper-text-periodStart">
                  {errors.periodStart}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.periodEnd && errors.periodEnd)} sx={{ ...theme.typography.customInput }}>
              <TextField
                id="outlined-end-date"
                label="Période - Fin"
                type="date"
                name="periodEnd"
                value={values.periodEnd}
                onBlur={handleBlur}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
              {touched.periodEnd && errors.periodEnd && (
                <FormHelperText error id="standard-weight-helper-text-periodEnd">
                  {errors.periodEnd}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.selectedCategory && errors.selectedCategory)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel id="outlined-adornment-selectedCategory">Sélectionner une catégorie</InputLabel>
              <Select
                labelId="outlined-adornment-selectedCategory"
                id="outlined-adornment-selectedCategory"
                value={values.selectedCategory}
                name="selectedCategory"
                onBlur={handleBlur}
                onChange={(event) => {
                  handleCategoryChange(event);
                  handleChange(event);
                }}
                label="Sélectionner une catégorie"
                disabled={values.customCategory.length > 0}
              >
                <MenuItem value="">Sélectionner une catégorie</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {touched.selectedCategory && errors.selectedCategory && (
                <FormHelperText error id="standard-weight-helper-text-selectedCategory">
                  {errors.selectedCategory}
                </FormHelperText>
              )}
            </FormControl>

            {!values.selectedCategory && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    ou
                  </Typography>
                </Box>

                <FormControl
                  fullWidth
                  error={Boolean(touched.customCategory && errors.customCategory)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-customCategory">Catégorie personnalisée</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-customCategory"
                    type="text"
                    value={values.customCategory}
                    name="customCategory"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      if (!selectedCategory) {
                        setCustomCategory(event.target.value);
                        handleChange(event);
                      }
                    }}
                    label="Catégorie personnalisée"
                    inputProps={{}}
                  />
                  {touched.customCategory && errors.customCategory && (
                    <FormHelperText error id="standard-weight-helper-text-customCategory">
                      {errors.customCategory}
                    </FormHelperText>
                  )}
                </FormControl>
              </>
            )}

            <FormControl
              fullWidth
              error={Boolean(touched.totalAllocation && errors.totalAllocation)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-totalAllocation">Montant alloué</InputLabel>
              <OutlinedInput
                id="outlined-adornment-totalAllocation"
                type="number"
                value={values.totalAllocation}
                name="totalAllocation"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Montant total alloué"
                inputProps={{}}
              />
              {touched.totalAllocation && errors.totalAllocation && (
                <FormHelperText error id="standard-weight-helper-text-totalAllocation">
                  {errors.totalAllocation}
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

export default AddCategoricalBudget;
