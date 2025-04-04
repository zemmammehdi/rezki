import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
  Button,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import ClientProfile from './pages/ClientProfile';
import Agents from './pages/Agents';
import SubMenu from './pages/SubMenu';
import Produits_Services from './pages/Produits_Services';
import Fournisseurs from './pages/Fournisseurs';
import Bon_Achats from './pages/Bon_Achats';
import Inventaire from './pages/Inventaire';
import VersementsForfait from './pages/VersementsForfait';
import BonsPassageForfait from './pages/BonsPassageForfait';
import { theme } from './theme';

/**
 * Error Boundary component to catch rendering errors
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Une erreur est survenue
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => window.location.reload()}
          >
            Rafraîchir la page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

/**
 * Main content component for the VITALECOSYSTEM application.
 * Handles routing and navigation between different sections of the app.
 * Includes a top navigation bar with company name and return button.
 */
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show the return button when not on the dashboard
  const showReturnButton = location.pathname !== '/dashboard';
  
  /**
   * Handle the return button navigation based on current location
   * For the clients page, return to Régime Forfait menu
   * For the agents-list page, return to Agents menu
   * For all other pages, return to the dashboard
   */
  const handleReturn = () => {
    if (location.pathname === '/clients') {
      navigate('/regime-forfait');
    } else if (location.pathname.startsWith('/clients/')) {
      navigate('/clients');
    } else if (location.pathname === '/fournisseurs' || location.pathname === '/bon-achats') {
      navigate('/achats');
    } else if (location.pathname === '/versements-forfait' || location.pathname === '/bons-passage-forfait') {
      navigate('/regime-forfait');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Application header with company name and return button */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            VITALECOSYSTEM
          </Typography>
          {showReturnButton && (
            <Button
              color="inherit"
              size="large"
              startIcon={<ArrowBackIcon sx={{ fontSize: 30 }} />}
              onClick={handleReturn}
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                padding: '8px 24px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              RETOUR
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Main content container with routes to different application views */}
      <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<ClientProfile />} />
          <Route path="/agents-list" element={<Agents />} />
          <Route path="/regime-forfait" element={<SubMenu title="Régime Forfait" />} />
          <Route path="/regime-réel" element={<SubMenu title="Régime Réel" />} />
          <Route path="/achats" element={<SubMenu title="Achats" />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/produits-services" element={<Produits_Services />} />
          <Route path="/inventaire" element={<Inventaire />} />
          <Route path="/fournisseurs" element={<Fournisseurs />} />
          <Route path="/bon-achats" element={<Bon_Achats />} />
          <Route path="/versements-forfait" element={<VersementsForfait />} />
          <Route path="/bons-passage-forfait" element={<BonsPassageForfait />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </Container>
    </Box>
  );
}

/**
 * Root component of the application.
 * Sets up the theme provider, error boundary, and router.
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App; 