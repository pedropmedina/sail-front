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

export const DatePickerCalendar = styled.article`
  padding: 2rem;
  background-color: var(--color-almost-white);
  box-shadow: 0 1rem 1.5rem 0.5rem rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(calc(100% + 2rem));
  display: ${({ showCalendar }) => (showCalendar ? 'grid' : 'none')};
  grid-template-rows: min-content 1fr;
  row-gap: 2rem;
`;

export const CalendarHeader = styled.header`
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

export const CalendarHeadingBtn = styled.button`
  border: none;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  font-size: 1.8rem;
  padding: 1rem 2rem;
  cursor: pointer;
  outline: none;
  border-radius: 0.5rem;

  :hover {
    background-color: var(--color-medium-grey);
  }
`;

export const HeadingDate = styled.span`
  color: var(--color-medium-grey);

  > b {
    font-weight: 7000;
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
