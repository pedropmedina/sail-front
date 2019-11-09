import { useState } from 'react';

export const useSelect = (defaultPicks = []) => {
  const [selectSearch, setSelectSearch] = useState('');
  const [picks, setPicks] = useState(defaultPicks);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelectSearch = fn => event => {
    const value = event.target.value;
    setSelectSearch(value);
    if (fn && typeof fn === 'function') {
      fn(value);
    }
  };

  const handleAddPick = pick => {
    setPicks(prevPicks => [...prevPicks, pick]);
  };

  const handleRemovePick = pick => {
    setPicks(prevPicks =>
      prevPicks.filter(prevPick => prevPick.option !== pick.option)
    );
  };

  const handleRemovePickOnKeyDown = event => {
    if (event.key === 'Backspace' && picks.length > 0 && !selectSearch) {
      setPicks(prevPicks => prevPicks.slice(0, prevPicks.length - 1));
    }
  };

  const handleShowOptions = bool => setShowOptions(bool);

  const handleSelect = fn => option => {
    handleAddPick(option);
    if (fn && typeof fn === 'function') {
      fn(option);
    }
  };

  return {
    selectSearch,
    picks,
    showOptions,
    handleSelectSearch,
    handleAddPick,
    handleRemovePick,
    handleRemovePickOnKeyDown,
    handleShowOptions,
    handleSelect
  };
};
