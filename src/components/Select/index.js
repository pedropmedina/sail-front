/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import uuidv4 from 'uuid/v4';
import styled from 'styled-components/macro'; // eslint-disable-line

import * as Styled from './styled';

import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';

import ClickOutside from '../ClickOutside';

import { useSelect } from '../../hooks';

const Select = ({
  css = {},
  defaultPicks = [],
  options = [],
  label = '',
  showPicks = false,
  showLabel = false,
  onSelectChange,
  onPicksChange,
  onSelectOption,
  renderOption,
  renderPick
}) => {
  const {
    selectSearch,
    picks,
    showOptions,
    handleSelectSearch,
    handleRemovePick,
    handleRemovePickOnKeyDown,
    handleShowOptions,
    handleSelect
  } = useSelect(defaultPicks);

  useEffect(() => {
    if (onPicksChange && typeof onPicksChange === 'function') {
      onPicksChange(picks);
    }
  }, [picks]);

  const onClickOutside = () => {
    handleShowOptions(false);
  };

  const onClickInside = () => {
    handleShowOptions(true);
  };

  return (
    <ClickOutside onClickOutside={onClickOutside} onClickInside={onClickInside}>
      <Styled.Select css={css.select || ''}>
        {/* Picks List */}
        <Styled.SelectPicksList css={css.picks || ''}>
          {showPicks &&
            picks.map(pick =>
              renderPick && typeof renderPick === 'function' ? (
                <Styled.SelectPicksItem key={uuidv4()} css={css.pick || ''}>
                  {renderPick(pick)}
                  <Styled.SelectPickItemButton
                    onClick={() => handleRemovePick(pick)}
                  >
                    <XIcon />
                  </Styled.SelectPickItemButton>
                </Styled.SelectPicksItem>
              ) : (
                <Styled.SelectPicksItem key={uuidv4()} css={css.pick || ''}>
                  {pick.option}
                  <Styled.SelectPickItemButton
                    onClick={() => handleRemovePick(pick)}
                  >
                    <XIcon />
                  </Styled.SelectPickItemButton>
                </Styled.SelectPicksItem>
              )
            )}
          {/* default search input within picks list */}
          <Styled.SelectPicksItem css={css.pick || ''}>
            <Styled.SelectSearch>
              <Styled.SelectSearchInput
                id="search"
                type="text"
                value={selectSearch}
                placeholder="Search and select option"
                onChange={handleSelectSearch(onSelectChange)}
                onKeyDown={handleRemovePickOnKeyDown}
              />
            </Styled.SelectSearch>
            {showLabel && (
              <Styled.SelectSearchLabel>
                {label ? label : 'Search and select option'}
              </Styled.SelectSearchLabel>
            )}
          </Styled.SelectPicksItem>
        </Styled.SelectPicksList>
        {/* Options list */}
        <Styled.SelectOptions showOptions={showOptions && options.length > 0}>
          <Styled.SelectOptionsList css={css.options || ''}>
            {options.map(option =>
              renderOption && typeof renderOption === 'function' ? (
                <Styled.SelectOptionsItem
                  key={uuidv4()}
                  onClick={() => handleSelect(onSelectOption)(option)}
                  css={css.option || ''}
                >
                  {renderOption(option.option)}
                </Styled.SelectOptionsItem>
              ) : (
                <Styled.SelectOptionsItem
                  key={uuidv4()}
                  onClick={() => handleSelect(onSelectOption)(option)}
                  css={css.option || ''}
                >
                  {option.option}
                </Styled.SelectOptionsItem>
              )
            )}
          </Styled.SelectOptionsList>
        </Styled.SelectOptions>
      </Styled.Select>
    </ClickOutside>
  );
};

export default Select;
