import React, { useState, useEffect } from 'react';
import { getActions } from '../services/apiService';

interface QueueProps {
  updateActions: () => void;
}

const Queue: React.FC<QueueProps> = ({ updateActions }) => {
  const [actions, setActions] = useState<string[]>([]);

  useEffect(() => {
    // Charger la liste des actions au montage du composant
    loadActions();
  }, [updateActions]);

  const loadActions = async () => {
    try {
      const response = await getActions();
      setActions(response);
      updateActions()
    } catch (error) {
      console.error('Erreur lors du chargement des actions :', error);
    }
  };

  return (
    <div className="queue-container">
      <h2>Actions left</h2>
        {actions.length > 0 ? (
          actions.map((action, index, row) => (
            index + 1 !== row.length ? (
              <span key={index}>{action} == </span>
            ) : (
              <span key={index}>{action}</span>
            )
          ))
        ) : (
          <div>No action available</div>
        )}
    </div>
  );
};

export default Queue;
