import styled, { css } from 'styled-components/macro';

export const DatePickerWrapper = styled.div``;

export const DatePicker = styled.article`
  position: relative;
  color: inherit;
  background-color: inherit;
  border-radius: inherit;
  font-size: inherit;
`;

export const DatePickerSearch = styled.article`
  height: 6rem;
  width: 100%;
  color: inherit;
  background-color: inherit;
  border-radius: inherit;
  font-size: inherit;
  position: relative;
`;

export const DatePickerInput = styled.input`
  width: 100%;
  height: 100%;
  text-indent: 2rem;
  border: none;
  color: inherit;
  background-color: inherit;
  outline: none;
  border-radius: inherit;
  font-size: inherit;

  &::placeholder {
    color: var(--color-light-grey);
  }
`;

export const Box = styled.article`
  padding: 2rem;
  background-color: var(--color-almost-white);
  box-shadow: 0 1rem 1.5rem 0.5rem rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(calc(100% + 2rem));
`;

export const DatePickerCalendar = styled(Box)`
  display: ${({ showCalendar }) => (showCalendar ? 'grid' : 'none')};
  grid-template-rows: minmax(min-content, 7rem) minmax(min-content, 53rem);
  row-gap: 2rem;
`;

export const CalendarHeader = styled.header`
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: 5rem 1fr 5rem;
  column-gap: 3rem;
`;

export const CalendarHeading = styled.h4`
  grid-column: 2 / span 1;
  font-size: 2.4rem;
  font-weight: normal;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeadingBtn = styled.button`
  border: none;
  background-color: transparent;
  color: var(--color-medium-grey);
  font-size: 1.8rem;
  padding: 1rem 2rem;
  cursor: pointer;
  outline: none;
  border-radius: 0.5rem;
  position: relative;

  :hover {
    background-color: var(--color-lightest-grey);
  }
`;

export const TodayBtn = styled(HeadingBtn)`
  ::after {
    content: '';
    display: block;
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: var(--color-earth-red);
  }
`;

export const TimeBtn = styled(HeadingBtn)`
  svg {
    vertical-align: sub;
  }
`;

export const HeadingDate = styled.span`
  flex-basis: 50%;
  color: var(--color-medium-grey);
  text-align: right;

  > b {
    font-weight: 700;
    margin-right: 1rem;
  }
`;

export const LeftArrow = styled.button`
  grid-column: 1 / span 1;
  grid-row: 1 / -1;
  border: none;
  background-color: inherit;
  color: var(--color-medium-grey);
  font-size: 2.4rem;
  cursor: pointer;
  outline: none;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  > svg {
    fill: currentColor;
  }
`;

export const RightArrow = styled(LeftArrow)`
  grid-column: 3 / span 1;
`;

export const CalendarDates = styled.section`
  grid-row: 2 / 3;
  display: grid;
  grid-template-rows: min-content 1fr;
`;

export const CalendarWeekdays = styled.section`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  padding: 1rem 0;
`;

export const CalendarWeekday = styled.span`
  color: var(--color-dark-grey);
  font-size: 1.6rem;
`;

export const CalendarDays = styled.section`
  display: grid;
  grid-template-rows: repeat(6, 8rem);
  grid-template-columns: repeat(7, 1fr);
  border-left: 0.1rem solid var(--color-light-grey);
  border-top: 0.1rem solid var(--color-light-grey);
`;

export const CalendarDay = styled.span`
  grid-column: span 1;
  text-align: center;
  line-height: 8rem;
  color: ${({ isWeekend, isInMonth, isSelected }) =>
    isSelected
      ? 'var(--color-almost-white)'
      : isWeekend || !isInMonth
      ? 'var(--color-light-grey)'
      : 'var(--color-dark-grey)'};
  background-color: ${({ isWeekend, isSelected }) =>
    isSelected
      ? 'var(--color-dark-grey)'
      : isWeekend
      ? 'var(--color-lightest-grey)'
      : 'inherit'};
  border-right: 0.1rem solid var(--color-light-grey);
  border-bottom: 0.1rem solid var(--color-light-grey);
  cursor: pointer;
  position: relative;

  :hover {
    background-color: var(--color-light-grey);
    color: var(--color-less-white);
  }

  ${({ isToday }) =>
    isToday &&
    css`
      ::after {
        content: '';
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 1rem;
        height: 1rem;
        display: block;
        border-radius: 50%;
        background-color: var(--color-earth-red);
      }
    `}
`;

export const DatePickerTime = styled(Box)`
  /* display: ${({ showTimePicker }) => (showTimePicker ? 'grid' : 'none')}; */
  display: grid;
  grid-template-rows: 4rem minmax(16rem, min-content) minmax(30rem, min-content) 4rem;
  row-gap: 2rem;
`;

export const TimeHeader = styled.header`
  grid-row: 1 / span 1;

  display: grid;
  grid-template-columns: 2rem 1fr max-content;
  grid-template-rows: 1fr;
  column-gap: 1rem;
`;

export const TimeHeading = styled.h4`
  grid-column: 3 / span 1;
  line-height: 4rem;
`;

export const PinMinutes = styled.span`
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
`;

export const PinMinuteBtn = styled(TodayBtn)`
  ::after {
    background-color: ${({ color }) => (color ? color : 'initial')};
  }
`;

export const TimeSection = styled.section`
  display: grid;
  grid-template-columns: 2rem 1fr;
  column-gap: 1rem;
`;

export const SectionHeading = styled.h4`
  writing-mode: vertical-rl;
  text-orientation: upright;
  align-self: center;
  font-weight: 500;
`;

export const TimeHours = styled(TimeSection)`
  grid-row: 2 / span 1;
`;

export const TimeMinutes = styled(TimeSection)`
  grid-row: 3 / span 1;
`;

export const TimePeriods = styled(TimeSection)`
  grid-row: 4 / span 1;
  grid-template-columns: 2rem repeat(2, 1fr);
`;

export const PeriodBtn = styled.button`
  border: none;
  border-radius: 0.5rem;
  color: var(--color-light-grey);
  background-color: var(--color-lightest-grey);
  font-size: inherit;
  grid-column: ${({ AM }) => (AM ? '2 / span 1' : '3 / span 1')};
  cursor: pointer;
`;

export const TimeList = styled.ul`
  list-style: none;
  display: grid;
  column-gap: 0.3rem;
  row-gap: 0.3rem;
  grid-template-rows: ${({ isMinutesList }) =>
    isMinutesList ? 'repeat(6, 5rem)' : 'repeat(2, 8rem)'};
  grid-template-columns: ${({ isMinutesList }) =>
    isMinutesList ? 'repeat(10, 1fr)' : 'repeat(6, 1fr)'};
`;

export const TimeItem = styled.li`
  line-height: ${({ isMinuteItem }) => (isMinuteItem ? '5rem' : '8rem')};
  text-align: center;
  cursor: pointer;
  background-color: var(--color-lightest-grey);
  border-radius: 0.5rem;

  :hover {
    background-color: var(--color-light-grey);
    color: var(--color-almost-white);
  }
`;
