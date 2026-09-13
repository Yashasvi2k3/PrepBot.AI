import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function Timer({ timeLeft = 0, totalTime = 60 }) {
  const safeTotal = totalTime || 60
  const percentage = Math.max(0, Math.min(100, (timeLeft / safeTotal) * 100))
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const display = `${minutes}:${seconds.toString().padStart(2, '0')}`

  return (
    <div className="w-28 h-28">
      <CircularProgressbar
        value={percentage}
        text={display}
        styles={buildStyles({
          textSize: '22px',
          pathColor: timeLeft <= 10 ? '#ef4444' : '#059669',
          textColor: '#1f2937',
          trailColor: '#e5e7eb',
        })}
      />
    </div>
  )
}

export default Timer
