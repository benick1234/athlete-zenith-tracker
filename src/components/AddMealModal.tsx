
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeal: (meal: { name: string; calories: number; type: string }) => void;
}

const AddMealModal: React.FC<AddMealModalProps> = ({ isOpen, onClose, onAddMeal }) => {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [mealType, setMealType] = useState('breakfast');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mealName.trim() && calories) {
      onAddMeal({
        name: mealName.trim(),
        calories: parseInt(calories),
        type: mealType
      });
      setMealName('');
      setCalories('');
      setMealType('breakfast');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Meal</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Meal Name</label>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-electric"
              placeholder="e.g., Chicken Salad"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Calories</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-electric"
              placeholder="e.g., 420"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Meal Type</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-electric"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-electric hover:bg-electric/80 text-black"
            >
              <Plus size={16} className="mr-2" />
              Add Meal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMealModal;
