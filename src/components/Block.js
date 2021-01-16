import React from 'react';
import {Grid, makeStyles, Typography} from '@material-ui/core';
import {paddedFormatting} from '../utils/numberFormat';

const Block = ({ data }) => {
    const classes = useStyles();
    const { id, type, attributes } = data;
    return (
        <Grid 
            item
            xs={12}
            className={classes.root}
        >
            <Typography variant="overline" className={classes.title} >
                {paddedFormatting(Number(id))}
            </Typography>
            <Typography variant="body2">
                {attributes.data}
            </Typography>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 2,
        backgroundColor: 'lightgray',
        marginTop: 5,
        padding: "6px !important"
    },
    title: {
        font: 7,
        color: 'blue',
    }
}));

export default Block;