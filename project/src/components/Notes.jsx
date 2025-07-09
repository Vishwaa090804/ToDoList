import React, { useState } from 'react';
import VoiceInput from './VoiceInput';
import { Plus, Edit3, Trash2, Save, X, Clock, Mic } from 'lucide-react';

export default function Notes({ notes, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [voiceInputField, setVoiceInputField] = useState('content');

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      if (editingId) {
        onUpdate(editingId, formData.title.trim(), formData.content.trim());
        setEditingId(null);
      } else {
        onAdd(formData.title.trim(), formData.content.trim());
      }
      setFormData({ title: '', content: '' });
      setShowForm(false);
    }
  };

  const startEdit = (note) => {
    setFormData({ title: note.title, content: note.content });
    setEditingId(note.id);
    setShowForm(true);
  };

  const cancelForm = () => {
    setFormData({ title: '', content: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleVoiceResult = (text) => {
    if (voiceInputField === 'title') {
      setFormData({ ...formData, title: text });
    } else {
      setFormData({ ...formData, content: text });
    }
    setShowVoiceInput(false);
  };

  const openVoiceInput = (field) => {
    setVoiceInputField(field);
    setShowVoiceInput(true);
  };

  return (
    <div className="space-y-6">
      {/* Add Note Button */}
      {!showForm && (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <button
            onClick={() => setShowForm(true)}
            className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all border-2 border-dashed border-gray-300 hover:border-gray-400 text-sm sm:text-base"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
            Add New Note
          </button>
        </div>
      )}

      {/* Note Form */}
      {showForm && (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Note title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                autoFocus
              />
              <button
                type="button"
                onClick={() => openVoiceInput('title')}
                className="px-3 sm:px-4 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all flex-shrink-0"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex gap-2">
              <textarea
                placeholder="Write your note here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => openVoiceInput('content')}
                className="px-3 sm:px-4 py-2 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all flex-shrink-0"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={cancelForm}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm sm:text-base flex-1 sm:flex-none"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm sm:text-base flex-1 sm:flex-none"
              >
                <Save className="w-4 h-4" />
                {editingId ? 'Update Note' : 'Save Note'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-200 text-center">
          <div className="text-gray-400 mb-4">
            <Edit3 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-40" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-600">No notes yet!</h3>
            <p className="text-gray-500 text-sm sm:text-base">Create your first note to start capturing your thoughts.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-gray-800 font-semibold text-base sm:text-lg truncate flex-1 mr-2 break-words">
                  {note.title}
                </h3>
                <div className="flex flex-col sm:flex-row gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button
                    onClick={() => startEdit(note)}
                    className="p-1.5 sm:p-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(note.id)}
                    className="p-1.5 sm:p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-4 break-words">
                {note.content}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-gray-400 text-xs">
                <Clock className="w-3 h-3" />
                <span className="break-words">Created {formatDate(note.createdAt)}</span>
                {note.updatedAt.getTime() !== note.createdAt.getTime() && (
                  <span className="sm:ml-2">• Updated {formatDate(note.updatedAt)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Voice Input Modal */}
      {showVoiceInput && (
        <VoiceInput
          onResult={handleVoiceResult}
          onClose={() => setShowVoiceInput(false)}
          type="note"
        />
      )}
    </div>
  );
}