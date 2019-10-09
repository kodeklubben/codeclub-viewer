import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './CollapsiblePanel.scss';

const CollapsiblePanel = ({initiallyExpanded, header, bsStyle, children}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  useStyles(styles);

  return (
    <div className={styles.container}>
      <Panel {...{expanded, bsStyle}} onToggle={() => setExpanded(!expanded)}>
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
  initiallyExpanded: PropTypes.bool,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  bsStyle: PropTypes.oneOf(['student', 'teacher']),
  children: PropTypes.object
};

export default CollapsiblePanel;
