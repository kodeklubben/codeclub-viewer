import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CollapsiblePanel.scss';

class CollapsiblePanel extends React.PureComponent {
  state = {
    expanded: this.props.initiallyExpanded,
  };

  render() {
    const {children, bsStyle, header} = this.props;
    const {expanded} = this.state;
    const headerWithChevron = <span>
      <Glyphicon className={styles.chevron} glyph={expanded ? 'chevron-down' : 'chevron-right'}/>{header}
    </span>;
    return (
      <div className={styles.container}>
        <Panel {...{expanded, bsStyle}} onToggle={() => this.setState({expanded: !expanded})}>
          <Panel.Heading>
            <Panel.Title toggle>
              {headerWithChevron}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            {children}
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

CollapsiblePanel.propTypes = {
  // ownProps
  initiallyExpanded: PropTypes.bool,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  bsStyle: PropTypes.oneOf(['student', 'teacher']),
  children: PropTypes.object
};

export default withStyles(styles)(CollapsiblePanel);
