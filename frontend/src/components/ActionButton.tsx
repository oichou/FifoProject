import React, { FC } from 'react';
import { addAction } from '../services/apiService';

interface ActionButtonProps {
  text: string;
  showAlert: (text: string) => void;
  handleAddAction: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({ text, showAlert, handleAddAction  }) => {
  const handleClick = () => {
    const response = addAction(text);
    response.then(result => {
      if(result.message && result.message === 'Action ajoutée à la file d\'attente.') {
        showAlert(`Action ${text} ajoutée avec succès !`);
        handleAddAction();
      }
    })

  };
  return (
        <div className="col-sm-3">
          <a onClick={handleClick} className="btn btn-lg">
            <span>{text}</span>
          </a>
    </div>
  );
}

export default ActionButton;
