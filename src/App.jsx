import { useState } from 'react'
import './App.css'

const reactFlashcards = [
  { question: "What is React?", answer: "A JavaScript library for building user interfaces using reusable components.", difficulty: "easy" },
  { question: "What is JSX?", answer: "A syntax extension that lets you write HTML-like code inside JavaScript. It compiles to React.createElement().", difficulty: "easy" },
  { question: "What is a component?", answer: "A reusable piece of UI that returns JSX.", difficulty: "easy" },
  { question: "What are props?", answer: "Read-only values passed from a parent component to a child component.", difficulty: "easy" },
  { question: "What is state?", answer: "Mutable data managed inside a component that affects rendering.", difficulty: "easy" },
  { question: "What does useState() return?", answer: "An array containing the current state value and a setter function.", difficulty: "medium" },
  { question: "Why shouldn't state be mutated directly?", answer: "React may not detect the change correctly. Always create a new object or array when updating state.", difficulty: "medium" },
  { question: "What is useEffect used for?", answer: "Running side effects such as fetching data, setting timers, or subscribing to events.", difficulty: "medium" },
  { question: "When does useEffect(() => {}, []) run?", answer: "Once after the component's initial render.", difficulty: "medium" },
  { question: "What is the Virtual DOM?", answer: "A lightweight representation of the real DOM that React uses to efficiently determine what needs updating.", difficulty: "medium" },
  { question: "How do you render a list in React?", answer: "Use the array map() method to return JSX elements.", difficulty: "easy" },
  { question: "Why are keys important when rendering lists?", answer: "They help React identify which items have changed, been added, or removed.", difficulty: "medium" },
  { question: "What is a controlled component?", answer: "A form element whose value is managed by React state.", difficulty: "hard" },
  { question: "What is the difference between props and state?", answer: "Props are passed into a component and are read-only, while state is owned by the component and can change over time.", difficulty: "hard" },
]


function Flashcard({ card, showAnswer }) {
  const { question, answer } = card;
  if (!showAnswer) {
    return <div className="question">{question}</div>;
  }
  return (
    <div className="answer">{answer}</div>
  );
}

function App() {
  const [history, setHistory] = useState(() => {
    const first = Math.floor(Math.random() * reactFlashcards.length)
    return [first]
  })
  const [historyIndex, setHistoryIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)

  const curFlashcard = history[historyIndex]
  const currentCard = reactFlashcards[curFlashcard]
  const total = reactFlashcards.length

  function goNext() {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
    } else {
      const seen = new Set(history)
      const unseen = [...Array(total).keys()].filter(i => seen.has(i) ? seen.size === total : true)
      const remaining = seen.size === total
        ? [...Array(total).keys()].filter(i => i !== curFlashcard)
        : [...Array(total).keys()].filter(i => !seen.has(i))
      const next = remaining[Math.floor(Math.random() * remaining.length)]
      setHistory([...history, next])
      setHistoryIndex(historyIndex + 1)
    }
    setShowAnswer(false)
  }

  function goPrev() {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setShowAnswer(false)
    }
  }

  function reset() {
    const first = Math.floor(Math.random() * total)
    setHistory([first])
    setHistoryIndex(0)
    setShowAnswer(false)
  }

  function flip() {
    setIsFlipping(true)
    setTimeout(() => {
      setShowAnswer(!showAnswer)
      setIsFlipping(false)
    }, 200)
  }

  return (
    <div className="App">
      <header id="title">
        <h1>React Flashcards</h1>
        <h2>Test your React knowledge with these flashcards!</h2>
        <p>Number of cards: {total}</p>
      </header>

      <section
        id="flashcard-display"
        className={`${showAnswer ? 'show-answer' : 'show-question'} ${isFlipping ? 'flipping' : ''} difficulty-${currentCard.difficulty}`}
        onClick={flip}
        aria-label="Flashcard — click to reveal answer"
      >
        <Flashcard card={currentCard} showAnswer={showAnswer} />
      </section>

      <p id="hint">{showAnswer ? 'click to see question' : 'click to reveal answer'}</p>

      <section id="controls">
        <button
          onClick={goPrev}
          disabled={historyIndex === 0}
        >
          Prev
        </button>
        <span className="counter">{historyIndex + 1} / {total}</span>
        <button
          onClick={goNext}
          disabled={historyIndex === total - 1}
        >
          Next
        </button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>


  )
}

export default App
