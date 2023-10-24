import React, { useState, useEffect } from 'react';
import './App.css';
import Alert from './components/Alert';
import ActionButton from './components/ActionButton';
import Queue from './components/Queue';
import { executeAction, getActions } from './services/apiService';

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [timeLeft, setTimeLeft] = useState({ minutes: 2, seconds: 0 })
  const [isQueueEmpty, setIsQueueEmpty] = useState(true);
  const response = getActions();
  response.then((value) => {
    if(value.length === 0)
      setIsQueueEmpty(true)
    else
      setIsQueueEmpty(false)
  })
const [queueWasEmpty, setQueueWasEmpty] = useState(isQueueEmpty);

  const handleAlert = (text: string) => {
    setAlertText(text);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setAlertText("");
    }, 3000);
  }

  const executeFirstAction = async () => {
    if(!isQueueEmpty) {
      try {
        // Exécutez la première action disponible ici
        const result = await executeAction();
        if (result && result.message === `L'action est executé avec succès`) {
          handleAlert(`L'action ${result.action} est executé avec succès`)
          await updateActions();
        } else if(result && result.message === `Il ne reste plus de crédit pour cette action`) {
          handleAlert(`L'action ${result.action} a épuisé son quota de crédit on la met a la fin de la file d'attente pour l'instant`)
          await updateActions();
        } else {
          console.log('Erreur lors de l\'exécution de l\'action :a', result);
          setTimeLeft({ minutes: 0, seconds: 0 });
        }
        // Mettez à jour le temps restant après chaque exécution
      } catch (error: any) {
        console.log('Erreur lors de l\'exécution de l\'action :b', error);
        setTimeLeft({ minutes: 0, seconds: 0 });
      }
    } else {
      setTimeLeft({ minutes: 0, seconds: 0 });
    }
  }

  useEffect(() => {
    // Mettez à jour le temps restant toutes les secondes
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds === 0) {
          if (prevTime.minutes === 0) {
            clearInterval(interval);
            if (!isQueueEmpty) {
              return { minutes: 0, seconds: 0 };
            }
            return { minutes: 2, seconds: 0 };
          } else {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          }
        } else {
          return { minutes: prevTime.minutes, seconds: prevTime.seconds - 1 };
        }
      });
    }, 1000);

    // Définissez un intervalle pour exécuter l'action toutes les deux minutes
    const actionInterval = setInterval(async () => {
      try {
        await executeFirstAction();
        if(!isQueueEmpty) {
          setTimeLeft({ minutes: 2, seconds: 0 });
        }
        else{
          setTimeLeft({ minutes: 0, seconds: 0 });
          clearInterval(interval);
          clearInterval(actionInterval);
        }
      } catch (error: any) {
        console.error(error.message)
        clearInterval(interval);
        clearInterval(actionInterval);
      }
    }, 120000);

    return () => {
      clearInterval(interval);
      clearInterval(actionInterval);
    };
  }, [isQueueEmpty]);

  const handleAddAction = () => {
        if (isQueueEmpty && queueWasEmpty) {
          setQueueWasEmpty(true);
          initTimer();
        }
  }

  const initTimer = () => {
    setTimeLeft({ minutes: 20, seconds: 0 });
  }

  const updateActions = async () => {
    try {
      const response = await getActions();
      setIsQueueEmpty(response.length == 0);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des actions :', error);
    }
  }

  return (
    <div className="App">
      <div className="home-navbar navbar-container">
        <div className="max-width">
          <div className="home-burger-menu navbar-burger-menu">
            <svg viewBox="0 0 1024 1024" className="home-icon">
              <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
            </svg>
            <span>FifoProject</span>
          </div>
        </div>
      </div>
      <div className="home-hero hero-container section-container">
        <div className="home-max-width1 max-width">
          <div className="home-content">
            <h1 className="home-title">The queue</h1>
            <span id="fifo" className="home-description">
              {showAlert && <Alert message={`${alertText}`} />}
                <Queue updateActions={updateActions}/>
            </span>
          </div>
          <div className="home-content">
            <h1 className="home-title">Time left to next action</h1>
            <span id="timer" className="home-description">
                {timeLeft.minutes} minute(s) {timeLeft.seconds} seconde(s) restante(s)
            </span>
          </div>
        </div>
        <h1 className="home-buttons">Click on the button to add an action</h1>
        <div className="container">
          <div className="row">
            <ActionButton text="A" showAlert={handleAlert} handleAddAction={handleAddAction}/>
            <ActionButton text="B" showAlert={handleAlert} handleAddAction={handleAddAction}/>
            <ActionButton text="C" showAlert={handleAlert} handleAddAction={handleAddAction}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
