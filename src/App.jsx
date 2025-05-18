import { useState, useEffect } from 'react'

function App() {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [upcomingAnniversaries, setUpcomingAnniversaries] = useState([]);

  const anniversaries = [
    { name: "First Kiss", date: new Date(2023, 11, 22) }, // December 19th
    { name: "Alma Born", date: new Date(2023, 11, 21) }, 
    { name: "Bareburger Date 0", date: new Date(2023, 10, 22) }, 
    { name: "First Date", date: new Date(2024, 0, 8) }, 
    { name: "Met on Boat", date: new Date(2024, 10, 3) },
    { name: "Anniversary", date: new Date(2024, 1, 14) },
    { name: "Chicago Trip", date: new Date(2024, 1, 16) },
    { name: "First ILY", date: new Date(2024, 2, 9) },
    { name: "ND Birthday", date: new Date(2024, 3, 2) },
    { name: "Second Chicago Trip", date: new Date(2024, 2, 26) },
    { name: "Alma best day ever", date: new Date(2024, 4, 3) },
    { name: "Alma adopted", date: new Date(2024, 5, 2) },
    { name: "Grand Canyon Trip", date: new Date(2024, 5, 30) },
    { name: "Glass Animals Concert", date: new Date(2024, 7, 13) },
    { name: "Painting Date", date: new Date(2024, 9, 20) },
    { name: "Alma first snow", date: new Date(2024, 1, 9) }
  ];

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const valentinesDay = new Date(2024, 1, 14, 0, 0, 0); // February 14, 2024, midnight
      const now = new Date();
      const difference = now - valentinesDay;

      // Convert milliseconds to various units
      const seconds = Math.floor((difference / 1000) % 60);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      
      // Calculate years, months, and remaining days
      const years = Math.floor(totalDays / 365.25);
      const remainingDaysAfterYears = totalDays - (years * 365.25);
      const months = Math.floor(remainingDaysAfterYears / 30.44);
      const remainingDaysAfterMonths = Math.floor(remainingDaysAfterYears - (months * 30.44));
      const weeks = Math.floor(remainingDaysAfterMonths / 7);
      const days = Math.floor(remainingDaysAfterMonths % 7);

      setTimeElapsed({
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds
      });

      // Calculate upcoming anniversaries
      const now2 = new Date();
      const upcomingDates = anniversaries.map(anniversary => {
        // Create a date for this year's occurrence of the anniversary
        const thisYear = new Date(now2.getFullYear(), anniversary.date.getMonth(), anniversary.date.getDate());
        
        // Create a date for next year's occurrence
        const nextYear = new Date(now2.getFullYear() + 1, anniversary.date.getMonth(), anniversary.date.getDate());
        
        // Choose the closest future date
        const nextDate = thisYear > now2 ? thisYear : nextYear;
        
        const timeUntil = nextDate - now2;
        const weeksUntil = Math.floor(timeUntil / (1000 * 60 * 60 * 24 * 7));
        const daysUntil = Math.floor((timeUntil % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        
        return {
          ...anniversary,
          nextDate,
          timeUntil,
          countdown: { weeks: weeksUntil, days: daysUntil }
        };
      });

      // Sort by closest date and show all
      const sortedDates = upcomingDates.sort((a, b) => a.timeUntil - b.timeUntil);

      setUpcomingAnniversaries(sortedDates);
    };

    // Update immediately and then every second
    calculateTimeElapsed();
    const timer = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-purple-900 to-indigo-900 flex flex-col items-center justify-start py-12 overflow-x-hidden">
      <div className="container mx-auto px-4 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-12 tracking-tight">
          Dating Since
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 max-w-7xl mx-auto">
          {Object.entries(timeElapsed).map(([unit, value]) => (
            <div key={unit} 
                 className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-6 text-white transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <div className="text-3xl md:text-4xl lg:text-6xl font-bold mb-2">
                {value}
              </div>
              <div className="text-xs md:text-sm lg:text-base capitalize opacity-75">
                {unit}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="scrolling-text-container fade-edges">
          <div className="scrolling-text-inner">
            <span className="scrolling-text">I love you SB!! ❤️ I love you SB!! ❤️ I love you SB!! ❤️ I love you SB!! ❤️ I love you SB!! ❤️ </span>
            <span className="scrolling-text">I love you SB!! ❤️ I love you SB!! ❤️ I love you SB!! ❤️ I love you SB!! ❤️ I love you SB!! ❤️ </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
          Upcoming Anniversaries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto justify-items-center">
          {upcomingAnniversaries.map((anniversary) => (
            <div key={anniversary.name} 
                 className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-6 text-white transform transition-all duration-300 hover:scale-105 hover:bg-white/15 w-full max-w-sm">
              <div className="text-lg md:text-xl lg:text-2xl font-bold mb-2">
                {anniversary.name}
              </div>
              <div className="text-xs md:text-sm opacity-75">
                {anniversary.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </div>
              <div className="mt-2 md:mt-3 text-base md:text-lg">
                {anniversary.countdown.weeks > 0 && `${anniversary.countdown.weeks}w `}
                {anniversary.countdown.days}d
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
