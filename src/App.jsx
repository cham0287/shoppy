import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContext';
import NavBar from './components/NavBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <NavBar />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
