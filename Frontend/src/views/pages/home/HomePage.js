import Grid from '@mui/material/Grid'
import HomeNavBar from './NavBar'
import imageMain from 'assets/images/MainSection.svg'
import Section from 'ui-component/homePage/Section'
import CardTemoignages from 'ui-component/homePage/CardTemoignages'
const HomePage = () => {

    return (
       <Grid>
           <HomeNavBar></HomeNavBar>
           <Grid container>
               <Grid item sx={{ textAlign: 'center',mt:8,width: '100%'}}>
                   <Grid >
                       <img src={imageMain} alt="mainImage"></img>
                   </Grid>
               </Grid>
           </Grid>
           <Grid container sx={{ background:'#F2F2F2', p:5 }}>
               <Section></Section>
           </Grid>
           <Grid container sx={{ background:'#D2D2D2', p:8 }}>
               <CardTemoignages></CardTemoignages>
           </Grid>
       </Grid>
    );
}

export default HomePage;