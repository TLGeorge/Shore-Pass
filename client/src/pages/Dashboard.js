import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import API from '../utils/API'
// import { mainListItems, secondaryListItems } from './listItems'; //Update list items on left menu to show sections we want
// import Chart from './Chart'; //Update these values to show weather
// import Deposits from './Deposits'; //Update these values to QR code section
// import Orders from './Orders'; //Update these values to User Information
import Copyright from '../components/Copyright'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function Dashboard() {

    // PIPING FOR CONTEXT.. FOR FUTURE USE
    // const { user, setUser } = useContext(UserContext)

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    // EVENTUALLY REWORKING THIS FUNCTIONALITY INTO CONTEXT PROVIDER ON APP
    const [user, setUser] = useState({})
    const getUserId = async () => {
        // Check localstorage for a user id token and fetch user data if it exists, otherwise redirect to login
        let userId = await JSON.parse(localStorage.getItem('user_id_SP'))
        if (!userId) {
            window.location.href = '/login'
        } else {
            API.findUserId(userId)
                .then(res => {
                    console.log(res)
                    setUser(res.data)
                })
                .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        getUserId()
    }, [])

    if (!user.id) {
        return (
            <Paper>
                <h4>Loading assets..</h4>
            </Paper>
        )
    } else {
        return (

            <div className={classes.root}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                {/* <h2>Hey {user.name}</h2> */}
                                <h2>Hello {user.firstName} {user.lastName}</h2>
                                {/* <Chart /> */}
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                {/* <Deposits /> */}
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {/* <Orders /> */}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </div>
        );
    }
}
export default Dashboard;