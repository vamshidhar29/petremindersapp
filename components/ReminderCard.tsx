import React, { useState, useEffect, useCallback } from 'react';
import { Reminder } from "@/types/Reminder";
import { FaCircleCheck, FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";
import ReminderForm from './ReminderForm';

interface ReminderCardProps {
  refreshKey: number;
};

const ReminderCard = ({ refreshKey }: ReminderCardProps) => {
  const initialData: Reminder[] = [
    { id: 1, pet: "Browny", category: "General", title: "Morning Walk", notes: "", startDate: "", reminderTime: "12:06", frequency: "Everyday", status: "Completed", streak: 0 },
    { id: 2, pet: "Kitty", category: "Breakfast", title: "Breakfast", notes: "", startDate: "", reminderTime: "12:06", frequency: "Everyday", status: "Completed", streak: 0 },
    { id: 3, pet: "Browny", category: "Lifestyle", title: "Evening Walk", notes: "", startDate: "", reminderTime: "12:06", frequency: "Everyday", status: "Pending", streak: 0 },
    { id: 4, pet: "Simba", category: "General", title: "Morning Walk", notes: "", startDate: "", reminderTime: "12:06", frequency: "Everyday", status: "Pending", streak: 0 }
  ];
  const [currentData, setCurrentData] = useState<Reminder[]>();
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  const fetchData = useCallback(() => {
    const localData = localStorage.getItem("PetReminderData");

    if (localData == null) {
      localStorage.setItem("PetReminderData", JSON.stringify(initialData));
      setCurrentData(initialData);
    } else {
      const parsedData: Reminder[] = JSON.parse(localData);
      setCurrentData(parsedData);
    }
  }, [initialData]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshKey]);

  const handleEditSave = (updatedReminder: Reminder) => {
    const updatedList = currentData?.map(item =>
      item.id === updatedReminder.id ? updatedReminder : item
    );
    localStorage.setItem("PetReminderData", JSON.stringify(updatedList));
    setEditingReminder(null);
    fetchData();
  };

  const handleEditCancel = () => {
    setEditingReminder(null);
  };

  const handleMarkCompleted = (id: number) => {
    const confirmComplete = confirm("Are you sure you want to mark it as completed?");
    if (!confirmComplete) return;

    const updatedList = currentData?.map(item =>
      item.id === id ? { ...item, status: "Completed" } : item
    );
    localStorage.setItem("PetReminderData", JSON.stringify(updatedList));
    alert("Marked as completed!");
    fetchData();
  };

  const handleDelete = (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this reminder?");
    if (!confirmDelete) return;
    const updatedList = currentData?.filter(item => item.id !== id);
    localStorage.setItem("PetReminderData", JSON.stringify(updatedList));
    alert("Reminder deleted!");
    fetchData();
  };

  return (
    <>
      {currentData && currentData.map(item => (
        <div key={item.id} className={`rounded-xl shadow p-4 my-2 ${item.status === "Completed" ? 'bg-gray-200 text-gray-500' : 'bg-white'}`}>
          <div className='flex flex-row items-center'>
            <h3 className={`font-semibold text-lg me-3 ${item.status === "Completed" && 'line-through'}`}>{item.title}</h3>
            {item.status === "Completed" ? (
              <div className='flex flex-row items-center bg-green-100 p-1 rounded-xl'>
                <FaCircleCheck className='text-green-500 me-1' />
                <p className='font-medium text-sm text-green-900'>{item.status}</p>
              </div>
            ) : (
              <div className='flex flex-row items-center bg-red-100 p-1 rounded-xl'>
                <MdDangerous className='text-red-500 me-1' />
                <p className='font-medium text-sm text-red-900'>{item.status}</p>
              </div>
            )}
            <FaUpRightAndDownLeftFromCenter
              className='ms-auto text-gray-500 cursor-pointer hover:text-blue-500'
              onClick={() => setEditingReminder(item)}
              title="Edit Reminder"
            />
          </div>

          <div className="flex text-sm text-gray-600 items-center gap-2 mt-1">
            <span>🐾 For {item.pet}</span>
            <span>⏰ At {item.reminderTime}</span>
            <span>🔁 {item.frequency}</span>
          </div>

          <div className="flex justify-end mt-3 gap-4">
            {item.status === "Pending" && (
              <button
                className="text-blue-600 text-sm underline cursor-pointer hover:text-blue-800"
                onClick={() => handleMarkCompleted(item.id)}
              >
                Mark as Completed
              </button>
            )}
            <FaTrashAlt
              className="text-red-500 text-lg cursor-pointer hover:text-red-700"
              title="Delete Reminder"
              onClick={() => handleDelete(item.id)}
            />
          </div>
        </div>
      ))}

      {editingReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg">
            <ReminderForm
              onSave={handleEditSave}
              onBack={handleEditCancel}
              reminderToEdit={editingReminder}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReminderCard;
