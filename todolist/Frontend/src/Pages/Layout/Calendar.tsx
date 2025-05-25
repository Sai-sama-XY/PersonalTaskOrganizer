import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';

// Types
export type DateValue = Date | null;

export interface DateRange {
  startDate: DateValue;
  endDate: DateValue;
}

export type CalendarMode = 'single' | 'range';

interface CalendarProps {
  mode?: CalendarMode;
  selectedDate?: DateValue;
  dateRange?: DateRange;
  onDateSelect?: (date: DateValue) => void;
  onRangeSelect?: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  className?: string;
}

// Utility functions
const getDaysInMonth = (month: Date): Date[] => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysFromPrevMonth = firstDayOfWeek;
  const totalDays = 42;
  const days: Date[] = [];

  const prevMonth = new Date(year, monthIndex, 0);
  const prevMonthLastDay = prevMonth.getDate();

  for (let i = prevMonthLastDay - daysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {
    days.push(new Date(year, monthIndex - 1, i));
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push(new Date(year, monthIndex, i));
  }

  const remainingDays = totalDays - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, monthIndex + 1, i));
  }

  return days;
};

const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isInMonth = (date: Date, month: Date): boolean => {
  return (
    date.getMonth() === month.getMonth() &&
    date.getFullYear() === month.getFullYear()
  );
};

const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

const isInRange = (date: Date, startDate: Date | null, endDate: Date | null): boolean => {
  if (!startDate || !endDate) return false;
  const time = date.getTime();
  return time >= startDate.getTime() && time <= endDate.getTime();
};

const isDisabledDate = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[]
): boolean => {
  if (minDate && date.getTime() < minDate.getTime()) return true;
  if (maxDate && date.getTime() > maxDate.getTime()) return true;
  if (disabledDates) {
    return disabledDates.some(disabledDate => isSameDay(date, disabledDate));
  }
  return false;
};

const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Calendar Day Component
const CalendarDay: React.FC<{
  day: Date;
  inCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  onClick: () => void;
}> = ({
  day,
  inCurrentMonth,
  isSelected,
  isToday,
  isDisabled,
  isInRange,
  isRangeStart,
  isRangeEnd,
  onClick
}) => {
  const baseClasses = "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 text-sm";
  
  let dayClasses = `${baseClasses} `;
  
  if (isDisabled) {
    dayClasses += "text-gray-300 cursor-not-allowed";
  } else if (!inCurrentMonth) {
    dayClasses += "text-gray-400 hover:bg-gray-100";
  } else if (isSelected || isRangeStart || isRangeEnd) {
    dayClasses += "bg-blue-500 text-white font-medium hover:bg-blue-600";
  } else if (isInRange) {
    dayClasses += "bg-blue-100 text-blue-800 hover:bg-blue-200";
  } else if (isToday) {
    dayClasses += "border border-blue-500 text-blue-800 font-medium hover:bg-blue-50";
  } else {
    dayClasses += "text-gray-700 hover:bg-gray-100";
  }

  return (
    <button
      type="button"
      className={dayClasses}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={day.toLocaleDateString()}
      aria-selected={isSelected || isRangeStart || isRangeEnd}
      aria-current={isToday ? "date" : undefined}
    >
      {day.getDate()}
    </button>
  );
};

// Main Calendar Component
export const Calendar: React.FC<CalendarProps> = ({
  mode = 'single',
  selectedDate = null,
  dateRange = { startDate: null, endDate: null },
  onDateSelect,
  onRangeSelect,
  minDate,
  maxDate,
  disabledDates,
  className = ''
}) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (mode === 'single' && selectedDate) {
      return new Date(selectedDate);
    } else if (mode === 'range' && (dateRange.startDate || dateRange.endDate)) {
      return new Date(dateRange.startDate || dateRange.endDate || new Date());
    }
    return new Date();
  });

  const [internalDateRange, setInternalDateRange] = useState<DateRange>(dateRange);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(selectedDate);
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);

  useEffect(() => {
    setInternalDateRange(dateRange);
  }, [dateRange]);

  useEffect(() => {
    setInternalSelectedDate(selectedDate);
  }, [selectedDate]);

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };

  const handleDateClick = (date: Date) => {
    if (mode === 'single') {
      setInternalSelectedDate(date);
      onDateSelect?.(date);
    } else {
      const { startDate, endDate } = internalDateRange;
      let newRange: DateRange;

      if (!startDate || endDate) {
        newRange = { startDate: date, endDate: null };
      } else {
        if (date < startDate) {
          newRange = { startDate: date, endDate: startDate };
        } else {
          newRange = { startDate, endDate: date };
        }
      }

      setInternalDateRange(newRange);
      onRangeSelect?.(newRange);
    }
  };

  const handleClear = () => {
    if (mode === 'single') {
      setInternalSelectedDate(null);
      onDateSelect?.(null);
    } else {
      const emptyRange = { startDate: null, endDate: null };
      setInternalDateRange(emptyRange);
      onRangeSelect?.(emptyRange);
    }
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 flex flex-col h-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {mode === 'single' ? 'Select Date' : 'Select Date Range'}
        </h2>

        {((mode === 'single' && internalSelectedDate) || 
          (mode === 'range' && (internalDateRange.startDate || internalDateRange.endDate))) && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Clear selection"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between p-2">
        <button
          type="button"
          onClick={handlePreviousMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>

        <button
          type="button"
          onClick={() => setIsMonthSelectorOpen(!isMonthSelectorOpen)}
          className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 font-medium text-gray-800 transition-colors"
        >
          <CalendarIcon size={16} className="text-blue-600" />
          <span>{formatMonthYear(currentMonth)}</span>
        </button>

        <button
          type="button"
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {isMonthSelectorOpen && (
        <div className="absolute z-10 mt-1 w-64 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="grid grid-cols-3 gap-1">
            {MONTHS.map((month, index) => (
              <button
                key={month}
                onClick={() => {
                  const newDate = new Date(currentMonth);
                  newDate.setMonth(index);
                  setCurrentMonth(newDate);
                  setIsMonthSelectorOpen(false);
                }}
                className={`px-2 py-1 text-sm rounded ${
                  index === currentMonth.getMonth()
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'hover:bg-gray-100'
                }`}
              >
                {month.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-grow">
        <div className="grid grid-cols-7 mb-1">
          {WEEKDAYS.map(weekday => (
            <div 
              key={weekday} 
              className="text-xs text-gray-500 font-medium text-center py-1"
            >
              {weekday}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const inCurrentMonth = isInMonth(day, currentMonth);
            const isSelectedDay = mode === 'single' 
              ? isSameDay(day, internalSelectedDate)
              : false;
            const isDisabled = isDisabledDate(day, minDate, maxDate, disabledDates);
            const isRangeDay = mode === 'range' && internalDateRange.startDate && internalDateRange.endDate 
              ? isInRange(day, internalDateRange.startDate, internalDateRange.endDate)
              : false;
            const isRangeStart = mode === 'range' && internalDateRange.startDate 
              ? isSameDay(day, internalDateRange.startDate)
              : false;
            const isRangeEnd = mode === 'range' && internalDateRange.endDate 
              ? isSameDay(day, internalDateRange.endDate)
              : false;

            return (
              <CalendarDay
                key={index}
                day={day}
                inCurrentMonth={inCurrentMonth}
                isSelected={isSelectedDay}
                isToday={isToday(day)}
                isDisabled={isDisabled}
                isInRange={isRangeDay}
                isRangeStart={isRangeStart}
                isRangeEnd={isRangeEnd}
                onClick={() => handleDateClick(day)}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <button
          type="button"
          onClick={() => handleDateClick(new Date())}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Today
        </button>
      </div>
    </div>
  );    
};

export default Calendar;