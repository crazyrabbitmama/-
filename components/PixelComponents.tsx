import React from 'react';

// Ugly-cute color palette wrappers
export const PixelCard = ({ children, className = '', color = 'bg-white' }: { children?: React.ReactNode, className?: string, color?: string }) => (
  <div className={`relative ${className}`}>
    <div className={`absolute inset-0 bg-black translate-x-1 translate-y-1`}></div>
    <div className={`relative ${color} border-2 border-black p-4 h-full`}>
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-1 h-1 bg-white"></div>
      <div className="absolute top-0 right-0 w-1 h-1 bg-white"></div>
      <div className="absolute bottom-0 left-0 w-1 h-1 bg-white"></div>
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-white"></div>
      {children}
    </div>
  </div>
);

export const PixelButton = ({ onClick, children, className = '', disabled = false, color = 'bg-yellow-200' }: { onClick?: () => void, children?: React.ReactNode, className?: string, disabled?: boolean, color?: string }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`group relative w-full ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-1 active:translate-x-1'}`}
  >
    <div className={`absolute inset-0 bg-black translate-x-1 translate-y-1 group-active:translate-x-0 group-active:translate-y-0 transition-transform`}></div>
    <div className={`relative ${color} border-2 border-black px-4 py-3 font-bold text-black group-hover:bg-yellow-100 transition-colors flex items-center justify-center`}>
      {/* Inner border for extra crunch */}
      <div className="absolute inset-0.5 border-2 border-white/20 pointer-events-none"></div>
      {children}
    </div>
  </button>
);

export const StatBar = ({ label, value, max = 100, color = 'bg-green-400' }: { label: string, value: number, max?: number, color?: string }) => {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1 font-bold">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-4 border-2 border-black bg-gray-100 relative">
        <div 
          className={`h-full ${color} transition-all duration-300 border-r-2 border-black`}
          style={{ width: `${percent}%` }}
        ></div>
        {/* Pixel shine effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-black opacity-10"></div>
      </div>
    </div>
  );
};

export const PixelPattern = () => (
    <div 
        className="absolute inset-0 pointer-events-none opacity-5 z-0"
        style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '16px 16px'
        }}
    ></div>
);

export const BlackHole = ({ className = '' }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_3s_linear_infinite]">
       <defs>
         <radialGradient id="holeGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#000" />
            <stop offset="80%" stopColor="#222" />
            <stop offset="100%" stopColor="transparent" />
         </radialGradient>
       </defs>
       <circle cx="50" cy="50" r="45" fill="url(#holeGrad)" />
       <path d="M50 50 Q 80 20 90 50" stroke="white" strokeWidth="2" fill="none" strokeDasharray="5,5" className="opacity-50" />
       <path d="M50 50 Q 20 80 10 50" stroke="white" strokeWidth="2" fill="none" strokeDasharray="5,5" className="opacity-50" />
       <path d="M50 50 Q 20 20 50 10" stroke="white" strokeWidth="2" fill="none" strokeDasharray="5,5" className="opacity-50" />
       <path d="M50 50 Q 80 80 50 90" stroke="white" strokeWidth="2" fill="none" strokeDasharray="5,5" className="opacity-50" />
    </svg>
  </div>
);

export const PixelPhone = ({ className = '', ringing = false }: { className?: string, ringing?: boolean }) => (
  <div className={`relative ${className} ${ringing ? 'animate-[bounce_0.2s_infinite]' : ''}`}>
    <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-lg" shapeRendering="crispEdges">
      {/* Body */}
      <rect x="14" y="6" width="20" height="36" fill="#333" stroke="black" strokeWidth="2" />
      {/* Screen */}
      <rect x="16" y="10" width="16" height="22" fill={ringing ? '#88ccff' : '#444'} />
      {/* Button */}
      <circle cx="24" cy="38" r="2" fill="#555" />
      
      {/* Ringing Lines */}
      {ringing && (
        <g stroke="black" strokeWidth="2" fill="none" className="animate-pulse">
          <path d="M10 18 Q 6 24 10 30" />
          <path d="M38 18 Q 42 24 38 30" />
        </g>
      )}
      
      {/* Caller ID if ringing */}
      {ringing && (
         <g>
           <rect x="18" y="14" width="12" height="6" fill="#fff" />
           <rect x="20" y="16" width="8" height="2" fill="#000" opacity="0.2" />
         </g>
      )}
    </svg>
  </div>
);

export const EndingVisual = ({ type, className = '' }: { type: string, className?: string }) => {
    // Generate different backgrounds based on ending
    const getBgColor = () => {
        if (type.includes('BE')) return '#2d3748'; // Dark gray for bad end
        if (type.includes('NE')) return '#fbd38d'; // Orange for normal
        if (type === 'GE2') return '#1a202c'; // Night for Lottery
        if (type.includes('GE')) return '#fefcbf'; // Yellow for good
        return '#fff';
    };

    return (
        <div className={`relative w-64 h-64 border-4 border-black overflow-hidden ${className}`} style={{ backgroundColor: getBgColor() }}>
             {/* Background Elements */}
             {type === 'GE2' && ( // Lottery Night City View
                <>
                   <div className="absolute top-0 left-0 right-0 h-1/2 bg-indigo-900"></div>
                   {/* Stars */}
                   <rect x="10" y="10" width="2" height="2" fill="white" className="animate-pulse" />
                   <rect x="50" y="20" width="2" height="2" fill="white" className="animate-pulse delay-75" />
                   <rect x="80" y="5" width="2" height="2" fill="white" className="animate-pulse delay-150" />
                   {/* City Skyline */}
                   <rect x="0" y="40" width="20" height="60" fill="#2d3748" />
                   <rect x="25" y="30" width="30" height="70" fill="#4a5568" />
                   <rect x="60" y="50" width="20" height="50" fill="#2d3748" />
                   {/* Windows */}
                   <rect x="30" y="35" width="4" height="4" fill="yellow" opacity="0.5" />
                   <rect x="30" y="45" width="4" height="4" fill="yellow" opacity="0.5" />
                   {/* Balcony Railing */}
                   <rect x="0" y="80" width="100%" height="4" fill="#000" />
                   <rect x="10" y="84" width="4" height="20" fill="#000" />
                   <rect x="30" y="84" width="4" height="20" fill="#000" />
                   <rect x="50" y="84" width="4" height="20" fill="#000" />
                   <rect x="70" y="84" width="4" height="20" fill="#000" />
                   <rect x="90" y="84" width="4" height="20" fill="#000" />
                </>
             )}

             {type === 'GE3' && ( // Rich Family
                 <>
                    {/* Villa Columns */}
                    <rect x="10" y="10" width="10" height="90" fill="#fff" stroke="#ccc" />
                    <rect x="80" y="10" width="10" height="90" fill="#fff" stroke="#ccc" />
                    {/* Money raining */}
                    <text x="30" y="30" className="animate-bounce">💰</text>
                    <text x="50" y="50" className="animate-bounce delay-100">💰</text>
                 </>
             )}

             {/* Character Overlay */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 scale-75 origin-bottom">
                 <NoodleGirlAvatar pose={type.includes('BE') ? 'dead' : 'happy'} />
             </div>
        </div>
    );
};

export const NoodleGirlAvatar = ({ 
  pose = 'normal', 
  outfit = 'casual',
  className = "" 
}: { 
  pose?: 'normal' | 'work' | 'study' | 'relax' | 'panic' | 'dead' | 'happy' | 'interview', 
  outfit?: 'casual' | 'sailor',
  className?: string 
}) => {
  // Palette
  const c = {
    skin: '#ffe0bd',
    skinShadow: '#ffcd94',
    hair: '#333333',     // Dark Bob
    shirt: outfit === 'sailor' ? '#fdfdfd' : '#ffffff',    // White Shirt
    shirtShadow: '#dddddd',
    pants: outfit === 'sailor' ? '#1a237e' : '#556688',    // Blue/Grey Pants or Navy Skirt
    shoes: '#222222',
    pot: '#888888',
    potRim: '#aaaaaa',
    noodles: '#ffcc00',
    steam: 'rgba(255,255,255,0.6)',
    blush: '#ffaaaa',
    collar: '#1a237e', // Sailor collar
    bow: '#d32f2f'     // Sailor bow
  };

  return (
    <div className={`relative w-48 h-48 ${className}`}>
      <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-xl" shapeRendering="crispEdges">
        
        {/* SHADOW */}
        <ellipse cx="24" cy="44" rx="14" ry="3" fill="rgba(0,0,0,0.2)" />

        {/* --- BODY GROUP --- */}
        <g transform={pose === 'panic' ? 'translate(1, 0)' : ''}>
          
          {/* LEGS */}
          <rect x="20" y="32" width="3" height="10" fill={c.skin} />
          <rect x="25" y="32" width="3" height="10" fill={c.skin} />
          {/* Sailor Socks */}
          {outfit === 'sailor' && (
             <>
               <rect x="20" y="38" width="3" height="4" fill="#eee" />
               <rect x="25" y="38" width="3" height="4" fill="#eee" />
             </>
          )}
          
          {/* PANTS or SKIRT */}
          {outfit === 'sailor' ? (
             // Pleated Skirt
             <g>
                <path d="M19 28 L29 28 L30 36 L18 36 Z" fill={c.pants} />
                {/* Pleats */}
                <rect x="21" y="29" width="1" height="6" fill="rgba(0,0,0,0.2)" />
                <rect x="24" y="29" width="1" height="6" fill="rgba(0,0,0,0.2)" />
                <rect x="27" y="29" width="1" height="6" fill="rgba(0,0,0,0.2)" />
             </g>
          ) : (
             // Pants
             <rect x="19" y="28" width="10" height="6" fill={c.pants} />
          )}

          {/* TORSO (Shirt) */}
          <rect x="18" y="18" width="12" height="11" fill={c.shirt} />
          <rect x="18" y="18" width="1" height="11" fill={c.shirtShadow} /> 
          <rect x="29" y="18" width="1" height="11" fill={c.shirtShadow} />
          
          {outfit === 'casual' && (
            <>
              {/* Buttons */}
              <rect x="23.5" y="20" width="1" height="1" fill="#ddd" />
              <rect x="23.5" y="23" width="1" height="1" fill="#ddd" />
              <rect x="23.5" y="26" width="1" height="1" fill="#ddd" />
            </>
          )}

          {outfit === 'sailor' && (
             <>
               {/* Sailor Collar */}
               <path d="M18 18 L24 24 L30 18 L28 18 L24 22 L20 18 Z" fill={c.collar} />
               <rect x="19" y="18" width="10" height="1" fill={c.collar} opacity="0.2" /> {/* Trim */}
               {/* Red Bow */}
               <path d="M22 24 L26 24 L25 25 L23 25 Z" fill={c.bow} />
               <path d="M24 24 L22 26 L23 27 L24 25 L25 27 L26 26 Z" fill={c.bow} />
             </>
          )}

          {/* ARMS - Dynamic based on Pose */}
          {pose === 'work' || pose === 'normal' || pose === 'happy' ? (
             // Holding Pot
             <>
               <rect x="15" y="20" width="3" height="8" fill={c.shirt} transform="rotate(20 18 20)" />
               <rect x="30" y="20" width="3" height="8" fill={c.shirt} transform="rotate(-20 30 20)" />
               <circle cx="16" cy="29" r="2" fill={c.skin} />
               <circle cx="32" cy="29" r="2" fill={c.skin} />
             </>
          ) : pose === 'study' ? (
             // Holding Book
             <>
                <rect x="16" y="20" width="3" height="6" fill={c.shirt} />
                <rect x="29" y="20" width="3" height="6" fill={c.shirt} />
                <rect x="18" y="24" width="12" height="8" fill="#55aa55" /> {/* Book */}
                <rect x="19" y="25" width="10" height="6" fill="white" />
             </>
          ) : pose === 'panic' || pose === 'dead' ? (
             // Hands on head/flailing
             <>
                <rect x="14" y="16" width="3" height="8" fill={c.shirt} transform="rotate(-140 17 18)" />
                <rect x="31" y="16" width="3" height="8" fill={c.shirt} transform="rotate(140 31 18)" />
             </>
          ) : (
             // Relaxing/Interview (Down)
             <>
                <rect x="16" y="19" width="2" height="9" fill={c.shirt} />
                <rect x="30" y="19" width="2" height="9" fill={c.shirt} />
             </>
          )}

          {/* HEAD */}
          <rect x="18" y="8" width="12" height="11" fill={c.skin} />
          
          {/* HAIR - Bob Cut */}
          <path d="M17 7 H31 V16 H32 V7 H16 V16 H17 Z" fill={c.hair} /> {/* Top & Sides */}
          <rect x="17" y="6" width="14" height="3" fill={c.hair} /> {/* Top fullness */}
          <rect x="16" y="8" width="2" height="8" fill={c.hair} /> {/* Left Drop */}
          <rect x="30" y="8" width="2" height="8" fill={c.hair} /> {/* Right Drop */}
          {/* Bangs */}
          <rect x="19" y="8" width="2" height="2" fill={c.hair} />
          <rect x="22" y="8" width="1" height="1" fill={c.hair} />
          <rect x="25" y="8" width="2" height="2" fill={c.hair} />

          {/* FACE */}
          {pose === 'dead' ? (
             <>
               <text x="20" y="15" fontSize="4" fill="#333" style={{fontFamily: 'monospace'}}>x</text>
               <text x="26" y="15" fontSize="4" fill="#333" style={{fontFamily: 'monospace'}}>x</text>
               <rect x="22" y="17" width="4" height="1" fill="#333" />
             </>
          ) : pose === 'panic' ? (
             <>
               <rect x="20" y="12" width="2" height="2" fill="white" /><rect x="20.5" y="12.5" width="1" height="1" fill="black" />
               <rect x="26" y="12" width="2" height="2" fill="white" /><rect x="26.5" y="12.5" width="1" height="1" fill="black" />
               <rect x="22" y="16" width="4" height="2" fill="black" /> {/* Scream mouth */}
             </>
          ) : pose === 'happy' ? (
             <>
                <path d="M20 13 Q21 12 22 13" stroke="#333" strokeWidth="0.5" fill="none"/>
                <path d="M26 13 Q27 12 28 13" stroke="#333" strokeWidth="0.5" fill="none"/>
                <path d="M22 16 Q24 18 26 16" stroke="#333" strokeWidth="0.5" fill="none"/>
                <rect x="19" y="14" width="2" height="1" fill={c.blush} opacity="0.6"/>
                <rect x="27" y="14" width="2" height="1" fill={c.blush} opacity="0.6"/>
             </>
          ) : (
             // Normal
             <>
               <rect x="20" y="12" width="2" height="2" fill="#333" />
               <rect x="26" y="12" width="2" height="2" fill="#333" />
               <rect x="23" y="16" width="2" height="1" fill="#333" />
             </>
          )}

          {/* POT (Only if working/normal) */}
          {(pose === 'work' || pose === 'normal' || pose === 'happy') && (
            <g transform="translate(0, 2)">
               <rect x="18" y="26" width="12" height="8" fill={c.pot} rx="1" />
               <rect x="17" y="26" width="14" height="2" fill={c.potRim} />
               <rect x="19" y="25" width="10" height="2" fill={c.noodles} /> {/* Noodles */}
               <rect x="22" y="24" width="1" height="2" fill={c.noodles} />
               <rect x="25" y="24" width="1" height="2" fill={c.noodles} />
               {/* Steam Animation */}
               <g className="animate-pulse">
                  <rect x="21" y="20" width="1" height="3" fill="white" opacity="0.5"/>
                  <rect x="24" y="18" width="1" height="4" fill="white" opacity="0.5"/>
                  <rect x="27" y="21" width="1" height="2" fill="white" opacity="0.5"/>
               </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};