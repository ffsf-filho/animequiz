import React from 'react'
import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
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
        <Widget>
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

        <Widget>
          <h1>Quiz da Galera</h1>
          <p>Uma ótima diversão</p>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/ffsf-filho" />
    </QuizBackground>
  );
}
