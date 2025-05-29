import { useState, useEffect } from "react";
import { Reminder } from "@/types/Reminder";
import { FaArrowLeftLong } from "react-icons/fa6";

interface ReminderFormProps {
  reminderToEdit?: Reminder;
  onSave: (updatedReminder: Reminder) => void;
  onBack: () => void;
}

const pets = ["Browny", "Kitty", "Simba"];
const categories = ["General", "Breakfast", "Lifestyle"];
const frequencies = ["Everyday", "Weekdays", "Weekends", "Custom"];

const ReminderForm = ({ reminderToEdit, onSave, onBack }: ReminderFormProps) => {
  const createInitialForm = (): Reminder => ({
    id: Date.now(),
    pet: pets[0],
    category: categories[0],
    title: "",
    notes: "",
    startDate: new Date().toISOString().split("T")[0],
    reminderTime: new Date().toTimeString().slice(0, 5),
    frequency: frequencies[0],
    status: "Pending",
    streak: 0,
  });

  const [formData, setFormData] = useState<Reminder>(createInitialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [successMessage, setSuccessMessage] = useState("");
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    if (reminderToEdit) {
      setFormData(reminderToEdit);
    }
  }, [reminderToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "title" && value.trim() !== "") {
      setTitleError("");
    }
  };

  const handleSave = () => {
    if (formData.title.trim() === "") {
      setTitleError("Title is required");
      return;
    }

    const localData = localStorage.getItem("PetReminderData");
    const parsedData: Reminder[] = localData ? JSON.parse(localData) : [];

    let updatedData: Reminder[];

    if (reminderToEdit) {
      updatedData = parsedData.map((item) =>
        item.id === reminderToEdit.id ? { ...formData, id: reminderToEdit.id } : item
      );
      setSuccessMessage("Updated successfully!");
    } else {
      updatedData = [...parsedData, formData];
      setSuccessMessage("Added successfully!");
    }

    localStorage.setItem("PetReminderData", JSON.stringify(updatedData));

    setIsSaving(true);
    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          onSave(formData);
        }
        return prev - 1;
      });
    }, 1000);
  };

  return isSaving ? (
    <div className="p-4 max-w-md mx-auto text-center">
      <h2 className="text-lg font-bold text-green-600 mb-4">✅ {successMessage}</h2>
      <p className="text-gray-700">
        Returning in <span className="font-semibold">{countdown}</span>...
      </p>
    </div>
  ) : (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-gray-300 rounded-md p-2 cursor-pointer" onClick={onBack}>
          <FaArrowLeftLong />
        </button>
        <h2 className="text-lg font-semibold">
          {reminderToEdit ? "Edit Reminder" : "Add Reminder"}
        </h2>
        <button className="text-green-600 font-semibold" onClick={handleSave}>
          Save
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <select name="pet" value={formData.pet} onChange={handleChange} className="p-2 border rounded">
          {pets.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select name="category" value={formData.category} onChange={handleChange} className="p-2 border rounded">
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="bg-black text-white p-2 rounded-t font-medium">Reminder Info</div>
      <div className="p-2 border border-t-0 rounded-b">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          maxLength={100}
          placeholder="Type here..."
          className={`w-full p-2 border rounded mb-1 ${titleError ? "border-red-500" : ""}`}
        />
        {titleError && <p className="text-red-600 text-sm mb-2">{titleError}</p>}

        <div className="flex items-center justify-between">
          <input
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add Notes (Optional)"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="bg-black text-white p-2 rounded-t font-medium mt-6">Reminder Settings</div>
      <div className="p-2 border border-t-0 rounded-b space-y-3">
        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Reminder Time</label>
          <input
            type="time"
            name="reminderTime"
            value={formData.reminderTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Reminder Frequency</label>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {frequencies.map((freq) => (
              <option key={freq} value={freq}>{freq}</option>
            ))}
          </select>

        </div>
      </div>
    </div>
  );
};

export default ReminderForm;
