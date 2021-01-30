import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import Widget from '../Widget';
import animationData from './data.json';

const LottieContainer = styled.div`
    display:flex;
    width:100%;
    justify-content: center;
    align-items: center;

    pointer-events:none;
`;

export default function LoadingWidget() {
    const [animationState, setAnimationState] = useState({
        isStopped: false, isPaused: false,
    });

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
                Carregando... 
            </Widget.Header>
            <Widget.Content>
                <LottieContainer>
                    <Lottie
                        options={{
                        loop: true,
                        autoplay: true,
                        animationData,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice',
                        },
                        }}
                        height={100}
                        width={100}
                        isStopped={animationState.isStopped}
                        isPaused={animationState.isPaused}
                    />
                </LottieContainer>
            </Widget.Content>
        </Widget>
    );
};