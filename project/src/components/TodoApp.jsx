// TodoApp.jsx (Firestore integrated version)
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

import TodoList from './TodoList';
import VoiceInput from './VoiceInput';
import Notes from './Notes';
import {
  LogOut,
  Plus,
  BookOpen,
  CheckSquare,
  Mic,
  User,
  Briefcase,
  ShoppingBag,
  Code,
  Heart,
  Dumbbell,
} from 'lucide-react';

const categories = [
  { id: 'personal', name: 'Personal', icon: <User className="w-8 h-8" />, color: 'bg-blue-100' },
  { id: 'work', name: 'Work', icon: <Briefcase className="w-8 h-8" />, color: 'bg-amber-100' },
  { id: 'shopping', name: 'Shopping', icon: <ShoppingBag className="w-8 h-8" />, color: 'bg-red-100' },
  { id: 'coding', name: 'Coding', icon: <Code className="w-8 h-8" />, color: 'bg-green-100' },
  { id: 'health', name: 'Health', icon: <Heart className="w-8 h-8" />, color: 'bg-pink-100' },
  { id: 'fitness', name: 'Fitness', icon: <Dumbbell className="w-8 h-8" />, color: 'bg-purple-100' },
];

export default function TodoApp() {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeTab, setActiveTab] = useState('todos');
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [voiceInputType, setVoiceInputType] = useState('todo');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'todos'),
      where('uid', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setTodos(todosData);
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'notes'),
      where('uid', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      }));
      setNotes(notesData);
    });
    return unsubscribe;
  }, [user]);

  const addTodo = async (text, description = '', category = 'personal') => {
    if (!text.trim()) return;
    await addDoc(collection(db, 'todos'), {
      uid: user.uid,
      text: text.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date(),
      category,
    });
    setNewTodo('');
    setNewDescription('');
    setSelectedCategory('');
    setShowAddForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      addTodo(newTodo, newDescription, selectedCategory);
    }
  };

  const toggleTodo = async (id, currentState) => {
    await updateDoc(doc(db, 'todos', id), {
      completed: !currentState,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const updateTodo = async (id, text, description) => {
    await updateDoc(doc(db, 'todos', id), {
      text,
      description,
    });
  };

  const handleVoiceResult = (text) => {
    if (voiceInputType === 'todo') {
      setNewTodo(text);
    } else {
      setNewDescription(text);
    }
    setShowVoiceInput(false);
  };

  const addNote = async (title, content) => {
    await addDoc(collection(db, 'notes'), {
      uid: user.uid,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const updateNote = async (id, title, content) => {
    await updateDoc(doc(db, 'notes', id), {
      title,
      content,
      updatedAt: new Date(),
    });
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, 'notes', id));
  };

  const getCategoryTaskCount = (categoryId) =>
    todos.filter((todo) => todo.category === categoryId).length;

  const totalTasks = todos.length;

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Todo<span className="text-blue-500">App</span>
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('todos')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base flex-1 sm:flex-none justify-center ${
                  activeTab === 'todos'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                <CheckSquare className="w-4 h-4 flex-shrink-0" />
                Todos
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base flex-1 sm:flex-none justify-center ${
                  activeTab === 'notes'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                <BookOpen className="w-4 h-4 flex-shrink-0" />
                Notes
              </button>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              Logout
            </button>
          </div>
        </div>

        {activeTab === 'todos' ? (
          <>
            {/* Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 md:mb-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`${category.color} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-200`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-gray-700">
                      <div className="w-6 h-6 sm:w-8 sm:h-8">
                        {React.cloneElement(category.icon, { className: "w-full h-full" })}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">{category.name}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">{getCategoryTaskCount(category.id)} Task{getCategoryTaskCount(category.id) !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* All Tasks Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-yellow-400 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">All Task ({totalTasks})</h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button className="px-3 sm:px-4 py-2 bg-yellow-500 text-gray-800 rounded-lg hover:bg-yellow-600 transition-all text-xs sm:text-sm font-medium flex-1 sm:flex-none">
                    All Task
                  </button>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-3 sm:px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all text-xs sm:text-sm font-medium flex items-center gap-2 flex-1 sm:flex-none justify-center"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Add Task Form */}
              {showAddForm && (
                <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTodo}
                          onChange={(e) => setNewTodo(e.target.value)}
                          placeholder="Add a new todo..."
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setVoiceInputType('todo');
                            setShowVoiceInput(true);
                          }}
                          className="px-3 sm:px-4 py-2 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex-shrink-0"
                        >
                          <Mic className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex gap-2">
                      <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Add description (optional)..."
                        rows={2}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setVoiceInputType('description');
                          setShowVoiceInput(true);
                        }}
                        className="px-3 sm:px-4 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex-shrink-0"
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddForm(false);
                          setNewTodo('');
                          setNewDescription('');
                          setSelectedCategory('');
                        }}
                        className="px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm sm:text-base flex-1 sm:flex-none"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm sm:text-base flex-1 sm:flex-none"
                      >
                        Add Todo
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Todo List */}
              <div className="p-4 sm:p-6">
                <TodoList
                  todos={todos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                  categories={categories}
                />
              </div>
            </div>
          </>
        ) : (
          <Notes
            notes={notes}
            onAdd={addNote}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        )}

        {/* Voice Input Modal */}
        {showVoiceInput && (
          <VoiceInput
            onResult={handleVoiceResult}
            onClose={() => setShowVoiceInput(false)}
            type={voiceInputType}
          />
        )}
      </div>
    </div>
  );
}

