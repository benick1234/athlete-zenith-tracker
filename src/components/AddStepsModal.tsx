
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface AddStepsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSteps: (steps: number) => void;
}

const AddStepsModal: React.FC<AddStepsModalProps> = ({ isOpen, onClose, onAddSteps }) => {
  const [steps, setSteps] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (steps) {
      onAddSteps(parseInt(steps));
      setSteps('');
      onClose();
    }
  };

  const quickAddSteps = [1000, 2500, 5000, 10000];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Steps</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Number of Steps</label>
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-electric"
              placeholder="e.g., 5000"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickAddSteps.map((stepCount) => (
              <button
                key={stepCount}
                type="button"
                onClick={() => {
                  onAddSteps(stepCount);
                  onClose();
                }}
                className="bg-electric/20 hover:bg-electric/30 border border-electric/30 text-electric p-3 rounded-lg transition-colors text-sm"
              >
                +{stepCount.toLocaleString()}
              </button>
            ))}
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
              Add Steps
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStepsModal;
