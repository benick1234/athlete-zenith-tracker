
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface TimeSelectorProps {
  hours: number;
  minutes: number;
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
}

const TimeSelector = ({ hours, minutes, onHoursChange, onMinutesChange }: TimeSelectorProps) => {
  const adjustTime = (type: 'hours' | 'minutes', increment: boolean) => {
    if (type === 'hours') {
      onHoursChange(Math.max(0, Math.min(23, hours + (increment ? 1 : -1))));
    } else {
      onMinutesChange(Math.max(0, Math.min(59, minutes + (increment ? 5 : -5))));
    }
  };

  return (
    <div className="space-y-6">
      {/* Hours */}
      <div>
        <label className="block text-sm font-medium mb-3">Hours: {hours}</label>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustTime('hours', false)}
            className="bg-white/10 border-white/20 hover:bg-white/20"
          >
            <Minus size={16} />
          </Button>
          
          <div className="flex-1">
            <Slider
              value={[hours]}
              onValueChange={(value) => onHoursChange(value[0])}
              max={23}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustTime('hours', true)}
            className="bg-white/10 border-white/20 hover:bg-white/20"
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>

      {/* Minutes */}
      <div>
        <label className="block text-sm font-medium mb-3">Minutes: {minutes}</label>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustTime('minutes', false)}
            className="bg-white/10 border-white/20 hover:bg-white/20"
          >
            <Minus size={16} />
          </Button>
          
          <div className="flex-1">
            <Slider
              value={[minutes]}
              onValueChange={(value) => onMinutesChange(value[0])}
              max={59}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustTime('minutes', true)}
            className="bg-white/10 border-white/20 hover:bg-white/20"
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
