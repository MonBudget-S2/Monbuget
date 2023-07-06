import React from 'react';
import { FormControl, OutlinedInput, FormHelperText, InputLabel } from '@mui/material';
import { Formik } from 'formik';
import DialogForm from '../../../ui-component/modal/DialogForm';
import { useTheme } from '@mui/material/styles';
import categoricalBudgetService from '../../../service/categoricalBudgetService';


const AddCategory = ({ isOpen, onClose, setAlertMessage }) => {
    const theme = useTheme();
    


    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
        const { name } = values;

        if (!name) {
            setErrors({ name: 'Veuillez entrer un nom de catégorie' });
            return;
        }

        try {
            const response = await categoricalBudgetService.addCategory({ name });
            if (response.status === 201) {
                setStatus({ success: true });
                setSubmitting(false);
                onClose(); 
                setAlertMessage({
                    open: true,
                    type: 'success',
                    message: 'La catégorie a été ajoutée avec succès !'
                });
            } else {
                setStatus({ success: false });
                setAlertMessage({
                    open: true,
                    type: 'error',
                    message: response.data.message
                });
                setSubmitting(false);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la catégorie:', error);
            setStatus({ success: false });
            setErrors({ submit: 'Une erreur s\'est produite lors de l\'ajout de la catégorie' });
            setSubmitting(false);
        }
    };

    return (
        <>
        <Formik
            initialValues={{ name: '' }}
            onSubmit={handleSubmit}
        >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => {
            
            return (
            <DialogForm
                title="Ajouter une catégorie"
                isOpen={isOpen}
                setIsOpen={onClose}
                onSubmit={handleSubmit}
            >
                    <FormControl fullWidth error={Boolean(touched.name && errors.name)} 
                    sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-name">Nom de la catégorie</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-name"
                            type="text"
                            value={values.name}
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="name"
                            inputProps={{}}
                        />
                        {touched.name && errors.name && (
                            <FormHelperText error id="standard-weight-helper-text-name">
                                {errors.name}
                            </FormHelperText>
                        )}
                    </FormControl>
                    </DialogForm>
                    );
                }}
        </Formik>
    </>
    );
};

export default AddCategory;
