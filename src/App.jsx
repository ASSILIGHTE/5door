import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { surpriseData } from './data/surpriseData';
import { audioManager } from './utils/audioManager';

import { ParticleCanvas } from './components/ParticleCanvas';
import { MusicButton } from './components/MusicButton';
import { ProgressIndicator } from './components/ProgressIndicator';

import { OpeningScreen } from './components/OpeningScreen';
import { DoorRoom } from './components/DoorRoom';
import { Door1Memory } from './components/doors/Door1Memory';
import { Door2Secret } from './components/doors/Door2Secret';
import { Door3Message } from './components/doors/Door3Message';
import { Door4Promise } from './components/doors/Door4Promise';
import { Door5Surprise } from './components/doors/Door5Surprise';
import { FinalScreen } from './components/FinalScreen';

export default function App() {
  const [scene, setScene] = useState('opening'); // 'opening' | 'room' | 'door1' | 'door2' | 'door3' | 'door4' | 'door5' | 'final'
  const [completedDoors, setCompletedDoors] = useState([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Toggle background music
  const handleToggleMusic = () => {
    const newState = audioManager.toggle();
    setIsMusicPlaying(newState);
  };

  // Start experience from opening screen
  const handleEnterRoom = () => {
    audioManager.play();
    setIsMusicPlaying(true);
    setScene('room');
  };

  // Mark door as completed and progress to next door or room
  const handleCompleteDoor = (doorId, nextScene) => {
    setCompletedDoors((prev) => (prev.includes(doorId) ? prev : [...prev, doorId]));
    if (nextScene) {
      setScene(nextScene);
    } else {
      setScene('room');
    }
  };

  // Reset journey
  const handleReplay = () => {
    setCompletedDoors([]);
    setScene('opening');
  };

  // Determine current step index for header (1 to 5)
  const currentStep = completedDoors.length + 1;

  // Render active scene with cinematic smooth transitions
  const renderScene = () => {
    switch (scene) {
      case 'opening':
        return (
          <OpeningScreen
            key="opening"
            data={surpriseData.opening}
            onEnter={handleEnterRoom}
          />
        );

      case 'room':
        return (
          <DoorRoom
            key="room"
            doorsData={surpriseData.doors}
            completedDoors={completedDoors}
            onSelectDoor={(doorId) => setScene(`door${doorId}`)}
          />
        );

      case 'door1':
        return (
          <Door1Memory
            key="door1"
            doorData={surpriseData.doors[0]}
            onNext={() => handleCompleteDoor(1, 'room')}
          />
        );

      case 'door2':
        return (
          <Door2Secret
            key="door2"
            doorData={surpriseData.doors[1]}
            onNext={() => handleCompleteDoor(2, 'room')}
          />
        );

      case 'door3':
        return (
          <Door3Message
            key="door3"
            doorData={surpriseData.doors[2]}
            onNext={() => handleCompleteDoor(3, 'room')}
          />
        );

      case 'door4':
        return (
          <Door4Promise
            key="door4"
            doorData={surpriseData.doors[3]}
            onNext={() => handleCompleteDoor(4, 'room')}
          />
        );

      case 'door5':
        return (
          <Door5Surprise
            key="door5"
            doorData={surpriseData.doors[4]}
            onCompleteFinal={() => handleCompleteDoor(5, 'final')}
          />
        );

      case 'final':
        return (
          <FinalScreen
            key="final"
            finalData={surpriseData.finalScreen}
            onReplay={handleReplay}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#08080D] text-[#FFF4EA] relative overflow-x-hidden font-sans selection:bg-[#7A2438] selection:text-[#FFF4EA]">
      {/* Background Particle Canvas */}
      <ParticleCanvas intensity={scene === 'door4' || scene === 'door5' ? 'high' : 'normal'} />

      {/* Cinematic Vignette Overlay */}
      <div className="vignette-overlay" />

      {/* Top Bar Progress Indicator (visible in room and doors) */}
      {scene !== 'opening' && scene !== 'final' && (
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={5}
          completedDoors={completedDoors}
          onBackToRoom={() => setScene('room')}
          showBackButton={scene.startsWith('door')}
        />
      )}

      {/* Main Animated Scene Container */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderScene()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Music Toggle Button (bottom right) */}
      <MusicButton
        isPlaying={isMusicPlaying}
        onToggle={handleToggleMusic}
      />
    </div>
  );
}
