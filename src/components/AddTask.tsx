import React, { useState, useEffect } from "react";
import "./../styles/AddTask.css";

interface Task {
  id: number;
  title: string;
  description: string;
  author: string;
  completed: boolean;
}

/**
 * קומפוננטת AddTask:
 * קומפוננטה זו מנהלת רשימת משימות באמצעות state מקומי ושומרת את הנתונים ב-localStorage.
 * 
 * תכונות עיקריות:
 * - הוספת משימות חדשות עם שם, תיאור, ושם המוסיף.
 * - עריכת משימות קיימות.
 * - מחיקת משימות.
 * - סימון משימות כ"בוצעו" או "לא בוצעו".
 * - סינון משימות לפי מצב (הכול, בוצעו, לא בוצעו).
 * - שמירה ושחזור המשימות מה-localStorage כדי למנוע אובדן נתונים בעת רענון הדף.
 */

const AddTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  /**
   * פונקציה להוספת משימה חדשה או עדכון משימה קיימת.
   * 
   * - אם המשתמש עורך משימה קיימת, הפונקציה תעדכן את המשימה לפי ה-ID שלה.
   * - אם זו משימה חדשה, הפונקציה תוסיף אותה לרשימת המשימות.
   * - לאחר הוספה או עדכון, הרשימה נשמרת ב-localStorage.
   * 
   * 
   */
  const handleAddTask = (e: React.FormEvent): boolean => {
    e.preventDefault();
    if (!title || !description || !author) return false;
    
    let updatedTasks;
    if (isEditing && editingId !== null) {
      updatedTasks = tasks.map(task =>
        task.id === editingId ? { ...task, title, description, author } : task
      );
    } else {
      const newTask: Task = {
        id: Date.now(),
        title,
        description,
        author,
        completed: false,
      };
      updatedTasks = [...tasks, newTask];
    }
    
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
    setTitle("");
    setDescription("");
    setAuthor("");
    setIsEditing(false);
    setEditingId(null);
    
    return true;
  };

  /**
   * פונקציה למחיקת משימה לפי ה-ID שלה.
   * - מסננת החוצה את המשימה הנבחרת ומעדכנת את ה-state.
   * - מעדכנת את הנתונים ב-localStorage.
   * 
   * 
   */
  const handleDeleteTask = (id: number): boolean => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return true;
  };

  /**
   * פונקציה לעריכת משימה קיימת.
   * - שולפת את פרטי המשימה שנבחרה ומציבה אותם בטופס.
   * - משנה את המצב ל"עריכה" כך שהמשתמש יוכל לעדכן את הנתונים.
   * 
   */
  const handleEditTask = (id: number): boolean => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setAuthor(taskToEdit.author);
      setIsEditing(true);
      setEditingId(id);
      return true;
    }
    return false;
  };

  /**
   * פונקציה לעריכת משימה קיימת.
   * - שולפת את פרטי המשימה שנבחרה ומציבה אותם בטופס.
   * - משנה את המצב ל"עריכה" כך שהמשתמש יוכל לעדכן את הנתונים.
   * 
   */
  const handleToggleTask = (id: number): boolean => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return true;
  };

  /**
   * סינון רשימת המשימות לפי מצב המשימה:
   * - "all" - מציג את כל המשימות.
   * - "completed" - מציג רק משימות שהושלמו.
   * - "pending" - מציג רק משימות שלא הושלמו.
   * 
   * @returns {Task[]}
   */
  const filteredTasks : Task[] = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="task-page-container">
      <h1 className="welcome-title"> ✏️מנהל משימות </h1>
      <div className="task-form-container">
        <h2>{isEditing ? "עריכת משימה" : "הוספת משימה"}</h2>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="שם המשימה"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="שם המוסיף"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            placeholder="תיאור המשימה"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">{isEditing ? "עדכן משימה" : "הוסף משימה"}</button>
        </form>
      </div>

      <div className="task-list-container">
        <h2>משימות שהוזנו:</h2>
        <div className="task-filters">
          <button onClick={() => setFilter("all")}>הכל</button>
          <button onClick={() => setFilter("completed")}>בוצעו</button>
          <button onClick={() => setFilter("pending")}>לא בוצעו</button>
        </div>
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="no-tasks">אין משימות להציג</p>
          ) : (
            filteredTasks.map(task => (
              <div key={task.id} className="task-item">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <span>נוסף על ידי: {task.author}</span>
                <div className="task-actions">
                  <button className="toggle-btn" onClick={() => handleToggleTask(task.id)}>
                    {task.completed ? "✔️" : "⏳"}
                  </button>
                  <button className="edit-btn" onClick={() => handleEditTask(task.id)}>✏️</button>
                  <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>❌</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTask;