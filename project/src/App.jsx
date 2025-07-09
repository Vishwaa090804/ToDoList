import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import TodoApp from './components/TodoApp';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? <TodoApp /> : <LoginForm />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;