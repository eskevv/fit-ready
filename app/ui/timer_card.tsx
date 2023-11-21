'use client';

import {useEffect, useState} from "react";
import {sql} from '@vercel/postgres';

interface TimerCardProps {
  name: string;
  duration: number;
}

async function logExercise(name: string, duration: number) {
  try {
    await sql`
      INSERT INTO exercises (name, duration)
      VALUES (${name}, ${duration})`;
    console.log('success');
    return 'Exercise logged successfully';
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to log exercise');
  }
}

const TimerCard: React.FC<TimerCardProps> = ({duration, name}) => {
  const [timer, setTimer] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive && timer < duration) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    if (timer === duration) {
      setIsCompleted(true);
      setIsActive(false);
      logExercise("run", 20)
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timer, duration, isActive]);

  const handleClick = () => {
    if (!isActive) {
      setTimer(0);
      setIsCompleted(false);
      setIsActive(true);
    }
  };

  return (
    <div
      className={`flex justify-between p-2 cursor-pointer rounded text-sm ${isCompleted ? 'bg-green-500' : isActive ? 'bg-orange-800' : 'bg-gray-500'}`}
      onClick={handleClick}
    >
      <p>{name}</p>
      <p>Timer: {timer}/{duration}</p>

    </div>
  );
};

export default TimerCard
