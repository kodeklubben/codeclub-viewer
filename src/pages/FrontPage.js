import React from 'react';

//const scratchPage = require('lessons/scratch/forskyvning/forskyvning.md');
const scratchPage = require('lessons/scratch/straffespark/straffespark.md');

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
