import { useState } from 'react';

const TEXTAREA_DEFAULTS = {
  rows: 2,
  minRows: 2,
  maxRows: 10,
  lineHeight: 24
};

export const useTextarea = () => {
  const [rows, setRows] = useState(TEXTAREA_DEFAULTS.rows);

  const handleTextareaChange = event => {
    const { minRows, maxRows, lineHeight } = TEXTAREA_DEFAULTS;
    const prevRows = event.target.rows;
    event.target.rows = minRows; // reset rows
    const currentRows = ~~(event.target.scrollHeight / lineHeight);

    if (currentRows === prevRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);
  };

  return { rows, handleTextareaChange };
};
