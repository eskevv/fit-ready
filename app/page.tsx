'use client';

import TimerCard from "@/app/ui/timer_card";
import './globals.css'
import {useState} from "react";

export default function Home() {
  const currentDate = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDayOfWeek = days[currentDate.getDay()];
  const currentMonth = months[currentDate.getMonth()];
  const day = currentDate.getUTCDate()


  const [totalSeconds, setTotalSeconds] = useState(0);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="flex flex-col items-center p-4 gap-8">
      <div className="flex flex-col items-center">
        <h1>Exercise Tracker</h1>
        <h2>{currentDayOfWeek}, {currentMonth} {day}</h2>
      </div>
      <div className="flex flex-col gap-2">
        <button className="bg-gray-900 border-2 rounded p-2">Add Exercise</button>
        <button className="bg-gray-900 border-2 rounded p-2">History</button>
        <div className="flex flex-col gap-2 border-2 p-4 min-w-[600px] bg-gray-700 rounded">
          <TimerCard duration={20} name={"running"}/>
          <TimerCard duration={5} name={"swimming"}/>
        </div>
      </div>
    </div>
  )
}
