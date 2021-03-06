import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { archives, description, social, title } = props;

  return (
    <Grid container direction="row">
      <Grid item xs={12} md={4} >
        <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
            Social
        </Typography>
          {social.map((network) => (
            <Link display="block" variant="body1" href="#" key={network}>
              <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item>
                  <network.icon />
                </Grid>
                <Grid item>{network.name}</Grid>
              </Grid>
            </Link>
          ))}
      </Grid>
    </Grid>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};