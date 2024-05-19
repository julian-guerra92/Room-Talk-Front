import CheckIcon from '@mui/icons-material/Check';
import { Alert, Box } from '@mui/material';

interface Props {
   text: string;
   type?: any;
}


export const Alerts = ({ text, type }: Props) => {
   return (
      <Box
         display="flex"
         justifyContent="flex-start"
         alignItems="flex-start"
         style={{ position: 'fixed', top: 80, left: 30, zIndex: 9999 }}
      >
         <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity={type || 'info'}
            style={{ width: '500px', fontSize: '1.2rem'}}
         >
            {text}
         </Alert>
      </Box>
   )
}
