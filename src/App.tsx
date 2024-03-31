import { FC, useEffect, useState } from 'react';

type Guesses = WordInGuesses[];
type WordInGuesses = {
  key: string;
  color: string;
};
type CurrentGuess = string;

function App() {
  const solutions: string[] = [
    'البيت',
    'العلم',
    'العمل',
    'احتفظ',
    'كتابي',
  ];

  const solution: string =
    solutions[Math.floor(Math.random() * solutions.length)];

  // useEffect(() => {
  //   window.addEventListener('keyup', handleKeyup)

  //   return () => window.removeEventListener('keyup', handleKeyup)
  // }, [handleKeyup])

  return (
    <>
      <h1>وُوردي</h1>
      <section className="container">
        <div className="inputs">
          <div className="center">
            <Wordy solution={solution} />
          </div>
        </div>
        <Keypad></Keypad>
      </section>
    </>
  );
}

export default App;

const Wordy: FC<{ solution: string }> = ({ solution }) => {
  const { handleKeyup, currentGuess, guesses, turn } =
    useWordy(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup]);
  console.log('wordy', guesses);

  return (
    <div>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        turn={turn}
      />
    </div>
  );
};

const Grid: FC<{
  guesses: Guesses[];
  currentGuess: CurrentGuess;
  turn: number;
}> = ({ guesses, currentGuess, turn }) => {
  return (
    <>
      {guesses.map((g, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} />;
        }
        return <Row key={i} guess={g} />;
      })}
    </>
  );
};

function formatWord(guess: Guesses): Guesses;
function formatWord(guess: string): string[];
function formatWord(guess: unknown): unknown {
  const letters = ['ا', 'أ', 'إ', 'ؤ', 'ر', 'ز', 'د', 'ذ', 'و', 'ء'];
  if (typeof guess === 'string') {
    const arrayOfCurrentGuess = [...guess];
    const formatedCurrentGuess = arrayOfCurrentGuess.map((l, i) => {
      if (i === 0) {
        if (letters.includes(l)) {
          return l;
        } else {
          return l + 'ـــــ';
        }
      }
      if (i === 4) {
        if (!letters.includes(arrayOfCurrentGuess[3])) {
          return 'ــ' + l;
        } else {
          return l;
        }
      }
      if (
        !letters.includes(l) &&
        !letters.includes(arrayOfCurrentGuess[i - 1])
      ) {
        return 'ـــ' + l + 'ـــ';
      } else if (!letters.includes(arrayOfCurrentGuess[i - 1])) {
        return 'ـــ' + l;
      } else if (!letters.includes(l)) {
        return l + 'ـــ';
      } else {
        return l;
      }
    });
    return formatedCurrentGuess;
  } else if (Array.isArray(guess)) {
    const formatedGuess = guess.map((l, i) => {
      if (i === 0) {
        if (letters.includes(l.key)) {
          return l;
        } else {
          return {
            key: l.key + 'ـــــ',
            color: l.color,
          };
        }
      }
      if (i === 4) {
        if (!letters.includes(guess[3].key)) {
          return {
            key: 'ــ' + l.key,
            color: l.color,
          };
        } else {
          return l;
        }
      }
      if (
        !letters.includes(l.key) &&
        !letters.includes(guess[i - 1].key)
      ) {
        return {
          key: 'ـــ' + l.key + 'ـــ',
          color: l.color,
        };
      } else if (!letters.includes(guess[i - 1].key)) {
        return {
          key: 'ـــ' + l.key,
          color: l.color,
        };
      } else if (!letters.includes(l.key)) {
        return {
          key: l.key + 'ـــ',
          color: l.color,
        };
      } else {
        return l;
      }
    });
    return formatedGuess;
  }
}

const Row: FC<{
  guess?: Guesses;
  currentGuess?: string;
}> = ({ guess, currentGuess }) => {
  if (guess) {
    const formattedPastGuess = formatWord(guess);
    return (
      <>
        <div className="row past">
          {formattedPastGuess?.map((l, i) => (
            <div key={i} className={l.color}>
              {l.key}
            </div>
          ))}
        </div>
      </>
    );
  }

  if (currentGuess) {
    const letters = [...currentGuess];
    const formattedCurrentGuess = formatWord(currentGuess);
    return (
      <div className="row current">
        {formattedCurrentGuess.map((l, i) => (
          <div key={i} className="filled">
            {l}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const Keypad: FC<{ usedkeys?: [] }> = () => {
  const upperRow = [
    'د',
    'ج',
    'ح',
    'خ',
    'هـ',
    'ع',
    'غ',
    'ف',
    'ق',
    'ث',
    'ص',
    'ض',
  ];
  const middleRow = [
    'ط',
    'ك',
    'م',
    'ن',
    'ت',
    'ا',
    'أ',
    'ل',
    'ب',
    'ي',
    'س',
    'ش',
  ];
  const lowerLower = [
    'ظ',
    'ز',
    'و',
    'ة',
    'إدخال',
    'ى',
    'ر',
    'ؤ',
    'ء',
    'ئ',
    'مسح',
  ];

  return (
    <>
      <section className="keypad">
        {upperRow.map((l) => (
          <KeypadLetter key={l} letter={l}></KeypadLetter>
        ))}
        {middleRow.map((l) => (
          <KeypadLetter key={l} letter={l}></KeypadLetter>
        ))}
        {lowerLower.map((l) => (
          <KeypadLetter key={l} letter={l}></KeypadLetter>
        ))}
      </section>
    </>
  );
};

const KeypadLetter: FC<{ letter: string; color?: string }> = ({
  letter,
  color,
}) => {
  return (
    <div className={'letter' + color ? color : 'gray'}>{letter}</div>
  );
};

const useWordy = (solution: string) => {
  const [turn, setTurn] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [history, setHistory] = useState([...Array('')]);
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [currentGuess, setCurrentGuess] = useState('');

  function foramtGuess(): Guesses {
    const solutionArray = [...solution];
    const formattedGuess = [...currentGuess].map((l) => {
      return {
        key: l,
        color: 'gray',
      };
    });

    formattedGuess.forEach((l, i) => {
      if (l.key === solutionArray[i]) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = '';
      }
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = '';
      }
    });

    return formattedGuess;
  }

  function addNewGuess(formatted: Guesses) {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setTurn((prev) => {
      return prev + 1;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[turn] = formatted;
      //console.log('setGuesses ======== ', newGuesses);
      return newGuesses;
    });
    setCurrentGuess('');
  }

  function handleKeyup(e: KeyboardEvent) {
    const { key } = e;
    console.log('handle key ...', key);

    if (key === 'Enter') {
      if (turn > 5) {
        console.log('استخدمت جميع المحاولات');
        return;
      }
      if (currentGuess.length !== 5) {
        console.log('يجب كتابة كلمة من خمسة أحرف');
        return;
      }
      if (history.includes(currentGuess)) {
        console.log('خمنت هذه الكلمة مسبقا', [...history]);
        return;
      }

      const formatted = foramtGuess();
      console.log('formatted ==-=-- ', formatted);
      addNewGuess(formatted);
    }

    if (key === 'Backspace') {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (currentGuess.length < 5) {
      if (/[ء-ي]$/.test(key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => prev + key);
        }
      }
    }

    if (currentGuess.length > 5) {
      return;
    }
  }

  return {
    turn,
    isCorrect,
    history,
    guesses,
    currentGuess,
    handleKeyup,
  };
};
