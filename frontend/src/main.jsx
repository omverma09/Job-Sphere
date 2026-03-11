import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Ye bhi sahi hai
import './index.css'
import './App.css'
import App from './App.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Window focus par refetch na ho
      retry: 1, // Fail hone par 1 baar retry
      staleTime: 5 * 60 * 1000, // 5 minutes tak data fresh rahe
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection (cacheTime ab gcTime hai v5 mein)
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* React Query DevTools - sirf development mein dikhega */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  </StrictMode>,
);