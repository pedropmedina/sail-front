/* eslint-disable no-console, react/prop-types */
import React, { useState, useEffect } from 'react';
import keyBy from 'lodash/keyBy';
import chrono from 'chrono-node';
import styled from 'styled-components/macro'; // eslint-disable-line
import {
  format,
  isDate,
  isWithinInterval,
  eachDayOfInterval,
  setMinutes,
  getMinutes,
  setHours,
  getHours,
  getDay,
  subDays,
  addDays,
  isSameDay,
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

const PIN_COLORS = [
  { time: 15, color: 'orange' },
  { time: 30, color: 'orangeRed' },
  { time: 45, color: 'FireBrick' }
];

const KEYEDBY_TIME_PIN_COLORS = keyBy(PIN_COLORS, 'time');

const DatePicker = ({ onSelectDate = () => {}, defaultDate = new Date() }) => {
  const [fieldValue, setFieldValue] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [period, setPeriod] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [selectedDate, setSelectedDate] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // set selected date to current date upon mounting component
  useEffect(() => {
    setSelectedDate(date);
    setFieldValue(format(date, 'MM/dd/yyyy h:mm a'));
  }, []);

  // update hour, minute and period on changing selectedDate's day
  useEffect(() => {
    if (selectedDate) {
      const h = getHours(selectedDate);
      setHour(h === 0 ? 12 : h > 12 ? h - 12 : h);
      setMinute(getMinutes(selectedDate));
      h < 12 ? setPeriod('am') : setPeriod('pm');
      // access date from other components from onSelectDate callback
      onSelectDate(selectedDate);
    }
  }, [selectedDate]);

  // update selected date on change field value with timeout
  useEffect(() => {
    let timeout = undefined;

    if (fieldValue) {
      // clear existing timeout
      clearTimeout(timeout);
      // set new timeout
      timeout = setTimeout(() => {
        const c = chrono.parseDate(fieldValue);
        if (isDate(c)) {
          setSelectedDate(c);
        }
      }, 700);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [fieldValue]);

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
    setFieldValue(format(d, 'MM/dd/yyyy h:mm a'));
  };

  const onClickOutside = () => {
    setShowCalendar(false);
    setShowTimePicker(false);
  };

  const handleSetHours = hour => {
    if (period) {
      if (period === 'am') {
        const h = hour === 12 ? 0 : hour;
        const d = setHours(selectedDate, h);
        setSelectedDate(d);
        setFieldValue(format(d, 'MM/dd/yyyy h:mm a'));
      } else {
        const h = hour === 12 ? 12 : hour + 12;
        const d = setHours(selectedDate, h);
        setSelectedDate(d);
        setFieldValue(format(d, 'MM/dd/yyyy h:mm a'));
      }
    } else {
      const d = setHours(selectedDate, hour);
      setSelectedDate(d);
      setFieldValue(format(d, 'MM/dd/yyyy h:mm a'));
    }
  };

  const handleSetMinutes = minute => {
    const d = setMinutes(selectedDate, minute);
    setSelectedDate(d);
    setFieldValue(format(d, 'MM/dd/yyyy h:mm a'));
  };

  const handlePeriods = period => {
    setPeriod(period);
    const h = getHours(selectedDate);
    if (h <= 11 && period === 'pm') {
      const d = setHours(selectedDate, h + 12);
      setSelectedDate(d);
      setFieldValue(format(d, 'MM/dd/yyyy h:mm a'));
    } else if (h >= 11 && period === 'am') {
      const d = setHours(selectedDate, h - 12);
      setSelectedDate(d);
      setFieldValue(format(d, 'MM/dd/yyyy h:mm a'));
    }
  };

  const handleTimePicker = () => {
    setShowTimePicker(true);
    setShowCalendar(false);
  };

  const handleFocus = () => {
    setShowCalendar(true);
    setShowTimePicker(false);
  };

  const handleChange = event => {
    const value = event.target.value;
    setFieldValue(value);
  };

  const handleBlur = event => {
    const date = chrono.parseDate(event.target.value);
    if (isDate(date)) {
      setFieldValue(format(date, 'MM/dd/yyyy h:mm a'));
    }
  };

  return (
    <ClickOutside onClickOutside={onClickOutside}>
      <Styled.DatePickerWrapper css={css}>
        <Styled.DatePicker>
          {/* Search input */}
          <Styled.DatePickerSearch>
            <Styled.DatePickerInput
              placeholder="Pick/Type a day and time (e.g., next Monday at 11:30 AM, Friday, 12/12/2019, ...)"
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={fieldValue}
              onChange={handleChange}
            />
            <Styled.CalendarIcon />
          </Styled.DatePickerSearch>
          {/* DatePicker or TimePicker */}
          {!!showCalendar && (
            <Styled.DatePickerCalendar showCalendar={showCalendar}>
              {/* Header */}
              <Styled.CalendarHeader>
                <Styled.CalendarHeading>
                  <Styled.TodayBtn onClick={handleBackToToday}>
                    Today
                  </Styled.TodayBtn>
                  <Styled.TimeBtn onClick={handleTimePicker}>
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
                      isSelected={isSameDay(d, selectedDate)}
                      onClick={() => handleClickDay(d)}
                    >
                      {isFirstDayOfMonth(d) ? format(d, 'MMM d') : getDate(d)}
                    </Styled.CalendarDay>
                  ))}
                </Styled.CalendarDays>
              </Styled.CalendarDates>
            </Styled.DatePickerCalendar>
          )}
          {!!showTimePicker && (
            <Styled.DatePickerTime showTimePicker={showTimePicker}>
              <Styled.TimeHeader>
                <Styled.TimeHeading>
                  {format(selectedDate, 'h:mm a')}
                </Styled.TimeHeading>
                <Styled.PinMinutes>
                  {PIN_COLORS.map(({ time, color }) => (
                    <Styled.PinMinuteBtn
                      key={`${time}-${color}`}
                      color={color}
                      onClick={() => handleSetMinutes(time)}
                    >
                      {`${time}-minute`}
                    </Styled.PinMinuteBtn>
                  ))}
                </Styled.PinMinutes>
              </Styled.TimeHeader>
              <Styled.TimeHours>
                <Styled.SectionHeading>Hours</Styled.SectionHeading>
                <Styled.TimeList>
                  {[...Array(12)].map((_, i) => (
                    <Styled.TimeItem
                      key={i}
                      onClick={() => handleSetHours(i + 1)}
                      isSelected={hour === i + 1}
                    >
                      {i + 1}
                    </Styled.TimeItem>
                  ))}
                </Styled.TimeList>
              </Styled.TimeHours>
              <Styled.TimeMinutes>
                <Styled.SectionHeading>Minutes</Styled.SectionHeading>
                <Styled.TimeList isMinutesList>
                  {[...Array(60)].map((_, i) => {
                    return [15, 30, 45].includes(i) ? (
                      <Styled.TimeItem
                        isMinuteItem
                        contentColor={KEYEDBY_TIME_PIN_COLORS[i]['color']}
                        key={i}
                        onClick={() => handleSetMinutes(i)}
                        isSelected={minute === i}
                      >
                        {i < 10 ? `0${i}` : i}
                      </Styled.TimeItem>
                    ) : (
                      <Styled.TimeItem
                        isMinuteItem
                        key={i}
                        onClick={() => handleSetMinutes(i)}
                        isSelected={minute === i}
                      >
                        {i < 10 ? `0${i}` : i}
                      </Styled.TimeItem>
                    );
                  })}
                </Styled.TimeList>
              </Styled.TimeMinutes>
              <Styled.TimePeriods>
                <Styled.PeriodBtn
                  isSelected={period === 'am'}
                  AM
                  onClick={() => handlePeriods('am')}
                >
                  AM
                </Styled.PeriodBtn>
                <Styled.PeriodBtn
                  isSelected={period === 'pm'}
                  PM
                  onClick={() => handlePeriods('pm')}
                >
                  PM
                </Styled.PeriodBtn>
              </Styled.TimePeriods>
            </Styled.DatePickerTime>
          )}
        </Styled.DatePicker>
      </Styled.DatePickerWrapper>
    </ClickOutside>
  );
};

export default DatePicker;
