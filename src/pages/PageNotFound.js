import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';

import styles from './PageNotFound.scss';

export const NotFound = React.createClass({
    render(){
        
        return (
            <div className={styles.center}>
                <h3>Noe gikk galt.</h3>
                <p>Siden du leter etter klarer vi ikke å finne.</p>
                <p>(404)</p>
                <img className={styles.img} src={require('../assets/graphics/travolta-404.gif')}/>
            </div>
        );
    }
});

NotFound.propTypes = {
  isStudentMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isStudentMode: state.isStudentMode
  };
}

export const NotFoundContainer = connect(
    mapStateToProps
    )(withStyles(styles)(NotFound));