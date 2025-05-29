import { useState } from 'react';
import CalendarStrip from '@/components/CalendarStrip';
import ReminderCard from '@/components/ReminderCard';
import FilterBar from '@/components/FilterBar';
import ReminderForm from '@/components/ReminderForm';
import { FiPlus } from "react-icons/fi";

const RemindersMain = () => {
    const [showForm, setShowForm] = useState(false);
    const [refreshKey, setRefreshKey] = useState<number>(Date.now());

    const handleSave = () => {
        setShowForm(false);
        setRefreshKey(Date.now());
    };

    const handleBack = () => {
        setShowForm(false);
    };

    return (
        <div className="p-4 max-w-lg mx-auto relative min-h-screen pb-20">
            <h1 className="text-xl font-semibold mb-2">Daily Reminders</h1>

            <CalendarStrip />
            <FilterBar />
            <ReminderCard refreshKey={refreshKey} />

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                    <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg">
                        <ReminderForm onSave={handleSave} onBack={handleBack} />
                    </div>
                </div>
            )}

            <button
                onClick={() => setShowForm(true)}
                className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl shadow-lg z-50"
                aria-label="Add Reminder"
            >
                <FiPlus />
            </button>
        </div>
    );
};

export default RemindersMain;
