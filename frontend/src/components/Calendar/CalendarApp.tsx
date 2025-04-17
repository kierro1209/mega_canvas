import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import CalendarHeader from './CalendarHeader';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import AgendaView from './AgendaView';

const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 14));
  const [view, setView] = useState('Month');
  
  const renderView = () => {
    switch (view) {
      case 'Day':
        return <DayView currentDate={currentDate} events={[]} />;
      case 'Week':
        return <WeekView currentDate={currentDate} events={[]} />;
      case 'Month':
        return <MonthView currentDate={currentDate} events={[]} />;
      case 'Agenda':
        return <AgendaView events={[]} />;
      default:
        return <MonthView currentDate={currentDate} events={[]} />;
    }
  };

  return (
    <div className="h-full">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium rounded-md bg-white border hover:bg-muted/20">
              Today
            </button>
            <div className="flex gap-1">
              <button className="p-2 rounded-lg hover:bg-muted/20">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted/20">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <Select.Root value={view} onValueChange={setView}>
              <Select.Trigger className="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium bg-white border hover:bg-muted/20 gap-2">
                <Select.Value>{view}</Select.Value>
                <Select.Icon>
                  <ChevronDown className="w-4 h-4" />
                </Select.Icon>
              </Select.Trigger>
              
              <Select.Portal>
                <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border">
                  <Select.Viewport className="p-1">
                    <Select.Item value="Day" className="relative flex items-center px-8 py-2 text-sm rounded-sm hover:bg-muted/20 cursor-pointer outline-none">
                      <Select.ItemText>Day</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Week" className="relative flex items-center px-8 py-2 text-sm rounded-sm hover:bg-muted/20 cursor-pointer outline-none">
                      <Select.ItemText>Week</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Month" className="relative flex items-center px-8 py-2 text-sm rounded-sm hover:bg-muted/20 cursor-pointer outline-none">
                      <Select.ItemText>Month</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Agenda" className="relative flex items-center px-8 py-2 text-sm rounded-sm hover:bg-muted/20 cursor-pointer outline-none">
                      <Select.ItemText>Agenda</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>
      </div>
      <div className="p-4">
        {renderView()}
      </div>
    </div>
  );
};

export default CalendarApp;
