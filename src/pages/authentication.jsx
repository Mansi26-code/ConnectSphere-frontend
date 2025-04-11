import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';

const bluishTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2979ff', // Changed to blue theme
        },
        background: {
            default: '#0a1929', // Dark blue background
            paper: '#102c49', // Darker bluish shade for box
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    }
});

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                let result = await handleRegister(name, username, password);
                setMessage(result);
                setOpen(true);
                setError('');
                setFormState(0);
                setUsername('');
                setPassword('');
                setName('');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong!');
        }
    };

    return (
        <ThemeProvider theme={bluishTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: 'url("/backg.jpg")',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid 
                    item xs={12} sm={8} md={5} 
                    component={Paper} 
                    elevation={10} 
                    square 
                    sx={{
                        p: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 3,
                        backgroundColor: 'background.paper',
                        boxShadow: '0px 10px 30px rgba(41, 121, 255, 0.5)', // Added strong shadow
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)', // Centering the box
                        width: { xs: '90%', sm: '70%', md: '40%' },
                    }}
                >
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                        <Avatar sx={{ m: 2, bgcolor: 'primary.main', boxShadow: '0px 4px 15px rgba(41, 121, 255, 0.5)' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </motion.div>
                    
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <Button variant={formState === 0 ? "contained" : "outlined"} onClick={() => setFormState(0)}>
                            Sign In
                        </Button>
                        <Button variant={formState === 1 ? "contained" : "outlined"} onClick={() => setFormState(1)}>
                            Sign Up
                        </Button>
                    </Box>
                    
                    <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                        {formState === 1 && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
                        
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ 
                                    mt: 3, mb: 2, 
                                    borderRadius: 3, 
                                    boxShadow: '0px 6px 15px rgba(41, 121, 255, 0.5)' 
                                }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login" : "Register"}
                            </Button>
                        </motion.div>
                    </Box>
                </Grid>
            </Grid>
            
            <Snackbar open={open} autoHideDuration={4000} message={message} onClose={() => setOpen(false)} />
        </ThemeProvider>
    );
}
