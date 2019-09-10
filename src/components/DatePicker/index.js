/* eslint-disable no-console  */
import React, { useState } from 'react';
import styled from 'styled-components/macro'; // eslint-disable-line
import {
  format,
  isEqual,
  isWithinInterval,
  eachDayOfInterval,
  getDay,
  subDays,
  addDays,
  differenceInDays,
  getDaysInMonth,
  isToday,
  getDate,
  isWeekend,
  startOfMonth,
  isFirstDayOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  isSameMonth
} from 'date-fns';

import * as Styled from './styled';
import { ReactComponent as LeftArrowIcon } from '../../assets/SVG/arrow-left.svg';
import { ReactComponent as RightArrowIcon } from '../../assets/SVG/arrow-right.svg';
import { ReactComponent as ClockIcon } from '../../assets/SVG/clock.svg';
import ClickOutside from '../../components/ClickOutside';

const css = `
  font-size: 1.6rem;
  background-color: var(--color-less-white);
`;

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const constructCalendarDates = date => {
    const firstDateOfMonth = startOfMonth(date);
    const firstWeekdayOfMonth = getDay(firstDateOfMonth);
    // If firstWeekdayOfMonth is 0, the month starts on a Sunday, so there's no need to
    // find a date from the previous month, else find the last Sunday from previous month
    const fromDate =
      firstWeekdayOfMonth !== 0
        ? subDays(firstDateOfMonth, firstWeekdayOfMonth)
        : firstDateOfMonth;
    // Current month's length
    const daysInCurrentMonth = getDaysInMonth(date);
    // Number of days to the left of the first day of the current month
    const daysFromPreviousMonth = differenceInDays(firstDateOfMonth, fromDate);
    // Number of days to the right of the last day of the current month.
    // Since we have 7 rows (weeks) of 6 columns (days), the goal is to fill out the rest of the
    // days with as many days from the next month to react the 42 days needed for calendar view
    const daysFromNextMonth = 42 - (daysInCurrentMonth + daysFromPreviousMonth);
    // If current month's 1st day starts on a Sunday start will be current month's 1st day, else
    // we will go back to previous month's last Sunday and use that as the starting date
    const start = subDays(startOfMonth(date), daysFromPreviousMonth);
    // Find out the date from next month needed to complete the 42 dates in current calendar view
    const end = addDays(endOfMonth(date), daysFromNextMonth);
    // array of 42 dates
    const dates = eachDayOfInterval({ start, end });
    return dates;
  };

  const handleBackToToday = () => {
    setDate(new Date());
  };

  const handleNextMonth = () => {
    setDate(addMonths(date, 1));
  };

  const handlePrevMonth = () => {
    setDate(subMonths(date, 1));
  };

  const handleClickDay = d => {
    if (!isSameMonth(d, date)) setDate(d);
    setSelectedDate(d);
    setShowCalendar(false);
  };

  const onClickOutside = () => {
    setShowCalendar(false);
  };

  return (
    <ClickOutside onClickOutside={onClickOutside}>
      <Styled.DatePickerWrapper css={css}>
        <Styled.DatePicker>
          {/* Search input */}
          <Styled.DatePickerSearch>
            <Styled.DatePickerInput
              placeholder="Select a day"
              onFocus={() => setShowCalendar(true)}
            />
          </Styled.DatePickerSearch>
          {/* DatePicker or TimePicker */}
          {showCalendar ? (
            <Styled.DatePickerCalendar showCalendar={showCalendar}>
              {/* Header */}
              <Styled.CalendarHeader>
                <Styled.CalendarHeading>
                  <Styled.TodayBtn onClick={handleBackToToday}>
                    Today
                  </Styled.TodayBtn>
                  <Styled.TimeBtn>
                    Set Time <ClockIcon className="icon icon-smallest" />
                  </Styled.TimeBtn>
                  <Styled.HeadingDate>
                    <b>{format(date, 'MMMM')}</b>
                    {format(date, 'yyyy')}
                  </Styled.HeadingDate>
                </Styled.CalendarHeading>
                <Styled.LeftArrow onClick={handlePrevMonth}>
                  <LeftArrowIcon />
                </Styled.LeftArrow>
                <Styled.RightArrow onClick={handleNextMonth}>
                  <RightArrowIcon />
                </Styled.RightArrow>
              </Styled.CalendarHeader>
              {/* Dates */}
              <Styled.CalendarDates>
                <Styled.CalendarWeekdays>
                  {DAYS_OF_WEEK.map((day, i) => (
                    <Styled.CalendarWeekday key={`${day}-${i}`}>
                      {day}
                    </Styled.CalendarWeekday>
                  ))}
                </Styled.CalendarWeekdays>
                <Styled.CalendarDays>
                  {constructCalendarDates(date).map((d, i) => (
                    <Styled.CalendarDay
                      key={i}
                      isToday={isToday(d)}
                      isWeekend={isWeekend(d)}
                      isInMonth={isWithinInterval(d, {
                        start: startOfMonth(date),
                        end: endOfMonth(date)
                      })}
                      isSelected={isEqual(d, selectedDate)}
                      onClick={() => handleClickDay(d)}
                    >
                      {isFirstDayOfMonth(d) ? format(d, 'MMM d') : getDate(d)}
                    </Styled.CalendarDay>
                  ))}
                </Styled.CalendarDays>
              </Styled.CalendarDates>
            </Styled.DatePickerCalendar>
          ) : (
            <Styled.DatePickerTime>
              <Styled.TimeHeader>
                <Styled.TimeHeading>Current Time</Styled.TimeHeading>
                <Styled.PinMinutes>
                  <Styled.PinMinuteBtn color="orange">
                    15-minute
                  </Styled.PinMinuteBtn>
                  <Styled.PinMinuteBtn color="orangeRed">
                    30-minute
                  </Styled.PinMinuteBtn>
                  <Styled.PinMinuteBtn color="FireBrick">
                    45-minute
                  </Styled.PinMinuteBtn>
                </Styled.PinMinutes>
              </Styled.TimeHeader>
              <Styled.TimeHours>
                <Styled.SectionHeading>Hours</Styled.SectionHeading>
                <Styled.TimeList>
                  {[...Array(12)].map((_, i) => (
                    <Styled.TimeItem key={i}>{i + 1}</Styled.TimeItem>
                  ))}
                </Styled.TimeList>
              </Styled.TimeHours>
              <Styled.TimeMinutes>
                <Styled.SectionHeading>Minutes</Styled.SectionHeading>
                <Styled.TimeList isMinutesList>
                  {[...Array(60)].map((_, i) => (
                    <Styled.TimeItem isMinuteItem key={i}>
                      {i < 10 ? `0${i}` : i}
                    </Styled.TimeItem>
                  ))}
                </Styled.TimeList>
              </Styled.TimeMinutes>
              <Styled.TimePeriods>
                <Styled.PeriodBtn AM>AM</Styled.PeriodBtn>
                <Styled.PeriodBtn PM>PM</Styled.PeriodBtn>
              </Styled.TimePeriods>
            </Styled.DatePickerTime>
          )}
        </Styled.DatePicker>
      </Styled.DatePickerWrapper>
    </ClickOutside>
  );
};

export default DatePicker;
