import {createContext, useState, ReactNode, useEffect} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../Challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


interface challenge {
    type: 'body | eye';
    description: string;
    amount: number;
}


interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNexetLevel: number;
    challengesCompleted: number;
    activeChallenge: challenge; 
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviberProps {
    children: ReactNode;
    level: number; 
    currentExperience: number;
    challengesCompleted: number;
    experienceTotal: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProviber({ 
    children, 
    ...rest
}: ChallengesProviberProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengescompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isAppLevelModalOpen, setIsAppLevelModalOpen] = useState(false)

    const experienceToNexetLevel = Math.pow((level + 1 ) * 4, 2)

    useEffect (() => {
        Notification.requestPermission()
    }, [])

    useEffect (() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [ level, currentExperience, challengesCompleted])


    function  levelUp () {
        setLevel(level + 1);
        setIsAppLevelModalOpen(true)
        new Audio('/notify.wav').play();
    }

    function closeLevelUpModal () {
        setIsAppLevelModalOpen(false)
    }
    
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notify.wav').play();

        if (Notification.permission == 'granted') {
            new Notification ('Novo desafio😇', {
                body:`Valendo ${challenge.amount} xp`
            } )
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNexetLevel) {
            finalExperience = finalExperience - experienceToNexetLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengescompleted(challengesCompleted + 1);
    }

    
    return (
        <ChallengesContext.Provider 
        value={{
                level, 
                currentExperience, 
                experienceToNexetLevel,
                challengesCompleted,
                levelUp, 
                startNewChallenge, 
                activeChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
            }}
        >
            {children}

           { isAppLevelModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}