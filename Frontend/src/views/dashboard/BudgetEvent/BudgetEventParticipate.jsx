import Grid from "@mui/material/Grid";
import { Avatar, CardContent, Typography } from "@mui/material";
import MainCard from "../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../store/constant";

const BudgetEventParticipate = ({ isLoading, participants }) => {
    return (
        <MainCard >
            {!isLoading && (
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                            <Typography variant="h4" sx={{ mb: 2}}>
                                Dépenses total des participants
                            </Typography>
                        <Grid container direction="row">
                            {participants?.map((row) => (
                                <Grid
                                    container
                                    key={row.id}
                                    alignItems="center"
                                    sx={{ mt: 2, justifyContent: "space-between" }}
                                >
                                    <Grid item xs={6} sm={8}>
                                        <Grid container alignItems="center">
                                            <Avatar
                                                alt="Avatar"
                                                src={row.user.avatarUrl}
                                                sx={{ mr: 2 }}
                                            />
                                            <Typography variant="h6">
                                                {row.user.firstname}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <Typography variant="h6" sx={{ textAlign: "right" }}>
                                            {row.amountPaid} €
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </CardContent>
            )}
        </MainCard>
    );
};

export default BudgetEventParticipate;
