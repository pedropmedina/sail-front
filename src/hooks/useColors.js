import { useState } from 'react';

const DEFAULT_COLORS = ['#E0BBE4', '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3'];

export const useColors = (colorList = DEFAULT_COLORS) => {
  const [colors, setColors] = useState(colorList);

  const addColors = cl => {
    setColors(prevColors => [...prevColors, ...cl]);
  };

  const removeColor = colorName => {
    setColors(prevColors => prevColors.filter(color => color !== colorName));
  };

  const resetColors = () => {
    setColors([]);
  };

  return { colors, addColors, resetColors, removeColor };
};
