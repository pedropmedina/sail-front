import styled, { css } from 'styled-components/macro';

import { ReactComponent as Icon } from '../../assets/SVG/calendar.svg';
import { mediaQueries } from '../../sharedStyles/mediaQueries';

export const DatePickerWrapper = styled.div`
  width: 100%;
  border-radius: var(--size-smallest);
  background-color: #fff;
  color: var(--color-light-grey);
`;

export const DatePicker = styled.article`
  position: relative;
  color: inherit;
  background-color: inherit;
  border-radius: inherit;
`;

export const DatePickerSearch = styled.article`
  height: 6rem;
  width: 100%;
  color: inherit;
  background-color: #fff;
  border-radius: inherit;
  position: relative;
  padding-left: 2rem;
  display: flex;
  align-items: center;
`;

export const DatePickerInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color: #fff;
  color: var(--color-almost-black);
  outline: none;
  border-radius: inherit;
  font-size: var(--font-size-small);

  &::placeholder {
    color: var(--color-light-grey);
  }
`;

export const CalendarIcon = styled(Icon)`
  font-size: var(--font-size-large);
  fill: currentColor;
  margin-right: 2rem;
`;

export const Box = styled.article`
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 1rem 1.5rem 0.5rem rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(calc(100% + 2rem));
  z-index: 1;
`;

export const DatePickerCalendar = styled(Box)`
  display: ${({ showCalendar }) => (showCalendar ? 'grid' : 'none')};
  grid-template-rows: minmax(min-content, 7rem) minmax(min-content, 53rem);
  row-gap: 2rem;
`;

export const CalendarHeader = styled.header`
  grid-row: 1 / 2;
`;

export const CalendarHeading = styled.h4`
  font-size: 2.4rem;
  font-weight: normal;
  padding: 1rem 0;

  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
`;

export const HeadingBtn = styled.span`
  display: inline-block;
  border: none;
  background-color: transparent;
  color: var(--color-medium-grey);
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  outline: none;
  border-radius: 0.5rem;
  position: relative;

  :hover {
    background-color: var(--color-lightest-grey);
  }

  > * {
    flex: 1;
  }

  ${mediaQueries.tablet`
    font-size: 1.4rem;
  `}
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
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 2rem;
    height: 2rem;
    margin-left: 1rem;
    fill: currentColor;
  }
`;

export const HeadingDate = styled.span`
  color: var(--color-medium-grey);
  margin-left: auto;

  > b {
    font-weight: 700;
    margin-right: 1rem;
  }

  ${mediaQueries.tablet`
    font-size: 1.8rem;
    margin-right: auto;
  `}
`;

export const CalendarArrows = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const LeftArrow = styled.span`
  border: none;
  background-color: inherit;
  color: var(--color-medium-grey);
  font-size: 2.4rem;
  cursor: pointer;
  outline: none;
  margin-right: 2rem;
  padding: 1rem;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  > svg {
    fill: currentColor;
    width: 2rem;
    height: 2rem;
  }
`;

export const RightArrow = styled(LeftArrow)`
  margin-right: 0;
`;

export const CalendarDates = styled.section`
  grid-row: 2 / 3;

  display: grid;
  grid-template-rows: min-content 1fr;
`;

export const CalendarWeekdays = styled.section`
  display: grid;
  grid-template-columns: repeat(7, minmax(min-content, 1fr));
  justify-items: center;
  padding: 1rem 0;
`;

export const CalendarWeekday = styled.span`
  color: var(--color-dark-grey);
  font-size: 1.6rem;

  ${mediaQueries.tablet`
    font-size: 1.4rem;
  `}
`;

export const CalendarDays = styled.section`
  display: grid;
  grid-template-rows: repeat(6, min-content);
  grid-template-columns: repeat(7, minmax(min-content, 1fr));
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
  display: ${({ showTimePicker }) => (showTimePicker ? 'grid' : 'none')};
  display: grid;
  grid-template-rows: 4rem minmax(16rem, min-content) minmax(30rem, min-content) 4rem;
  row-gap: 2rem;
`;

export const TimeHeader = styled.header`
  grid-row: 1 / span 1;

  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
`;

export const TimeHeading = styled.h4`
  color: var(--color-dark-grey);
  font-size: 2.4rem;
  font-weight: 500;
  margin-left: auto;
`;

export const PinMinutes = styled.span``;

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

export const PeriodBtn = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 0.5rem;
  color: ${({ isSelected }) =>
    isSelected ? 'var(--color-almost-white)' : 'var(--color-light-grey)'};
  background-color: ${({ isSelected }) =>
    isSelected ? 'var(--color-dark-grey)' : 'var(--color-lightest-grey)'};
  font-size: inherit;
  grid-column: ${({ AM }) => (AM ? '2 / span 1' : '3 / span 1')};
  cursor: pointer;
  outline: none;
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
  background-color: ${({ isSelected }) =>
    isSelected ? 'var(--color-dark-grey)' : 'var(--color-lightest-grey)'};
  color: ${({ isSelected }) =>
    isSelected ? 'var(--color-almost-white)' : 'inherit'};
  border-radius: 0.5rem;
  position: relative;

  :hover {
    background-color: var(--color-light-grey);
    color: var(--color-almost-white);
  }

  ${({ contentColor }) =>
    contentColor &&
    css`
      ::after {
        content: '';
        display: block;
        position: absolute;
        top: 0.7rem;
        right: 0.7rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: ${contentColor};
      }
    `}
`;
