import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
  Box,
  Grid,
} from "@material-ui/core";
import colors from "../constants/colors";
import Status from "./Status";
import * as actions from "../actions/blocks";
import initialState from "../reducers/initialState";
import Block from "./Block";

const Node = ({ node, expanded, toggleNodeExpanded, actions, localState }) => {
  const classes = useStyles();

  useEffect(() => {
    if (expanded) {
      actions.retrieveBlocksFromNode(node);
    }
  }, [expanded]);

  return (
    <ExpansionPanel
      elevation={3}
      className={classes.root}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <ExpansionPanelSummary
        className={classes.summary}
        classes={{
          expandIcon: classes.icon,
          content: classes.content,
          expanded: classes.expanded,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box className={classes.summaryContent}>
          <Box>
            <Typography variant="h5" className={classes.heading}>
              {node.name || "Unknown"}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.secondaryHeading}
            >
              {node.url}
            </Typography>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {localState.loading && <Typography>Loading...</Typography>}
        {localState.error && <Typography>Error retrieving blocks</Typography>}
        {!localState.loading && !localState.error && (
          <Grid container spacing={1}>
            {localState.data.map((block) => (
              <Block
                key={block.id}
                data={block}
              />
            ))}
          </Grid>
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 0",
    boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",
    "&:before": {
      backgroundColor: "unset",
    },
  },
  summary: {
    padding: "0 24px",
  },
  summaryContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
  },
  icon: {
    color: colors.faded,
  },
  content: {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  expanded: {
    "& $icon": {
      paddingLeft: 0,
      paddingRight: 12,
      top: -10,
      marginRight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    display: "block",
    color: colors.text,
    lineHeight: 1.5,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.faded,
    lineHeight: 2,
  },
}));

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  localState: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.bool,
    data: PropTypes.array,
  })
};

function mapStateToProps (state, ownProps) {
  const defaultData = initialState().block;
  const localState = state.blocks && state.blocks[ownProps.node.url] || defaultData;
  return {
    localState,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Node);
