import React from 'react';
import {Box, Container} from '@material-ui/core';

const FrontPage = () => {
  return (
    <Container>
      <Box my={2}>
        {[...new Array(10)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
          )
          .join('\n')}
      </Box>
    </Container>
  );
};

export default FrontPage;
