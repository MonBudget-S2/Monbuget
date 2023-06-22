import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, FormHelperText, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';

const BudgetAllocation = ({ ...others }) => {
    const theme = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    console.log('selectedCategory', customCategory);


    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCustomCategory('');
    };

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
                    submit: null,
                }}
                onSubmit={(values, { setSubmitting }) => {
                    // Traitez les données du formulaire ici
                    console.log(values);
                    setSubmitting(false);
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
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
                                    shrink: true,
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
                                    shrink: true,
                                }}
                            />
                            {touched.periodEnd && errors.periodEnd && (
                                <FormHelperText error id="standard-weight-helper-text-periodEnd">
                                    {errors.periodEnd}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.selectedCategory && errors.selectedCategory)} sx={{ ...theme.typography.customInput }}>
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
                                <MenuItem value="Alimentation">Alimentation</MenuItem>
                                <MenuItem value="Transport">Transport</MenuItem>
                                <MenuItem value="Loisirs">Loisirs</MenuItem>
                                {/* Ajoutez d'autres catégories ici */}
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

                                <FormControl fullWidth error={Boolean(touched.customCategory && errors.customCategory)} sx={{ ...theme.typography.customInput }}>
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

                        <FormControl fullWidth error={Boolean(touched.totalAllocation && errors.totalAllocation)} sx={{ ...theme.typography.customInput }}>
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

                        <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                            Ajouter
                        </Button>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default BudgetAllocation;
