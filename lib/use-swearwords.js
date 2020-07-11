import { useEffect, useState } from 'react'
import useKonami from 'react-use-konami';

let lastValue = false;

const useSwearwords = () => {
  const [shouldSwear, setShouldSwear] = useState(lastValue)

  useKonami(() => {
    const nextValue = !shouldSwear;
    lastValue = nextValue;
    setShouldSwear(nextValue);
    try {
      localStorage.setItem('swear', nextValue);
    } catch (err) {
      // Ignore.
    }
  });

  useEffect(() => {
    try {
      if (localStorage.getItem('swear') === 'true') {
        lastValue = true;
        setShouldSwear(true);
      }
    } catch (err) {
      // Ignore.
    }
  }, [])

  return shouldSwear
}

export default useSwearwords
