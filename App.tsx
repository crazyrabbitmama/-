import React, { useState, useEffect, useRef } from 'react';
import { GamePhase, GameState, ActionType, PlayerStats, GameEvent, EndingType } from './types';
import { EVENTS, SPECIAL_EVENTS, INTERVIEWS, INITIAL_STATS, ENDING_DETAILS } from './constants';
import { PixelButton, PixelCard, StatBar, NoodleGirlAvatar, BlackHole, PixelPattern, PixelPhone, EndingVisual } from './components/PixelComponents';
import { audio } from './services/audio';
import { 
  Briefcase, BookOpen, MessageCircle, Coffee, Home, User, 
  Volume2, VolumeX, RefreshCcw, Loader2, Sparkles, Star, Trophy, X, Phone, HelpCircle, Shirt
} from 'lucide-react';

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // 0: Init
    const t1 = setTimeout(() => setStage(1), 500); // Hole opens
    const t2 = setTimeout(() => {
      setStage(2); // Girl Ejects
      audio.playSfx('jump');
    }, 1500);
    const t3 = setTimeout(() => {
      setStage(3); // Text Appears
      audio.playSfx('click');
    }, 2300);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-yellow-100 z-50 flex flex-col items-center justify-center overflow-hidden" onClick={stage >= 3 ? onComplete : undefined}>
       <PixelPattern />
       
       {/* Stage 1: Black Hole */}
       {stage >= 1 && (
         <div className="absolute top-1/4 animate-hole-open transition-all duration-500">
            <BlackHole className="w-32 h-32 md:w-48 md:h-48" />
         </div>
       )}

       {/* Stage 2: Girl Ejects */}
       {stage >= 2 && (
         <div className="animate-eject z-10">
            <NoodleGirlAvatar pose="panic" className="w-48 h-48 md:w-64 md:h-64" />
         </div>
       )}

       {/* Stage 3: Text Box */}
       {stage >= 3 && (
         <div className="mt-8 animate-pop-in z-20 w-full max-w-sm px-6">
            <PixelCard>
               <p className="text-center font-bold text-lg md:text-xl leading-relaxed">
                 重生后你选择在面店<br/>打工煮挂面<br/>同时准备实习
               </p>
               <div className="mt-4 text-center text-xs text-gray-500 animate-pulse">
                 (点击屏幕继续)
               </div>
            </PixelCard>
         </div>
       )}
    </div>
  );
};

const EndingsGallery = ({ unlocked, onClose }: { unlocked: string[], onClose: () => void }) => {
  const endings = Object.values(EndingType);
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-4 border-black h-[80vh] flex flex-col relative shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
        <div className="bg-yellow-300 p-3 border-b-4 border-black flex justify-between items-center">
          <div className="flex items-center font-bold text-lg">
            <Trophy className="mr-2" />
            成就一览 ({unlocked.length}/{endings.length})
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white border-2 border-transparent hover:border-black rounded">
            <X size={24}/>
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 flex-1 custom-scrollbar bg-gray-50">
           {endings.map((type) => {
             const isUnlocked = unlocked.includes(type);
             const details = ENDING_DETAILS[type];
             
             return (
               <div key={type} className={`mb-4 border-2 border-black p-3 relative ${isUnlocked ? 'bg-white' : 'bg-gray-200 opacity-80'}`}>
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold">{details.title}</h3>
                   {isUnlocked && <Star size={16} className="text-yellow-500 fill-yellow-500"/>}
                 </div>
                 
                 {isUnlocked ? (
                   <p className="text-sm text-gray-700">{details.description}</p>
                 ) : (
                   <div className="text-xs text-gray-500 flex flex-col gap-1">
                      <p className="italic">??? (未达成)</p>
                      <p className="font-mono text-[10px] bg-gray-300 inline-block px-1 py-0.5 rounded self-start">提示: {details.hint}</p>
                   </div>
                 )}
               </div>
             );
           })}
        </div>
      </div>
    </div>
  );
};

const GameInstructions = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
    <PixelCard className="w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl relative">
       <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2 bg-yellow-50 -mx-4 -mt-4 p-4 rounded-t-sm">
         <h2 className="text-xl font-bold flex items-center gap-2"><BookOpen size={24}/> 游戏说明</h2>
         <button onClick={onClose} className="hover:scale-110 transition-transform"><X size={24}/></button>
       </div>
       <div className="space-y-5 text-sm leading-relaxed text-gray-800">
         <p><strong>🎯 目标：</strong> 重生回面馆打工，在6周内平衡生活与求职，达成不同的人生结局。</p>
         
         <div className="bg-blue-50 p-3 border-2 border-blue-100 rounded">
           <strong className="block mb-2 text-blue-800">📅 游戏流程：</strong>
           <ul className="list-disc pl-5 space-y-1">
             <li>每周 <strong>周一至周六</strong>，每天选择一次行动（打工、学习等）。</li>
             <li><strong>周日</strong> 触发面试挑战，通过可推进大厂路线。</li>
             <li>持续 6 周后，根据属性进入最终结局。</li>
           </ul>
         </div>

         <div>
           <strong className="block mb-2">📊 关键属性：</strong>
           <ul className="space-y-2">
             <li className="flex items-center gap-2"><span className="w-2 h-2 bg-pink-400 rounded-full inline-block"></span> <span><strong>Mood (心态)</strong>: <span className="text-red-500">归零即游戏结束！</span>请保持心情愉悦。</span></li>
             <li className="flex items-center gap-2"><span className="w-2 h-2 bg-yellow-400 rounded-full inline-block"></span> <span><strong>Money (生活费)</strong>: 打工赚取，没钱寸步难行。</span></li>
             <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-400 rounded-full inline-block"></span> <span><strong>Skill (专业)</strong>: 影响后期高级面试。</span></li>
             <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> <span><strong>Comm (沟通)</strong>: 影响初期面试与社交。</span></li>
           </ul>
         </div>

         <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
           <strong>✨ 提示：</strong> 共有9种结局等待探索。小心陌生来电，那可能是陷阱，也可能是机遇！
         </div>
       </div>
       <div className="mt-6">
         <PixelButton onClick={onClose} color="bg-yellow-300">
           我准备好了！
         </PixelButton>
       </div>
    </PixelCard>
  </div>
);

export default function App() {
  const [showBootAnim, setShowBootAnim] = useState(true);

  // Game State
  const [gameState, setGameState] = useState<GameState>({
    phase: GamePhase.INTRO,
    week: 1,
    day: 1,
    stats: { ...INITIAL_STATS },
    history: [],
    passedInterviews: 0,
    currentEvent: null,
    currentEventResultText: '',
    currentEventImage: null,
    isGenerating: false,
    ending: null,
    outfit: 'casual'
  });

  const [isMuted, setIsMuted] = useState(false);
  
  // Interview UI States
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [interviewResult, setInterviewResult] = useState<{passed: boolean, title: string} | null>(null);

  // Scam Call States
  const [callState, setCallState] = useState<'ringing' | 'dialog'>('ringing');

  // Ending Gallery
  const [showGallery, setShowGallery] = useState(false);
  const [unlockedEndings, setUnlockedEndings] = useState<string[]>([]);
  
  // Instructions Modal
  const [showInstructions, setShowInstructions] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Ref to track if BGM has started
  const bgmStarted = useRef(false);

  useEffect(() => {
    // Load unlocked endings
    const stored = localStorage.getItem('unlocked_endings');
    if (stored) {
      try {
        setUnlockedEndings(JSON.parse(stored));
      } catch (e) { console.error('Failed to load endings'); }
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [gameState.history]);

  // Handle scam ringing effect
  useEffect(() => {
    let interval: number;
    if (gameState.phase === GamePhase.SCAM_CALL && callState === 'ringing') {
        interval = window.setInterval(() => {
            audio.playSfx('phone');
        }, 1500);
    }
    return () => clearInterval(interval);
  }, [gameState.phase, callState]);

  // --- Logic Helpers ---

  const updateStats = (effects: Partial<PlayerStats>) => {
    setGameState(prev => {
      const newStats = { ...prev.stats };
      (Object.keys(effects) as Array<keyof PlayerStats>).forEach(key => {
        if (effects[key] !== undefined) {
          newStats[key] = Math.max(0, newStats[key] + (effects[key] || 0));
        }
      });
      return { ...prev, stats: newStats };
    });
  };

  const logEvent = (text: string) => {
    setGameState(prev => ({
      ...prev,
      history: [...prev.history, `Week ${prev.week} Day ${prev.day}: ${text}`]
    }));
  };

  const checkEnding = (stats: PlayerStats, passed: number): EndingType | null => {
    if (stats.mood <= 0) return EndingType.BE1;
    if (stats.family <= -20) return EndingType.BE2; 
    
    // Check final endings after Week 6
    if (gameState.week > 6) {
      if (stats.family >= 80) return EndingType.GE3;
      if (stats.skill >= 60 && stats.comm >= 55 && stats.mood >= 20 && passed >= 5) return EndingType.GE1;
      
      if (stats.mood >= 70 && stats.skill >= 30 && stats.comm >= 30) return EndingType.GE4;
      if (stats.skill < 20 && stats.comm < 20 && passed === 0) return EndingType.BE3;
      
      return EndingType.NE;
    }
    return null;
  };

  const handleAction = async (action: ActionType) => {
    if (gameState.isGenerating) return; 

    audio.playSfx('click');
    
    // 1. Pick Event
    let pool = EVENTS[action];
    let event = pool[Math.floor(Math.random() * pool.length)];
    
    // 15% Chance for Special Female Job Event
    if (Math.random() < 0.15) {
      const specialPool = SPECIAL_EVENTS.FEMALE_JOB;
      event = specialPool[Math.floor(Math.random() * specialPool.length)];
    }

    // 2. Determine Pose based on Action
    let pose = 'normal';
    switch(action) {
        case ActionType.WORK: pose = 'work'; break;
        case ActionType.STUDY: pose = 'study'; break;
        case ActionType.RELAX: pose = 'relax'; break;
        case ActionType.COMM: pose = 'happy'; break;
        default: pose = 'normal';
    }
    
    // Override pose for bad events
    if ((event.effects.mood || 0) < -2) pose = 'panic';
    if ((event.effects.mood || 0) < -8) pose = 'dead';


    // 3. Apply Effects
    updateStats(event.effects);
    logEvent(event.title);
    
    // 4. Play SFX
    if ((event.effects.mood || 0) < 0) audio.playSfx('error');
    else if ((event.effects.mood || 0) > 5) audio.playSfx('slurp'); 
    
    // 5. Update State with Result (Instant)
    setGameState(prev => ({
      ...prev,
      phase: GamePhase.EVENT_RESULT,
      currentEvent: event,
      currentEventResultText: event.text,
      currentEventImage: pose, // Storing the pose name here
      isGenerating: false
    }));
  };

  const closeEventModal = () => {
    setGameState(prev => {
      // Check for immediate game over (Mood <= 0)
      if (prev.stats.mood <= 0) {
        saveEnding(EndingType.BE1);
        return { ...prev, phase: GamePhase.ENDING, ending: EndingType.BE1 };
      }
      if (prev.stats.family <= -20) {
        saveEnding(EndingType.BE2);
        return { ...prev, phase: GamePhase.ENDING, ending: EndingType.BE2 };
      }
      
      const nextDay = prev.day + 1;

      // Special Event Trigger: Week 2, Day 3
      if (prev.week === 2 && nextDay === 3) {
         setCallState('ringing');
         return { ...prev, phase: GamePhase.SCAM_CALL, day: nextDay, currentEvent: null };
      }

      if (nextDay > 6) {
        return { ...prev, phase: GamePhase.INTERVIEW, currentEvent: null, currentEventImage: null };
      }
      return { ...prev, phase: GamePhase.WEEKLY_LOOP, day: nextDay, currentEvent: null, currentEventImage: null };
    });
  };

  const handleInterview = () => {
    if (isInterviewing) return; // Prevent double clicks
    setIsInterviewing(true);

    const interview = INTERVIEWS[gameState.week - 1];
    if (!interview) {
      finishGame();
      return;
    }

    const passed = interview.passCondition(gameState.stats);
    
    // Show result immediately
    setInterviewResult({ passed, title: interview.title });

    if (passed) {
      audio.playSfx('success');
      setGameState(prev => ({ ...prev, passedInterviews: prev.passedInterviews + 1 }));
      logEvent(`通过面试: ${interview.title}`);
    } else {
      audio.playSfx('fail');
      updateStats(interview.failPenalty);
      logEvent(`面试失败: ${interview.title}`);
    }

    // Show result briefly or move to next week
    setTimeout(() => {
      setIsInterviewing(false); // Reset lock
      setInterviewResult(null); // Reset result display

      if (gameState.week >= 6) {
        finishGame();
      } else {
        setGameState(prev => ({
          ...prev,
          week: prev.week + 1,
          day: 1,
          phase: GamePhase.WEEKLY_LOOP
        }));
      }
    }, 2000); 
  };
  
  const handleScamChoice = (accept: boolean) => {
    audio.playSfx('click');
    if (!accept) {
      // Reject
      updateStats({ skill: 5 });
      logEvent('接到神秘电话，理智拒绝，技能+5');
      setGameState(prev => ({ ...prev, phase: GamePhase.WEEKLY_LOOP }));
    } else {
      // Accept
      if (Math.random() < 0.5) {
        // Bad Ending
        audio.playSfx('fail');
        setGameState(prev => ({ 
             ...prev, 
             stats: { ...prev.stats, money: 0 },
             phase: GamePhase.ENDING,
             ending: EndingType.BE4
        }));
        saveEnding(EndingType.BE4);
      } else {
        // Good Outcome
        audio.playSfx('success');
        updateStats({ skill: 10 });
        logEvent('神秘导师竟然是真的！技能突飞猛进。');
        setGameState(prev => ({ ...prev, phase: GamePhase.WEEKLY_LOOP }));
      }
    }
  };

  const saveEnding = (ending: EndingType) => {
     if (!unlockedEndings.includes(ending)) {
        const newUnlocked = [...unlockedEndings, ending];
        setUnlockedEndings(newUnlocked);
        localStorage.setItem('unlocked_endings', JSON.stringify(newUnlocked));
     }
  };

  const finishGame = () => {
    setGameState(prev => {
       let ending = checkEnding(prev.stats, prev.passedInterviews);
       
       if (!ending || ending === EndingType.NE) {
          // Check lottery randomly (30%)
          if (Math.random() < 0.3) ending = EndingType.GE2;
          else ending = checkEnding(prev.stats, prev.passedInterviews) || EndingType.NE;
       }
       
       saveEnding(ending);
       return { ...prev, phase: GamePhase.ENDING, ending: ending };
    });
  };

  const restartGame = () => {
    setIsInterviewing(false);
    setInterviewResult(null);
    setGameState({
      phase: GamePhase.INTRO,
      week: 1,
      day: 1,
      stats: { ...INITIAL_STATS },
      history: [],
      passedInterviews: 0,
      currentEvent: null,
      currentEventResultText: '',
      currentEventImage: null,
      isGenerating: false,
      ending: null,
      outfit: 'casual'
    });
  };

  const startGame = () => {
      if (!bgmStarted.current) {
          audio.playBGM();
          bgmStarted.current = true;
      }
      // Replaced WEEKLY_LOOP with CHARACTER_SELECT
      setGameState(prev => ({ ...prev, phase: GamePhase.CHARACTER_SELECT }));
      audio.playSfx('jump');
  };

  const setOutfit = (outfit: 'casual' | 'sailor') => {
      audio.playSfx('click');
      setGameState(prev => ({ ...prev, outfit }));
  };

  const confirmOutfit = () => {
      audio.playSfx('success');
      setGameState(prev => ({ ...prev, phase: GamePhase.WEEKLY_LOOP }));
  };

  // --- Renders ---

  // Determine Main Avatar Pose based on status
  const mainAvatarPose = 
     gameState.stats.mood < 30 ? 'dead' : 
     gameState.stats.mood < 60 ? 'panic' : 
     'normal';
  
  if (showBootAnim) {
    return <BootSequence onComplete={() => setShowBootAnim(false)} />;
  }

  if (gameState.phase === GamePhase.INTRO) {
    return (
      <div 
        className="h-screen w-full flex flex-col items-center justify-center bg-yellow-100 p-4 relative overflow-hidden"
        onClick={startGame}
      >
        <PixelPattern />
        
        {showInstructions && <GameInstructions onClose={() => setShowInstructions(false)} />}

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 animate-bounce delay-100 text-3xl opacity-50">🍜</div>
        <div className="absolute bottom-20 right-10 animate-pulse delay-700 text-3xl opacity-50">🍜</div>
        <div className="absolute top-1/2 left-4 animate-float delay-300 text-2xl opacity-30">⭐</div>
        <div className="absolute top-1/3 right-8 animate-float delay-500 text-2xl opacity-30">✨</div>

        <div className="animate-[spin_3s_linear_infinite] mb-8 scale-150 z-10 relative">
           {/* Intro Character - Happy */}
           <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xl opacity-50"></div>
           <NoodleGirlAvatar pose="happy" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 text-center pixel-font leading-tight text-orange-500 pixel-text-shadow z-10 relative">
          重生之<br/>我是挂面大王
        </h1>
        <p className="text-sm md:text-xl font-bold mb-12 animate-pulse text-gray-600 z-10 relative">点击屏幕开始打工</p>
        
        {/* Instructions Button */}
        <div className="absolute bottom-12 z-20">
            <button 
                onClick={(e) => { e.stopPropagation(); setShowInstructions(true); }}
                className="bg-white border-2 border-black px-4 py-2 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all flex items-center gap-2 font-bold text-sm"
            >
                <HelpCircle size={18} /> 游戏说明
            </button>
        </div>

        <div className="absolute bottom-4 text-xs text-gray-400">Gemini Nano Powered Logic</div>
      </div>
    );
  }

  // Character Select Screen
  if (gameState.phase === GamePhase.CHARACTER_SELECT) {
      return (
          <div className="h-screen w-full flex flex-col items-center justify-center bg-blue-50 p-6 relative overflow-hidden">
              <PixelPattern />
              <h2 className="text-2xl font-black mb-8 z-10">选择你的战袍</h2>
              
              <div className="flex gap-6 mb-8 z-10">
                  {/* Casual Option */}
                  <div 
                     onClick={() => setOutfit('casual')}
                     className={`cursor-pointer p-4 border-4 ${gameState.outfit === 'casual' ? 'border-orange-500 bg-orange-100 scale-105 shadow-[4px_4px_0px_0px_rgba(255,165,0,0.5)]' : 'border-black bg-white hover:bg-gray-50'} transition-all rounded-lg flex flex-col items-center`}
                  >
                      <NoodleGirlAvatar pose="normal" outfit="casual" className="w-32 h-32" />
                      <span className="font-bold mt-2">经典打工</span>
                  </div>

                  {/* Sailor Option */}
                  <div 
                     onClick={() => setOutfit('sailor')}
                     className={`cursor-pointer p-4 border-4 ${gameState.outfit === 'sailor' ? 'border-blue-500 bg-blue-100 scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,255,0.5)]' : 'border-black bg-white hover:bg-gray-50'} transition-all rounded-lg flex flex-col items-center`}
                  >
                      <NoodleGirlAvatar pose="normal" outfit="sailor" className="w-32 h-32" />
                      <span className="font-bold mt-2">水手服</span>
                  </div>
              </div>

              {/* Description / OS */}
              <div className="h-16 mb-8 z-10 w-full max-w-sm text-center">
                  {gameState.outfit === 'sailor' && (
                      <div className="animate-pop-in bg-white border-2 border-black p-3 rounded-lg relative inline-block shadow-md">
                          <p className="text-sm font-medium text-blue-800">
                             (OS) 或许还可以做团播...💃
                          </p>
                          {/* Speech bubble tail */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t-2 border-l-2 border-black transform rotate-45"></div>
                      </div>
                  )}
              </div>

              <div className="w-full max-w-xs z-10">
                  <PixelButton onClick={confirmOutfit} color="bg-green-400">
                      确认出发 <Shirt className="ml-2 w-4 h-4 inline"/>
                  </PixelButton>
              </div>
          </div>
      );
  }

  if (gameState.phase === GamePhase.ENDING) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-purple-100 p-6 text-center relative overflow-hidden">
        <PixelPattern />
        
        {showGallery && <EndingsGallery unlocked={unlockedEndings} onClose={() => setShowGallery(false)} />}

        {/* Use EndingVisual instead of generic avatar */}
        <div className="mb-8 scale-125 z-10">
            <EndingVisual type={gameState.ending || EndingType.NE} />
        </div>
        
        <h2 className="text-3xl font-bold mb-4 z-10">结局达成</h2>
        <div className="bg-white border-4 border-black p-6 rounded-lg mb-8 shadow-xl z-10 max-w-sm w-full relative">
          <div className="absolute -top-3 -right-3 text-4xl animate-bounce">🏆</div>
          <h1 className="text-3xl font-black text-purple-600 mb-2 break-words">
             {ENDING_DETAILS[gameState.ending || EndingType.NE].title}
          </h1>
          <p className="text-gray-600 text-sm">
             {ENDING_DETAILS[gameState.ending || EndingType.NE].description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-left w-full max-w-md mb-8 bg-white/50 p-4 border-2 border-black border-dashed z-10">
            <div>Skill: {gameState.stats.skill}</div>
            <div>Comm: {gameState.stats.comm}</div>
            <div>Mood: {gameState.stats.mood}</div>
            <div>Family: {gameState.stats.family}</div>
        </div>

        <div className="w-full max-w-xs z-10 space-y-3">
             <PixelButton onClick={() => setShowGallery(true)} color="bg-yellow-300">
               成就一览 <Trophy className="ml-2 w-4 h-4"/>
            </PixelButton>
            <PixelButton onClick={restartGame} color="bg-green-300">
              再活一次 <RefreshCcw className="ml-2 w-4 h-4"/>
            </PixelButton>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-orange-50 flex flex-col relative shadow-2xl overflow-hidden">
      <PixelPattern />
      
      {/* Header */}
      <div className="p-3 border-b-4 border-black bg-white flex justify-between items-center z-20 shadow-sm">
        <div className="flex flex-col">
          <span className="font-bold text-lg">Week {gameState.week}</span>
          <span className="text-xs text-gray-500">Day {gameState.day}/7</span>
        </div>
        <button onClick={() => { audio.toggleMute(); setIsMuted(!isMuted); }} className="p-2 border-2 border-black hover:bg-gray-100 active:translate-y-1 transition-all">
           {isMuted ? <VolumeX size={20}/> : <Volume2 size={20}/>}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 relative z-10 custom-scrollbar">
        
        {/* Character Visual */}
        <div className="mb-6 flex justify-center py-4 bg-yellow-50 border-2 border-black border-dashed rounded-lg relative">
           <div className="absolute top-2 left-2 text-orange-200 opacity-50"><Sparkles size={16}/></div>
           <div className="absolute bottom-2 right-2 text-orange-200 opacity-50"><Sparkles size={16}/></div>
           {/* Pass outfit to avatar */}
           <NoodleGirlAvatar pose={mainAvatarPose} outfit={gameState.outfit} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 bg-white p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <StatBar label="Skill (专业)" value={gameState.stats.skill} color="bg-blue-400" />
          <StatBar label="Comm (沟通)" value={gameState.stats.comm} color="bg-green-400" />
          <StatBar label="Mood (心态)" value={gameState.stats.mood} color="bg-pink-400" />
          <StatBar label="Family (家庭)" value={gameState.stats.family} color="bg-purple-400" />
          <StatBar label="Money (生活费)" value={gameState.stats.money} color="bg-yellow-400" max={200} />
        </div>

        {/* Action Grid */}
        {gameState.phase === GamePhase.WEEKLY_LOOP && (
          <div className="grid grid-cols-2 gap-3">
            <PixelButton disabled={gameState.isGenerating} onClick={() => handleAction(ActionType.WORK)} color="bg-red-200">
              <Coffee className="mr-2 w-5 h-5" /> 打工
            </PixelButton>
            <PixelButton disabled={gameState.isGenerating} onClick={() => handleAction(ActionType.STUDY)} color="bg-blue-200">
              <BookOpen className="mr-2 w-5 h-5" /> 学习
            </PixelButton>
            <PixelButton disabled={gameState.isGenerating} onClick={() => handleAction(ActionType.COMM)} color="bg-green-200">
              <MessageCircle className="mr-2 w-5 h-5" /> 沟通
            </PixelButton>
            <PixelButton disabled={gameState.isGenerating} onClick={() => handleAction(ActionType.RELAX)} color="bg-pink-200">
              <User className="mr-2 w-5 h-5" /> 放松
            </PixelButton>
            <PixelButton disabled={gameState.isGenerating} onClick={() => handleAction(ActionType.FAMILY)} color="bg-purple-200">
              <Home className="mr-2 w-5 h-5" /> 回家
            </PixelButton>
             <PixelButton disabled={gameState.isGenerating} onClick={() => handleAction(ActionType.PORTFOLIO)} color="bg-gray-200">
              <Briefcase className="mr-2 w-5 h-5" /> 作品集
            </PixelButton>
          </div>
        )}
        
        {/* Interview Phase UI */}
        {gameState.phase === GamePhase.INTERVIEW && (
           <div className="bg-blue-100 border-4 border-black p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
             <h3 className="text-xl font-bold mb-4">WEEKEND INTERVIEW</h3>
             
             {!isInterviewing ? (
                 <>
                    <p className="mb-4">Boss: {INTERVIEWS[gameState.week - 1]?.title}</p>
                    <NoodleGirlAvatar pose="interview" outfit={gameState.outfit} className="scale-75 mb-4 mx-auto"/>
                    <PixelButton onClick={handleInterview} color="bg-red-400">
                        开始面试
                    </PixelButton>
                 </>
             ) : (
                 <div className="animate-bounce">
                     <p className="mb-4 text-lg font-bold">
                         {interviewResult?.passed ? "面试通过！🎉" : "面试失败...😭"}
                     </p>
                     <NoodleGirlAvatar pose={interviewResult?.passed ? "happy" : "dead"} outfit={gameState.outfit} className="scale-75 mb-4 mx-auto"/>
                     <p className="text-sm text-gray-500">
                        {interviewResult?.passed ? "下周继续加油！" : "心态有点崩..."}
                     </p>
                 </div>
             )}
           </div>
        )}

        {/* SCAM CALL UI */}
        {gameState.phase === GamePhase.SCAM_CALL && (
           <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
             <PixelCard className="w-full max-w-sm">
                {callState === 'ringing' ? (
                  <div className="flex flex-col items-center py-8 cursor-pointer" onClick={() => setCallState('dialog')}>
                     <PixelPhone className="w-32 h-32 mb-6" ringing={true} />
                     <h2 className="text-xl font-bold animate-pulse text-red-500">神秘来电...</h2>
                     <p className="text-xs text-gray-500 mt-2">(点击接听)</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                     <div className="flex items-center gap-2 mb-4">
                        <Phone size={24} />
                        <span className="font-bold">神秘人</span>
                     </div>
                     <p className="text-lg font-bold text-center mb-8">
                       “你需要求职陪跑吗？<br/>保过大厂，不过退费！”
                     </p>
                     <div className="w-full space-y-3">
                       <PixelButton onClick={() => handleScamChoice(true)} color="bg-green-300">
                          需要! (抓住救命稻草)
                       </PixelButton>
                       <PixelButton onClick={() => handleScamChoice(false)} color="bg-red-300">
                          不需要 (这就是诈骗)
                       </PixelButton>
                     </div>
                  </div>
                )}
             </PixelCard>
           </div>
        )}

      </div>

      {/* History Log (Mini) */}
      <div className="h-24 bg-black p-2 overflow-y-auto text-green-400 font-mono text-xs border-t-4 border-gray-600 relative z-20" ref={scrollRef}>
        {gameState.history.map((h, i) => (
          <div key={i}>{`> ${h}`}</div>
        ))}
        {gameState.history.length === 0 && <div>> 系统就绪...</div>}
      </div>

      {/* Event Modal Overlay */}
      {gameState.phase === GamePhase.EVENT_RESULT && (
        <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <PixelCard className="w-full max-w-sm animate-float max-h-[90vh] overflow-y-auto shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
             <h3 className="text-xl font-bold mb-2 border-b-2 border-black pb-2">
               {gameState.currentEvent?.title}
             </h3>
             
             {/* AVATAR SCENE DISPLAY */}
             <div className="w-full aspect-square bg-yellow-100 border-2 border-black mb-4 flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[length:8px_8px]"></div>
                 <NoodleGirlAvatar pose={gameState.currentEventImage as any || 'normal'} outfit={gameState.outfit} />
             </div>

             <p className="text-lg mb-6 whitespace-pre-wrap font-medium leading-relaxed">
               {gameState.currentEventResultText}
             </p>
             
             {/* Effect Indicators */}
             <div className="flex flex-wrap gap-2 mb-6 text-xs">
                {gameState.currentEvent?.effects.skill && <span className="bg-blue-200 border border-black px-1">Skill {gameState.currentEvent.effects.skill > 0 ? '+' : ''}{gameState.currentEvent.effects.skill}</span>}
                {gameState.currentEvent?.effects.comm && <span className="bg-green-200 border border-black px-1">Comm {gameState.currentEvent.effects.comm > 0 ? '+' : ''}{gameState.currentEvent.effects.comm}</span>}
                {gameState.currentEvent?.effects.mood && <span className="bg-pink-200 border border-black px-1">Mood {gameState.currentEvent.effects.mood > 0 ? '+' : ''}{gameState.currentEvent.effects.mood}</span>}
                {gameState.currentEvent?.effects.money && <span className="bg-yellow-200 border border-black px-1">Money {gameState.currentEvent.effects.money > 0 ? '+' : ''}{gameState.currentEvent.effects.money}</span>}
                {gameState.currentEvent?.effects.family && <span className="bg-purple-200 border border-black px-1">Family {gameState.currentEvent.effects.family > 0 ? '+' : ''}{gameState.currentEvent.effects.family}</span>}
             </div>

             <PixelButton onClick={closeEventModal}>
               确认
             </PixelButton>
          </PixelCard>
        </div>
      )}

    </div>
  );
}