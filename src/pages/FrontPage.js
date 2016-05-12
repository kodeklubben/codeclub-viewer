import React from 'react';

const scratchPage = require('../../../oppgaver/src/scratch/forskyvning/forskyvning.md');

console.log(scratchPage.frontmatter);

const FrontPage = React.createClass({
  createMarkup(){
    return {
      __html: scratchPage.content
    };
  },
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <div dangerouslySetInnerHTML={this.createMarkup()} />
      </div>
    );
  }
});

export default FrontPage;
