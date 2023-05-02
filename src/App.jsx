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
import Team from './scenes/monitors';
import { useState } from 'react';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
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
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
