import React, { useState } from 'react';

interface ActionPanelProps {
  options: string[];
  playerId: string;
  onActionSent: () => void;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ options, playerId, onActionSent }) => {
  const [amount, setAmount] = useState('');

  const sendAction = async (action: string) => {
    if (action === 'bet' || action === 'raise') {
      const numericAmount = parseInt(amount);
      if (isNaN(numericAmount)) {
        alert('Enter a valid amount');
        return;
      }
      await fetch('http://localhost:3001/amount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, amount: numericAmount }),
      });
    } else {
      await fetch('http://localhost:3001/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, action }),
      });
    }
    setAmount('');
    onActionSent();
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Your Move</h3>
      {options.includes('bet') || options.includes('raise') ? (
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginRight: 10 }}
        />
      ) : null}
      {options.map((opt) => (
        <button key={opt} onClick={() => sendAction(opt)} style={{ marginRight: 10 }}>
          {opt.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default ActionPanel;