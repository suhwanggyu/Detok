import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { changeMenu } from './indexSlice.js';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(3),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { sections, title } = props;
  const handleClick = (val) => {
    dispatch(changeMenu(val));
  }
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
            onClick={()=>handleClick(section.value)}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
      </Toolbar>
      
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};