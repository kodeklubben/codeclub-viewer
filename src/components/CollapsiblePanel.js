import React, {PropTypes} from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CollapsiblePanel.scss';

const CollapsiblePanel = React.createClass({
  getInitialState() {
    return {
      expanded: this.props.initiallyExpanded
    };
  },
  render() {
    const {children, bsStyle, header} = this.props;
    const {expanded} = this.state;
    const onClick = () => this.setState({expanded: !expanded});
    const headerWithChevron = <span>
      <Glyphicon className={styles.chevron} glyph={expanded ? 'chevron-down' : 'chevron-right'}/>{header}
    </span>;
    return (
      <div className={styles.container}>
        <Panel collapsible expanded={expanded} bsStyle={bsStyle} header={headerWithChevron} onSelect={onClick}>
          {children}
        </Panel>
      </div>
    );
  }
});

CollapsiblePanel.propTypes = {
  initiallyExpanded: PropTypes.bool,
  header: PropTypes.string,
  bsStyle: PropTypes.string,
};

export default withStyles(styles)(CollapsiblePanel);
