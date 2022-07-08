import React, { memo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TagGroups from '@Components/Common/TagGroups';

function App(): React.ReactElement {
  /* Main */
  return (
    <CssBaseline>
      <TagGroups />
    </CssBaseline>
  );
}

export default memo(App);
