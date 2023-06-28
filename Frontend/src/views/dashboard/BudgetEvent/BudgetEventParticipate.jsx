import Grid from "@mui/material/Grid";
import {Avatar, CardContent, Typography} from "@mui/material";
import MainCard from "../../../ui-component/cards/MainCard";
import {gridSpacing} from "../../../store/constant";
import ParticipantData from "views/dashboard/BudgetEvent/PariticipantData"
const BudgetEventParticipate = () =>{
    return(
        <MainCard>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Typography variant="h2">
                        Les Participants
                    </Typography>
                    <Grid container direction="row" >
                        {ParticipantData.map((row) =>(
                            <Grid container key={row.id} alignItems="center"  sx={{ mt:2 , justifyContent:"space-between"}}>
                                <Grid items xs={6}>
                                    <Grid container alignItems="center">
                                        <Avatar key={row.id} alt="Avatar" src={row.img} sx={{ mr: 2 }}></Avatar>
                                        <Typography variant="h4" key={row.id}>
                                            {row.nom}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid items xs={6}>
                                    <Typography variant="h4" key={row.id} sx={{ textAlign: 'right' }}>
                                        {row.TotalExpense} €
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>

    );
}

export default BudgetEventParticipate;