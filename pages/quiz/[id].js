import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }){
    return (
        <div>
            <ThemeProvider theme={dbExterno.theme}>
                <QuizScreen 
                    externalQuestions={dbExterno.questions}
                    externalBg={dbExterno.bg}
                    />
            </ThemeProvider>
            {/* <pre style={{ color: 'black' }}>
                {JSON.stringify(dbExterno.questions, null, 4)}
            </pre> */}
        </div>
    );
};

export async function getServerSideProps(context) {
    const [projectName, githubUser] = context.query.id.split('___');
    try{
        const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
        .then((respostaDoServidor) => {
            if(respostaDoServidor.ok){
                return respostaDoServidor.json();
            }
            throw new Error('Falha em pegar os dados');
        })
        .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
        
        return {
            props: {
                dbExterno,
            },
        };
    } catch(err) {
        throw new Error(err);
    }
};