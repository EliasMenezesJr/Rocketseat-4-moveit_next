import {useContext} from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';


export function ExperienceBar() {
    const { currentExperience, experienceToNexetLevel , } = useContext(ChallengesContext)

    const porcentToNexetLevel = Math.round(currentExperience *100) / experienceToNexetLevel

    return (
        <header className={styles.experienceBar}>
            <span>0 xp </span>
            <div>
                <div style={{ width: `${porcentToNexetLevel}%` }} />

                <span className={styles.currentExperience} style={{ left: `${porcentToNexetLevel}%` }}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNexetLevel} xp</span>
        </header>
    );
}