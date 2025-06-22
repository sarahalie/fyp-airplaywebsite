import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Card, CardContent, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Howl } from 'howler';

const words = [
  { word: 'cat', image: '/images/cat.jpg', audio: '/audio/cat.mp3' },
  { word: 'dog', image: '/images/dog.jpg', audio: '/audio/dog.mp3' },
  { word: 'house', image: '/images/house.jpg', audio: '/audio/house.mp3' },
  { word: 'tree', image: '/images/tree.jpg', audio: '/audio/tree.mp3' },
  { word: 'book', image: '/images/book.jpg', audio: '/audio/book.mp3' },
];

const LiteracyGame = () => {
  const [currentWord, setCurrentWord] = useState(null);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [gameState, setGameState] = useState('ready'); // ready, playing, success, failed

  const scrambleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setScrambledWord(scrambleWord(randomWord.word));
    setUserInput([]);
    setGameState('playing');
  };

  const playSound = (audioUrl) => {
    const sound = new Howl({
      src: [audioUrl],
      html5: true
    });
    sound.play();
  };

  const handleLetterClick = (letter, index) => {
    if (gameState !== 'playing') return;

    const newScrambled = [...scrambledWord];
    newScrambled.splice(index, 1);
    setScrambledWord(newScrambled);
    setUserInput([...userInput, letter]);

    if (userInput.length + 1 === currentWord.word.length) {
      const userWord = [...userInput, letter].join('');
      if (userWord === currentWord.word) {
        playSound('/audio/success.mp3');
        setScore(score + 10);
        setProgress(progress + 20);
        setGameState('success');
        
        if (progress + 20 >= 100) {
          setLevel(level + 1);
          setProgress(0);
        }
      } else {
        playSound('/audio/error.mp3');
        setGameState('failed');
      }
    }
  };

  const handleReset = () => {
    startNewRound();
  };

  useEffect(() => {
    startNewRound();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontFamily: 'OpenDyslexic' }}>
          Word Builder
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: 'OpenDyslexic' }}>
            Level: {level}
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'OpenDyslexic' }}>
            Score: {score}
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
      </Box>

      {currentWord && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box
              component="img"
              src={currentWord.image}
              alt={currentWord.word}
              sx={{
                width: '100%',
                height: 200,
                objectFit: 'contain',
                mb: 2
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => playSound(currentWord.audio)}
              sx={{ mb: 2 }}
            >
              Listen to Word
            </Button>

            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" sx={{ mb: 1, fontFamily: 'OpenDyslexic' }}>
                Your Word:
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                {userInput.map((letter, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Card sx={{ p: 2 }}>
                      <Typography variant="h5" sx={{ fontFamily: 'OpenDyslexic' }}>
                        {letter}
                      </Typography>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              {scrambledWord.map((letter, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleLetterClick(letter, index)}
                    sx={{ minWidth: '48px', fontFamily: 'OpenDyslexic' }}
                  >
                    {letter}
                  </Button>
                </motion.div>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {gameState === 'success' && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" color="success.main" sx={{ mb: 2, fontFamily: 'OpenDyslexic' }}>
            Great job! You got it right!
          </Typography>
          <Button variant="contained" color="primary" onClick={handleReset}>
            Next Word
          </Button>
        </Box>
      )}

      {gameState === 'failed' && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" color="error.main" sx={{ mb: 2, fontFamily: 'OpenDyslexic' }}>
            Try again! You can do it!
          </Typography>
          <Button variant="contained" color="primary" onClick={handleReset}>
            Try Again
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default LiteracyGame; 