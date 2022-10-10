import * as React from 'react';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ErrorModal = () => {
  return (<>
    <Box sx={style}>
      Server Error 😑
    </Box>
  </>
  )
}

export default ErrorModal