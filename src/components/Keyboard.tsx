import { useEffect, useState } from 'react';

interface KeyConfig {
  id: string;
  en: string;
  uk: string;
  group?: number;
}

const keyboardMatrix: KeyConfig[] = [
  {id: '1', en: '1', uk: '1', group: 1},
  {id: '2', en: '2', uk: '2', group: 1},
  {id: '3', en: '3', uk: '3', group: 2},
  {id: '4', en: '4', uk: '4', group: 3},
  {id: '5', en: '5', uk: '5', group: 4},
  {id: '6', en: '6', uk: '6', group: 4},
  {id: '7', en: '7', uk: '7', group: 5},
  {id: '8', en: '8', uk: '8', group: 5},
  {id: '9', en: '9', uk: '9', group: 6},
  {id: '0', en: '0', uk: '0', group: 7},
  {id: 'underscore', en: '-', uk: '-', group: 8},
  {id: 'equal', en: '=', uk: '=', group: 8},
  {id: 'q', en: 'q', uk: 'й', group: 1},
  {id: 'w', en: 'w', uk: 'ц', group: 2},
  {id: 'e', en: 'e', uk: 'у', group: 3},
  {id: 'r', en: 'r', uk: 'к', group: 4},
  {id: 't', en: 't', uk: 'е', group: 4},
  {id: 'y', en: 'y', uk: 'н', group: 5},
  {id: 'u', en: 'u', uk: 'г', group: 5},
  {id: 'i', en: 'i', uk: 'ш', group: 6},
  {id: 'o', en: 'o', uk: 'щ', group: 7},
  {id: 'p', en: 'p', uk: 'з', group: 8},
  {id: 'leftSquareBracket', en: '[', uk: 'х', group: 8},
  {id: 'rightSquareBracket', en: ']', uk: 'ї', group: 8},
  {id: 'a', en: 'a', uk: 'ф', group: 1},
  {id: 's', en: 's', uk: 'і', group: 2},
  {id: 'd', en: 'd', uk: 'в', group: 3},
  {id: 'f', en: 'f', uk: 'а', group: 4},
  {id: 'g', en: 'g', uk: 'п', group: 4},
  {id: 'h', en: 'h', uk: 'р', group: 5},
  {id: 'j', en: 'j', uk: 'о', group: 5},
  {id: 'k', en: 'k', uk: 'л', group: 6},
  {id: 'l', en: 'l', uk: 'д', group: 7},
  {id: 'cologn', en: ';', uk: 'ж', group: 8},
  {id: 'quote', en: "'", uk: 'є', group: 8},
  {id: 'backSlash', en: '\\', uk: 'ʼ', group: 8},
  {id: 'z', en: 'z', uk: 'я', group: 1},
  {id: 'x', en: 'x', uk: 'ч', group: 2},
  {id: 'c', en: 'c', uk: 'с', group: 3},
  {id: 'v', en: 'v', uk: 'м', group: 4},
  {id: 'b', en: 'b', uk: 'и', group: 4},
  {id: 'n', en: 'n', uk: 'т', group: 5},
  {id: 'm', en: 'm', uk: 'ь', group: 5},
  {id: 'comma', en: ',', uk: 'б', group: 6},
  {id: 'period', en: '.', uk: 'ю', group: 7},
  {id: 'slash', en: '/', uk: '.', group: 8}
];

const leftHalf = 'q w e r t a s d f g z x c v b'.split(/\s/);
const leftHalfUK = 'й ц у к е ф і в а п я ч с м и'.split(/\s/);

interface KeyboardProps {
  activeKey: string | null;
  language: 'en' | 'uk';
  showHands: boolean;
  showColors: boolean;
}

export const Keyboard: React.FC<KeyboardProps> = ({ activeKey, language, showHands, showColors }) => {
  const [targetKeyId, setTargetKeyId] = useState<string | null>(null);
  const [shiftTarget, setShiftTarget] = useState<'l' | 'r' | null>(null);
  const [spaceHand, setSpaceHand] = useState<'l' | 'r' | null>(null);

  useEffect(() => {
    if (!activeKey) {
      setTargetKeyId(null);
      setShiftTarget(null);
      setSpaceHand(null);
      return;
    }

    if (activeKey === ' ') {
      setTargetKeyId('space');
      // Determine hand for space based on previous key? Or just default?
      // Legacy code: _handForSpace(pressed) - depends on what was JUST pressed.
      // But here we only know what TO press.
      // Actually legacy logic was: if last pressed key was left hand, space is right hand.
      // For now, let's just default or random, or maybe we need state of last pressed key.
      // We'll leave it simple for now.
      setSpaceHand('r'); // Default to right thumb
      return;
    }

    const isUpper = activeKey !== activeKey.toLowerCase();
    const lowerKey = activeKey.toLowerCase();
    
    const keyConfig = keyboardMatrix.find(k => k.en === lowerKey || k.uk === lowerKey);
    
    if (keyConfig) {
      setTargetKeyId(keyConfig.id);
      
      if (isUpper) {
        // Determine shift side
        const isLeft = leftHalf.includes(keyConfig.en) || leftHalfUK.includes(keyConfig.uk);
        setShiftTarget(isLeft ? 'r' : 'l'); // Opposite hand for shift
      } else {
        setShiftTarget(null);
      }
    } else {
        setTargetKeyId(null);
    }

  }, [activeKey, language]);

  const getKeyClass = (keyId: string, group?: number) => {
    let classes = "key flex justify-center items-center border border-gray-800 dark:border-gray-600 rounded m-0.5 text-sm capitalize transition-colors duration-100 relative ";
    
    // Size classes
    if (keyId === 'backspace' || keyId === 'tab') classes += "w-[82px] h-[55px] ";
    else if (keyId === 'caps_lock' || keyId === 'enter') classes += "w-[98px] h-[55px] ";
    else if (keyId === 'shift-l' || keyId === 'shift-r') classes += "w-[128px] h-[55px] ";
    else if (keyId === 'space') classes += "w-[330px] h-[55px] absolute left-[220px] ";
    else classes += "w-[55px] h-[55px] ";

    // Active state
    const isActive = keyId === targetKeyId || (keyId === `shift-${shiftTarget}`);
    
    if (isActive) {
        // Active group colors - darker/more saturated in light mode for better contrast with dark text
        // In dark mode, use the original lighter colors
        if (group === 1 || group === 8 || keyId.startsWith('shift')) {
            classes += "bg-purple-600 dark:bg-[#AD7FA8] ";
        } else if (group === 2 || group === 7) {
            classes += "bg-blue-600 dark:bg-[#729FCF] ";
        } else if (group === 3) {
            classes += "bg-green-600 dark:bg-[#73D216] ";
        } else if (group === 5) {
            classes += "bg-yellow-500 dark:bg-[#FCE94F] ";
        } else if (group === 4 || group === 6) {
            classes += "bg-orange-600 dark:bg-[#FCAF3E] ";
        } else if (keyId === 'space') {
            classes += "bg-gray-600 dark:bg-[#727272] ";
        }
        
        // White text on dark backgrounds in light mode, dark text on bright backgrounds in dark mode
        classes += "text-white dark:text-gray-900 border-2 border-gray-800 dark:border-gray-600 ";
        
        // Only add key-target class (for hand display) if showHands is true
        if (showHands) classes += "key-target ";
    } else {
        // Passive zone colors (only if showColors is true)
        if (showColors) {
            if (group === 1 || group === 8 || keyId.startsWith('shift')) classes += "bg-purple-100/40 dark:bg-purple-900/80 ";
            else if (group === 2 || group === 7) classes += "bg-blue-100/40 dark:bg-blue-900/80 ";
            else if (group === 3) classes += "bg-green-100/40 dark:bg-green-900/80 ";
            else if (group === 5) classes += "bg-yellow-100/40 dark:bg-yellow-900/80 ";
            else if (group === 4 || group === 6) classes += "bg-orange-100/40 dark:bg-orange-900/80 ";
            else if (keyId === 'space') classes += "bg-gray-200/60 dark:bg-gray-700/80 ";
            else classes += "bg-gray-100 dark:bg-gray-800 ";
        } else {
            classes += "bg-gray-100 dark:bg-gray-800 ";
        }
        
        // Text color for inactive keys: dark in light mode, light in dark mode
        classes += "text-gray-800 dark:text-gray-200 ";
    }

    if (group) classes += `group-${group} `;
    if (keyId === 'space' && spaceHand === 'r') classes += "righthand ";

    return classes;
  };

  // Helper to render a row of keys
  const renderRow = (keys: string[]) => {
    return (
      <>
        {keys.map(k => {
            if (['tab', 'caps_lock', 'shift-l', 'backspace', 'enter', 'shift-r'].includes(k)) {
                 return <div key={k} id={k} className={getKeyClass(k)}>{k.replace('-', ' ')}</div>
            }
            const config = keyboardMatrix.find(m => m.id === k);
            if (!config) return null;
            
            // Show both EN and UK characters when in Ukrainian mode
            if (language === 'uk') {
                return (
                    <div key={k} id={k} className={getKeyClass(k, config.group)}>
                        <div className="flex flex-col items-center justify-center leading-tight">
                            <span className="text-[10px] opacity-60">{config.en}</span>
                            <span className="text-sm font-medium">{config.uk}</span>
                        </div>
                    </div>
                );
            }
            
            // Show only English in English mode
            return (
                <div key={k} id={k} className={getKeyClass(k, config.group)}>
                    {config.en}
                </div>
            );
        })}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center mt-12 select-none opacity-100 transition-opacity duration-200 w-[900px] mx-auto">
        {/* Row 1 */}
        <div className="flex w-full">
            {renderRow(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'underscore', 'equal', 'backspace'])}
        </div>
        {/* Row 2 */}
        <div className="flex w-full">
             <div id="tab" className={getKeyClass('tab')}>tab</div>
             {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'leftSquareBracket', 'rightSquareBracket', 'backSlash'].map(k => {
                 const config = keyboardMatrix.find(m => m.id === k);
                 if (!config) return null;
                 
                 if (language === 'uk') {
                     return (
                         <div key={k} id={k} className={getKeyClass(k, config.group)}>
                             <div className="flex flex-col items-center justify-center leading-tight">
                                 <span className="text-[10px] opacity-60">{config.en}</span>
                                 <span className="text-sm font-medium">{config.uk}</span>
                             </div>
                         </div>
                     );
                 }
                 return <div key={k} id={k} className={getKeyClass(k, config.group)}>{config.en}</div>
             })}
        </div>
        {/* Row 3 */}
        <div className="flex w-full">
             <div id="caps_lock" className={getKeyClass('caps_lock')}>caps</div>
             {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'cologn', 'quote', 'enter'].map(k => {
                 if(k === 'enter') return <div key={k} id={k} className={getKeyClass(k)}>enter</div>
                 const config = keyboardMatrix.find(m => m.id === k);
                 if (!config) return null;
                 
                 if (language === 'uk') {
                     return (
                         <div key={k} id={k} className={getKeyClass(k, config.group)}>
                             <div className="flex flex-col items-center justify-center leading-tight">
                                 <span className="text-[10px] opacity-60">{config.en}</span>
                                 <span className="text-sm font-medium">{config.uk}</span>
                             </div>
                         </div>
                     );
                 }
                 return <div key={k} id={k} className={getKeyClass(k, config.group)}>{config.en}</div>
             })}
        </div>
        {/* Row 4 */}
        <div className="flex w-full">
             <div id="shift-l" className={getKeyClass('shift-l')}>shift</div>
             {['z', 'x', 'c', 'v', 'b', 'n', 'm', 'comma', 'period', 'slash'].map(k => {
                 const config = keyboardMatrix.find(m => m.id === k);
                 if (!config) return null;
                 
                 if (language === 'uk') {
                     return (
                         <div key={k} id={k} className={getKeyClass(k, config.group)}>
                             <div className="flex flex-col items-center justify-center leading-tight">
                                 <span className="text-[10px] opacity-60">{config.en}</span>
                                 <span className="text-sm font-medium">{config.uk}</span>
                             </div>
                         </div>
                     );
                 }
                 return <div key={k} id={k} className={getKeyClass(k, config.group)}>{config.en}</div>
             })}
             <div id="shift-r" className={getKeyClass('shift-r')}>shift</div>
        </div>
        {/* Row 5 (Space) */}
        <div className="flex w-full relative h-[60px]">
            <div id="space" className={getKeyClass('space')}></div>
        </div>
    </div>
  );
};
