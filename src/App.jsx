import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Home from './scenes/Home/';
import Computer from './scenes/computers';
import Monitors from './scenes/monitors';
import Printers from './scenes/printers';
import Peripherals from './scenes/peripherals';
import { useState } from 'react';
import { ConfirmProvider } from 'material-ui-confirm';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <ConfirmProvider
            defaultOptions={{
              title: `Estas seguro?`,
              confirmationText: 'Aceptar',
              cancellationText: 'Cancelar',
              dialogProps: {
                className: '',
                PaperProps: {
                  sx: {
                    width: '400px',
                    borderRadius: '8px',
                    padding: '5px',
                  },
                },
              },
              titleProps: {
                fontSize: '22px',
                fontWeight: 'bold',
                marginBottom: '5px',
              },
              confirmationButtonProps: {
                color: 'secondary',
                variant: 'outlined',
              },
              cancellationButtonProps: {
                color: 'error',
                variant: 'outlined',
              },
            }}
          >
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/computadoras" element={<Computer />} />
                <Route path="/monitores" element={<Monitors />} />
                <Route path="/impresoras" element={<Printers />} />
                <Route path="/perifericos" element={<Peripherals />} />
              </Routes>
            </main>
          </ConfirmProvider>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
