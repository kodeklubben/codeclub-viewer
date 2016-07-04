export default store => next => action => {
    //console.log('Action: ' + action.type);
    return next(action);
}
