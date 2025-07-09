import React, { useState } from 'react';
import { Check, Trash2, Clock, Edit3, Save, X } from 'lucide-react';

export default function TodoList({ todos, onToggle, onDelete, onUpdate, categories }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDescription(todo.description);
  };

  const saveEdit = () => {
    if (!editingId) return;

    onUpdate(editingId, editText.trim(), editDescription.trim());
    setEditingId(null);
    setEditText('');
    setEditDescription('');
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Personal';
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Check className="w-16 h-16 mx-auto mb-4 opacity-40" />
          <h3 className="text-xl font-semibold mb-2 text-gray-600">No todos yet!</h3>
          <p className="text-gray-500">Add your first todo above or use voice input to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-sm transition-all ${
            todo.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
          }`}
        >
          {editingId === todo.id ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optional)..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={saveEdit}
                  className="flex items-center justify-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm flex-1 sm:flex-none"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all text-sm flex-1 sm:flex-none"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                <button
                  onClick={() => onToggle(todo.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all mt-0.5 ${
                    todo.completed
                      ? 'bg-green-500 border-green-400 text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {todo.completed && <Check className="w-3 h-3" />}
                </button>

                <div className="flex-1 min-w-0">
                  <h3 className={`text-gray-800 font-medium text-sm sm:text-base break-words ${todo.completed ? 'line-through opacity-75' : ''}`}>
                    {todo.text}
                  </h3>
                  {todo.description && (
                    <p className={`text-gray-600 text-xs sm:text-sm mt-1 break-words ${todo.completed ? 'line-through opacity-75' : ''}`}>
                      {todo.description}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2 text-gray-400 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Added On: {formatDate(todo.createdAt)}
                    </span>
                    <span className="text-blue-600 font-medium text-xs">
                      {getCategoryName(todo.category)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-1 flex-shrink-0">
                <button
                  onClick={() => startEdit(todo)}
                  className="p-1.5 sm:p-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="p-1.5 sm:p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}