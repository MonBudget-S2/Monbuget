import AddBudgetEvenementiel from 'ui-component/budget/AddBudgetEvenementiel'
import Grid from '@mui/material/Grid';
const BudgetEventCreate = () =>{
    return(
        <Grid container sx={{ p:5 }}>
            <AddBudgetEvenementiel>
            </AddBudgetEvenementiel>
        </Grid>

    );
}

export default BudgetEventCreate;