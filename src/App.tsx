
import './App.css';

import React from "react";
import AuthForm from "./components/AuthForm";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import TaskManager from './components/TaskManager';

import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

import { FiLogOut } from "react-icons/fi"; // Importamos el icono de logout

const AppContent = () => {
  const { currentUser, name } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="app-container">
      <h1>App Firebase + React + TypeScript</h1>
      {currentUser ? (
        <div className="user-info">
          <h2>Hola, {name || currentUser.email}</h2>
          <p className="user-email">Tu email: {currentUser.email}</p>
          <div  className="logout-container">
            <button className="logout-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
          <TaskManager />
        </div>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

