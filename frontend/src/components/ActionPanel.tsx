import React, { useState, useEffect } from 'react';

interface ActionPanelProps {
  options: string[];
  playerId: string;
  onActionSent: () => void;
  playerStack: number;
  bigBlind: number;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ options, playerId, onActionSent, playerStack, bigBlind }) => {
  const [amountRange, setAmountRange] = useState<{ min: number; max: number }>({ 
    min: bigBlind,
    max: playerStack 
  });
  const [amount, setAmount] = useState<number>(bigBlind);

  useEffect(() => {
    const fetchAmountRange = async () => {
      try {
        const response = await fetch(`http://localhost:3001/amount-range/${playerId}`);
        const data = await response.json();
        if (data.ready && data.range) {
          const newRange = {
            min: data.range.min,
            max: Math.min(data.range.max, playerStack)
          };
          setAmountRange(newRange);
          setAmount(current => {
            if (current < newRange.min) return newRange.min;
            if (current > newRange.max) return newRange.max;
            return current;
          });
        }
      } catch (error) {
        console.error('Error fetching amount range:', error);
      }
    };

    if (options.includes('raise') || options.includes('bet')) {
      fetchAmountRange();
    }
  }, [options, playerId, playerStack]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    const clampedValue = Math.min(Math.max(newValue, amountRange.min), amountRange.max);
    setAmount(clampedValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue)) {
      newValue = amountRange.min;
    }
    const clampedValue = Math.min(Math.max(newValue, amountRange.min), amountRange.max);
    setAmount(clampedValue);
  };

  const sendAction = async (action: string) => {
    if (action === 'raise' || action === 'bet') {
      await fetch('http://localhost:3001/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, action }),
      });

      await new Promise(res => setTimeout(res, 200));

      await fetch('http://localhost:3001/amount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, amount }),
      });
    } else {
      await fetch('http://localhost:3001/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, action }),
      });
    }

    onActionSent();
  };

  const sliderStyles = {
    container: {
      marginBottom: '15px',
      padding: '10px',
      backgroundColor: '#2a2a2a',
      borderRadius: '8px',
    },
    sliderContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
    },
    slider: {
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
      width: '200px',
      height: '8px',
      background: 'linear-gradient(to right, #4CAF50, #8BC34A)',
      outline: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    } as React.CSSProperties,
    sliderThumb: {
      '&::-webkit-slider-thumb': {
        WebkitAppearance: 'none',
        appearance: 'none',
        width: '20px',
        height: '20px',
        backgroundColor: '#4CAF50',
        border: '2px solid #fff',
        borderRadius: '50%',
        cursor: 'pointer',
      },
      '&::-moz-range-thumb': {
        width: '20px',
        height: '20px',
        backgroundColor: '#4CAF50',
        border: '2px solid #fff',
        borderRadius: '50%',
        cursor: 'pointer',
      },
    } as React.CSSProperties,
    amountDisplay: {
      minWidth: '60px',
      padding: '8px 12px',
      backgroundColor: '#3a3a3a',
      borderRadius: '4px',
      color: 'white',
      fontSize: '16px',
      textAlign: 'center' as const,
    },
    rangeLabels: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: '#888',
    },
    actionButton: {
      marginRight: 10,
      padding: '8px 16px',
      backgroundColor: '#3a3a3a',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#4a4a4a',
      },
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
    },
    numberInput: {
      width: '80px',
      padding: '8px',
      backgroundColor: '#3a3a3a',
      border: 'none',
      borderRadius: '4px',
      color: 'white',
      fontSize: '16px',
      textAlign: 'center' as const,
    },
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Your Move</h3>
      {(options.includes('raise') || options.includes('bet')) && (
        <div style={sliderStyles.container}>
          <div style={sliderStyles.inputContainer}>
            <input
              type="range"
              min={amountRange.min}
              max={amountRange.max}
              value={amount}
              onChange={handleSliderChange}
              style={{ ...sliderStyles.slider, ...sliderStyles.sliderThumb }}
            />
            <input
              type="number"
              min={amountRange.min}
              max={amountRange.max}
              value={amount}
              onChange={handleInputChange}
              style={sliderStyles.numberInput}
            />
          </div>
          <div style={sliderStyles.rangeLabels}>
            <span>Min: {amountRange.min}</span>
            <span>Max: {amountRange.max}</span>
          </div>
        </div>
      )}
      <div>
        {options.map((opt) => (
          <button 
            key={opt} 
            onClick={() => sendAction(opt)} 
            style={sliderStyles.actionButton}
          >
            {opt.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionPanel;
