'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import theme from '@/theme/theme';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
};

export default ClientWrapper;
