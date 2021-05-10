import Head from 'next/head';
import {GetServerSideProps} from 'next'
import { CompetedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';


import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContex';
import { ChallengesProviber } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number; 
  currentExperience: number;
  challengesCompleted: number;
  experienceTotal: number;
}

export default function Home(props:HomeProps ) {

  return (
    <ChallengesProviber 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
      experienceTotal={props.experienceTotal}
    >
        <div className={styles.container}>
          <Head>
            <title>Inicio | move.it</title>
          </Head>
          <ExperienceBar />


          <CountdownProvider>
            <section>
              <div >
                <Profile/>
                <CompetedChallenges/>
                <Countdown/>
              </div>
              <div>
                <ChallengeBox/>
              </div>
            </section>
          </CountdownProvider>
        </div>
    </ChallengesProviber>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // chamando API
  const { level , currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
