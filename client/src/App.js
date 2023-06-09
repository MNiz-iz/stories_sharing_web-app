    import React, { useState ,useEffect } from 'react';
    //import all is in {} 
    import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
    import { useDispatch } from 'react-redux';

    import Posts from './components/Posts/Posts';
    import Form from './components/Form/Form';

    import { getPosts } from './actions/posts';
    //import picture is var memories
    import memories from './images/photo-album.png';
    import useStyles from './styles';

    const App = () => {
        const [currentId, setCurrentId] = useState(null); //set start state with null
        const classes = useStyles();
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(getPosts());
        }, [currentId, dispatch]); // return dispatch and currentId

        return (
            <Container maxWidth="lg">
                <AppBar className={classes.appBar} position='static' color='inherit'>
                    <Typography className={classes.heading} variant='h4' align='center'>my Memo</Typography>
                    <img className={classes.image} src={memories} alt='memories' height="60" />
                </AppBar>

                <Grow in>
                    <Container>
                        <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems='stretch' spacing={3}>
                            <Grid item xs={12}  sm={7}>
                                <Posts setCurrentId = {setCurrentId} /> 
                            </Grid>
                            <Grid item xs={12}  sm={4}>
                                <Form currentId = {currentId} setCurrentId = {setCurrentId} />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        );
    }

    export default App;