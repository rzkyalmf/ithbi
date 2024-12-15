"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const calculateTimeLeft = (eventDate: Date, eventStartTime: Date) => {
  // Gabungkan tanggal dan waktu mulai event
  const eventDateTime = new Date(eventDate);
  eventDateTime.setHours(
    eventStartTime.getHours(),
    eventStartTime.getMinutes(),
    eventStartTime.getSeconds()
  );

  const difference = eventDateTime.getTime() - new Date().getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
};

interface CountdownProps {
  eventDate: Date;
  eventStartTime: Date;
}

export default function Countdown({
  eventDate,
  eventStartTime,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(eventDate, eventStartTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(eventDate, eventStartTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate, eventStartTime]);

  if (timeLeft.isExpired) {
    return (
      <div className="flex items-center gap-2 justify-center">
        <Clock className="h-5 w-5 text-red-500" />
        <p className="text-red-500 font-medium">Acara telah dimulai</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 justify-center">
        <Clock className="h-5 w-5 text-green-500" />
        <p className="text-gray-700 font-medium">Waktu tersisa:</p>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-green-50 p-2 rounded-lg">
          <div className="text-xl font-bold text-green-600">
            {timeLeft.days}
          </div>
          <div className="text-xs text-gray-500">Hari</div>
        </div>
        <div className="bg-green-50 p-2 rounded-lg">
          <div className="text-xl font-bold text-green-600">
            {timeLeft.hours}
          </div>
          <div className="text-xs text-gray-500">Jam</div>
        </div>
        <div className="bg-green-50 p-2 rounded-lg">
          <div className="text-xl font-bold text-green-600">
            {timeLeft.minutes}
          </div>
          <div className="text-xs text-gray-500">Menit</div>
        </div>
        <div className="bg-green-50 p-2 rounded-lg">
          <div className="text-xl font-bold text-green-600">
            {timeLeft.seconds}
          </div>
          <div className="text-xs text-gray-500">Detik</div>
        </div>
      </div>
    </div>
  );
}
