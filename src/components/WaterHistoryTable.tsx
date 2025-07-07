
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Droplets } from 'lucide-react';

interface WaterIntakeHistory {
  id: string;
  date: string;
  water_intake: number;
  created_at: string;
}

interface WaterHistoryTableProps {
  history: WaterIntakeHistory[];
}

const WaterHistoryTable: React.FC<WaterHistoryTableProps> = ({ history }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatLiters = (ml: number) => {
    return (ml / 1000).toFixed(1);
  };

  if (history.length === 0) {
    return (
      <div className="glass rounded-2xl p-6">
        <h4 className="font-semibold mb-4 flex items-center">
          <Droplets className="mr-2 text-electric" size={20} />
          Water Intake History
        </h4>
        <p className="text-gray-400 text-center py-4">No water intake history yet</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h4 className="font-semibold mb-4 flex items-center">
        <Droplets className="mr-2 text-electric" size={20} />
        Water Intake History (Last 7 days)
      </h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount (ml)</TableHead>
            <TableHead>Liters</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">
                {formatDate(entry.date)}
              </TableCell>
              <TableCell>
                <span className="text-electric">{entry.water_intake}ml</span>
              </TableCell>
              <TableCell>
                <span className="text-neon font-semibold">{formatLiters(entry.water_intake)}L</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WaterHistoryTable;
