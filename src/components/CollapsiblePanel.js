import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './CollapsiblePanel.scss';

const CollapsiblePanel = ({initiallyExpanded, header, bsStyle, children}) => {
  useStyles(styles);
  const [expanded, handleToggle] = useState(initiallyExpanded);

  return (
    <div className={styles.container}>
      <Panel {...{expanded, bsStyle}} onToggle={useCallback(() => handleToggle(!expanded), [expanded])}>
        <Panel.Heading>
          <Panel.Title toggle>
            <Glyphicon className={styles.chevron} glyph={expanded ? 'chevron-down' : 'chevron-right'}/>
            {header}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          {children}
        </Panel.Collapse>
      </Panel>
    </div>
  );
};

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

export default CollapsiblePanel;
