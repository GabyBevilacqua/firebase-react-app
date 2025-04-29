import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthForm: React.FC = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [name, setName] = useState<string>("");

    const handleRegister = async () => {
        if (!name.trim()) {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Guardar nombre en Firestore
            console.log("Datos enviados a Firestore:", {
                name: name.trim(),
                email
            });
            await setDoc(doc(db, "users", userCredential.user.uid), {
                name: name.trim(), // Aseguramos que el nombre no tenga espacios innecesarios
                email
            });

            alert("Usuario creado correctamente, haz login");
            setIsRegistering(false); // Volver al formulario de login
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setName("");
        } catch (error: any) {
            alert("Error al registrar: " + error.message);
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login exitoso");
        } catch (error: any) {
            alert("Error al iniciar sesión: " + error.message);
        }
    };

    return (
        <div  className="auth-form">
        <h2>{isRegistering ? "Registro de Usuario" : "Login"}</h2>
  
        {isRegistering && (
          <>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
          </>
        )}
  
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
  
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
  
        {isRegistering && (
          <>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
          </>
        )}
  
        {isRegistering ? (
          <button onClick={handleRegister}>Crear cuenta</button>
        ) : (
          <button onClick={handleLogin}>Iniciar sesión</button>
        )}
  
        <br />
        <br />
  
        {isRegistering ? (
          <button onClick={() => setIsRegistering(false)}>¿Ya tienes cuenta? Inicia sesión</button>
        ) : (
          <button onClick={() => setIsRegistering(true)}>¿No tienes cuenta? Regístrate</button>
        )}
      </div>
    );
  };

export default AuthForm;
