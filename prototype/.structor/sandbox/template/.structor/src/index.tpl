module.exports = {
    Router: {
        Link: require('react-router').Link,
        IndexLink: require('react-router').IndexLink
    },
    TestGroup: {
        TestComponent: require('<%= componentRelativePath %>')
    }
};