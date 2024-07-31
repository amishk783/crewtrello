import React, { useState } from "react";
import { cn } from "@/app/_utils";
import {
  startOfMonth,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  isToday,
  parse,
  format,
  add,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Event {
  title: string;
  date: Date;
}

interface Props {
  className: string;
  events?: Event[];
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export const Calendar: React.FC<Props> = ({ className }) => {
  const currentDate = new Date();
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [currentMonth, setCurrentMonth] = useState(
    format(currentDate, "MMMM yyyy")
  );
  const firstDayOfMonth = parse(currentMonth, "MMMM yyyy", new Date());
  const endDayofMonth = endOfMonth(firstDayOfMonth);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: endDayofMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  const previousMonth = () => {
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrentMonth(format(firstDayOfPrevMonth, "MMMM yyyy"));
  };
  const nextMonth = () => {
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrentMonth(format(firstDayOfNextMonth, "MMMM yyyy"));
  };
  return (
    <div className="absolute z-50 w-72 -ml-14 p-2 bg-white rounded-lg mt-8">
      <div className="flex items-center mb-2">
        <h2 className="flex-auto pl-2 text-lg font-bold">
          {format(firstDayOfMonth, "MMMM yyyy")}
        </h2>
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="font-bold text-center ">
            {day}
          </div>
        ))}
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return (
            <div
              key={`empty-${index}`}
              className="rounded-md p-2 text-center"
            />
          );
        })}
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={cn(
              "rounded-md p-2 text-center drop-shadow-sm",
              isToday(day) ? "bg-blue-100" : " bg-slate-50"
            )}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};
