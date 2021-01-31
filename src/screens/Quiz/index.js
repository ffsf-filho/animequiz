import React from 'react'
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativeForm';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import GitHubCorner from '../../components/GitHubCorner';
import LoadingWidget from '../../components/LoadingWidget';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
    const router = useRouter();
    const { name } = router.query;
    const totalAcertos = results.filter((x) => x).length;

    return(
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
                <BackLinkArrow href="/" />
                Tela de Resultado
            </Widget.Header>
            <Widget.Content>
                <p>
                    <b>{`${name.trim().toUpperCase()}`}</b> 
                    {`${totalAcertos === 0 ? ' que pena, tente outra vez!!' : ' mandou muito bem!!'}`}
                </p>
                <p>
                    {totalAcertos === 0 ? 'Você errou todas.' : `Você acertou ${totalAcertos} pergunta(s), parabéns!`}
                </p>

                <ul>
                    {
                        results.map((result, index) => (
                            <li key={`result__${index}`}>
                                {`# ${index + 1} `} Resultado:
                                {result === true ? ' Acertou' : ' Errou'}
                            </li>
                        ))
                    }
                </ul>

                <p>
                    {`Você fez ${(100 * totalAcertos)} pontos.`}
                </p>

            </Widget.Content>
    </Widget>
    );
};

function QuestionWidget({question, totalQuestions, questionIndex, onSubmit, addResult}) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;

    return(
        <Widget>
            <Widget.Header>
                <BackLinkArrow href="/" />
                <h3>
                    {`Pergunta ${ questionIndex + 1 } de ${ totalQuestions }`}
                </h3>
            </Widget.Header>

            <img 
            alt="Descrição"
            style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
            }}
            src={ question.image}
            />

            <Widget.Content>
            <h2>{ question.title }</h2>
            <p>{ question.description }</p>

            <AlternativesForm 
                onSubmit={(infosDoEvento) => {
                    infosDoEvento.preventDefault();
                    setIsQuestionSubmited(true);
                    setTimeout(() => {
                        addResult(isCorrect);
                        onSubmit();
                        setIsQuestionSubmited(false);
                        setSelectedAlternative(undefined);
                    }, 2 * 1000);
                }}
            >
                {question.alternatives.map((alternative, alternativeIndex) => {
                    const alternativeId = `alternative_${alternativeIndex}--${alternative}`;
                    const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                    const isSelected =  selectedAlternative === alternativeIndex;

                    return(
                        <Widget.Topic
                            as="label"
                            key={alternativeId}
                            htmlFor={alternativeId}
                            data-selected={isSelected}
                            data-status={isQuestionSubmited && alternativeStatus}
                        >
                            <input 
                                style={{ display: 'none'}}
                                id={alternativeId} 
                                name={questionId}
                                onChange={() => setSelectedAlternative(alternativeIndex)}
                                type="radio"
                                />
                            {alternative}
                        </Widget.Topic>
                        );
                })}

                {/*<pre>
                    {JSON.stringify(question, null, 4)}
                </pre>*/}

                <Button type="submit" disabled={!hasAlternativeSelected}>
                    Confirmar
                </Button>
                {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
                {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
            </AlternativesForm>
            </Widget.Content>
        </Widget>
    );
};

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage( {db} ) {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];
    const bg = db.bg;

    function addResult(result) {
        setResults([
            ...results, 
            result,
        ]);
    };

    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 3 * 1000);
    }, []);

    function handleSubmitQuiz(){
        const nextQuestion = questionIndex + 1;

        if(nextQuestion < totalQuestions) {
            setCurrentQuestion(nextQuestion);
        } else {
            setScreenState(screenStates.RESULT);
        }
    };

    return (
        <QuizBackground backgroundImage={bg}>
            <QuizContainer>
                <QuizLogo />
                {screenState === screenStates.QUIZ && (
                    <QuestionWidget 
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestions}
                        onSubmit={handleSubmitQuiz}
                        addResult={addResult}
                    />
                )}

                {screenState === screenStates.LOADING && <LoadingWidget />}

                {screenState === screenStates.RESULT && <ResultWidget results={results} />}

                <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/ffsf-filho" />
        </QuizBackground>
    );
}

ResultWidget.propTypes = {
    results: PropTypes.arrayOf(PropTypes.bool).isRequired,
};