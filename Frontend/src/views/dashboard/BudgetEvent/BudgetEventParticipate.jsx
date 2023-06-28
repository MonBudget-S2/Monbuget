import Grid from "@mui/material/Grid";
import {CardContent, Typography} from "@mui/material";
import MainCard from "../../../ui-component/cards/MainCard";
import {gridSpacing} from "../../../store/constant";
import ParticipantData from "views/dashboard/BudgetEvent/PariticipantData"
const BudgetEventParticipate = () =>{

    return(
        <MainCard>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Typography variant="h4">
                        Les Participants
                    </Typography>
                    <Grid>
                        {ParticipantData.map((row) =>(
                            <Typography key={row.id}>
                                {row.nom}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>

    );
}

export default BudgetEventParticipate;