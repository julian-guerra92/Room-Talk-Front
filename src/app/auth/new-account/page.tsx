import { RegisterForm } from './registerForm';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <Box sx={{ width: '100%', position: 'relative', margin: '15% 0% 5% 0%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, }}>
        <Typography variant="h2" component="div" fontSize={'30px'} sx={{ color: 'white', padding: 1 }}>
          Crear una cuenta
        </Typography>
      </Box>

      {<RegisterForm />}
    </div>
  );
}