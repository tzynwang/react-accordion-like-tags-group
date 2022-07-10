import React, { memo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TagGroups from '@Components/Common/TagGroups';

function App(): React.ReactElement {
  /* Main */
  return (
    <CssBaseline>
      <Box p={2}>
        <TagGroups />
      </Box>
    </CssBaseline>
  );
}

export default memo(App);
