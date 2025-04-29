import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    Timestamp,
    deleteDoc,
    doc
} from "firebase/firestore";

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [newTask, setNewTask] = useState<string>("");

    useEffect(() => {
        const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(data);
        });
        return () => unsubscribe();
    }, []);

    const handleAddTask = async () => {
        if (newTask.trim() === "") return;

        console.log("Usuario autenticado:", auth.currentUser?.uid);
        console.log("Datos enviados a Firestore:", {
            text: newTask,
            createdAt: Timestamp.now(),
            userId: auth.currentUser?.uid
        });

        await addDoc(collection(db, "tasks"), {
            text: newTask,
            createdAt: Timestamp.now(),
            userId: auth.currentUser?.uid // Asociar la tarea al usuario autenticado
        });
        setNewTask("");
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            await deleteDoc(doc(db, "tasks", taskId));
            console.log("Tarea eliminada");
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    return (
        <div className="task-manager">
            <h2>Gestor de Tareas</h2>
            <input
                type="text"
                placeholder="Nueva tarea"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Agregar tarea</button>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.text}
                        <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
