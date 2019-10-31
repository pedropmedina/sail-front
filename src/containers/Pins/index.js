import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import * as Styled from './styled';
import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';

import Topbar from '../../components/Topbar';
import { CreateBtn } from '../../stylesShare';

import { ME_QUERY } from '../../graphql/queries';

const handleCreate = () => {};

const Pins = () => {
  const { error, loading, data } = useQuery(ME_QUERY);

  if (!error && loading) return <div>Loading...</div>;

  console.log(data);
  return (
    <Styled.PinsWrapper>
      <Topbar>
        <CreateBtn onClick={handleCreate}>
          <PlusIcon className="icon icon-small" />
        </CreateBtn>
      </Topbar>
      <Styled.LikedPins>
        <Styled.Pin>1</Styled.Pin>
      </Styled.LikedPins>
    </Styled.PinsWrapper>
  );
};

export default Pins;
