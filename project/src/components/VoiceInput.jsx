import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X } from 'lucide-react';

export default function VoiceInput({ onResult, onClose, type = 'todo' }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  const getTitle = () => {
    switch (type) {
      case 'description':
        return 'Voice Input for Description';
      case 'note':
        return 'Voice Input for Note';
      default:
        return 'Voice Input for Todo';
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'description':
        return 'Add Description';
      case 'note':
        return 'Add to Note';
      default:
        return 'Add Todo';
    }
  };

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onerror = (event) => {
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setError('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleSave = () => {
    if (transcript.trim()) {
      onResult(transcript.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-2xl border border-gray-200">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{getTitle()}</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error ? (
          <div className="text-red-600 text-center mb-4 bg-red-50 p-3 rounded-lg border border-red-200 text-sm sm:text-base">
            {error}
          </div>
        ) : (
          <>
            <div className="text-center mb-4 sm:mb-6">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-105 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                ) : (
                  <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                )}
              </button>
              <p className="text-gray-600 mt-3 text-sm sm:text-base">
                {isListening ? 'Listening... Click to stop' : 'Click to start speaking'}
              </p>
            </div>

            {isListening && (
              <div className="mb-4">
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-blue-500 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {transcript && (
              <div className="mb-6">
                <label className="block text-gray-600 text-xs sm:text-sm mb-2">Transcript:</label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800 min-h-[60px] text-sm sm:text-base break-words">
                  {transcript}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!transcript.trim()}
                className="flex-1 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {getButtonText()}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}