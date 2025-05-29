import React from 'react';
import { GiAchievement } from "react-icons/gi";
import { format, addDays, isToday } from 'date-fns';

const CalendarStrip: React.FC = () => {
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, i) => addDays(today, i - 5));

    return (
        <div>
            <div className='flex flex-row items-center-safe my-3 text-gray-500'>
                <GiAchievement size={25} />
                <span>Your Streaks</span>
            </div>

            <div className="rounded-xl p-1 sm:p-2 md:p-4 text-center" style={{ backgroundColor: "#19b35e" }}>
                <p className='text-lg font-semibold'>{format(today, 'MMMM yyyy')}</p>
                <div className="flex justify-center flex-wrap items-center mt-2">
                    {days.map((day, index) => (
                        <div
                            key={index}
                            className={`p-1 sm:p-2 md:p-4 text-center w-16 rounded ${isToday(day) && 'bg-gray-50/30 rounded-4xl'}`}
                        >
                            <div className={`text-lg font-semibold mb-3`}>
                                {format(day, 'EEEE').slice(0, 2)}
                            </div>
                            <div className={`text-lg text-white rounded-4xl  ${index < 2 && 'line-through'} 
                           ${isToday(day) ? 'bg-none' : index >= 2 && index < 5 ? 'bg-yellow-400' : 'bg-gray-50/30'}`}
                            >
                                {format(day, 'd')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};



export default CalendarStrip;