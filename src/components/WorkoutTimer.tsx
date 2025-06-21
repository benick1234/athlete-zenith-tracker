
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface WorkoutTimerProps {
  workoutName: string;
  duration: number; // in minutes
  onComplete: () => void;
  onCancel: () => void;
}

const WorkoutTimer = ({ workoutName, duration, onComplete, onCancel }: WorkoutTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio context for sound
  useEffect(() => {
    // Create a simple beep sound using Web Audio API
    const createBeepSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    };

    audioRef.current = { play: createBeepSound } as any;
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          
          // Vibration and sound alerts
          if (newTime === 10 || newTime === 5 || newTime === 3 || newTime === 1) {
            // Vibrate if supported
            if (navigator.vibrate) {
              navigator.vibrate(200);
            }
            // Play sound
            if (audioRef.current) {
              try {
                audioRef.current.play();
              } catch (error) {
                console.log('Audio play failed:', error);
              }
            }
          }
          
          // Complete workout
          if (newTime <= 0) {
            setIsRunning(false);
            // Final completion vibration
            if (navigator.vibrate) {
              navigator.vibrate([200, 100, 200, 100, 200]);
            }
            onComplete();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setHasStarted(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
    setHasStarted(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    onCancel();
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  const isWarning = timeLeft <= 10;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-sm w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-2">{workoutName}</h2>
          <p className="text-gray-400">Stay focused and push through!</p>
        </div>

        {/* Timer Circle */}
        <div className="relative mb-8">
          <div className="w-48 h-48 mx-auto relative">
            {/* Background Circle */}
            <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
            
            {/* Progress Circle */}
            <svg className="w-full h-full transform -rotate-90 absolute inset-0">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className={`transition-all duration-1000 ${isWarning ? 'text-red-400' : 'text-electric'}`}
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-center ${isWarning ? 'animate-pulse' : ''}`}>
                <div className={`text-3xl font-bold ${isWarning ? 'text-red-400' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {duration} min workout
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress 
            value={progress} 
            className={`h-2 ${isWarning ? 'bg-red-900' : 'bg-gray-700'}`}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {!hasStarted ? (
            <button
              onClick={handleStart}
              className="bg-electric hover:bg-electric/80 text-black p-4 rounded-full transition-all duration-200 hover:scale-105"
            >
              <Play size={24} fill="currentColor" />
            </button>
          ) : (
            <>
              <button
                onClick={isRunning ? handlePause : handleStart}
                className="bg-electric hover:bg-electric/80 text-black p-3 rounded-full transition-all duration-200 hover:scale-105"
              >
                {isRunning ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
              </button>
              
              <button
                onClick={handleReset}
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200 hover:scale-105"
              >
                <RotateCcw size={20} />
              </button>
            </>
          )}
          
          <button
            onClick={handleStop}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all duration-200 hover:scale-105"
          >
            <Square size={20} />
          </button>
        </div>

        {/* Warning Message */}
        {isWarning && timeLeft > 0 && (
          <div className="text-center mt-4">
            <p className="text-red-400 font-semibold animate-pulse">
              Almost done! Keep going! 💪
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutTimer;
