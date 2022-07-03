import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './router';                                                                                                                                                        
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { ProfileService } from '../src/services/profile.service';
import GlobalStyles from '@mui/material/GlobalStyles';

const glogalScrolbarStyle = {
    '*::-webkit-scrollbar': {
        width: '0.4em', height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)', borderRadius:'5px',
        outline: '0px solid slategrey',
    },
}
const App = () => {
    const isLoggedIn = ProfileService.isAuthencticated();
    const content = useRoutes(routes(isLoggedIn));
    
    return (
        <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                <GlobalStyles styles={glogalScrolbarStyle} />
                {content}
            </LocalizationProvider>
        </ThemeProvider>
    );
}
export default App;


