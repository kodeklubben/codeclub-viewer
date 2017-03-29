// Add custom styles to react-bootstrap, so that they can be used via bsStyle without giving a warning,
// e.g. for Panel, with the custom css-style .panel-student (defined globally somewhere)
// it could be used as <Panel bsStyle={student}>...</Panel>

const bootstrapUtils = require('react-bootstrap/lib/utils/bootstrapUtils');

import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

bootstrapUtils.addStyle(Panel, 'student', 'teacher');
bootstrapUtils.addStyle(Button, 'student', 'teacher', 'language-student', 'language-teacher', 'orange', 'white-grey', 'white-grey-lighter');
