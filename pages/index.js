import React from 'react'
import styled from 'styled-components';
import { motion, moton } from 'framer-motion';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ dalay: 1, duration: 1.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}

          initial="hidden"
          animate= "show"        
        >
          <Widget.Header>
            <h1>{ db.Title }</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{ db.description }</p>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
            <Input 
              name="nomeDoUsuario"
              onChange={(infosDoEvento) => { setName(infosDoEvento.target.value);}}
              placeholder="Diz o seu nome" 
              value={name}
            />
            <Button type="submit" disabled={name.length === 0 }>
              {`Jogar ${name}`}
            </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ dalay: 2.5, duration: 2.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}

          initial="hidden"
          animate= "show"                
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic as={Link} href={`/quiz/${projectName}___${githubUser}`}>
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
            </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/ffsf-filho" />
    </QuizBackground>
  );
}
