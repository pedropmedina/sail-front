/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_PLANS_QUERY } from '../../graphql/queries';

import * as Styled from './styled';
import { CreateBtn } from '../../stylesShare';

import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';

import Plan from '../../components/Plan';
import Topbar from '../../components/Topbar';

const Plans = ({ history }) => {
  const [searchText, setSearchText] = useState('');
  const { error, loading, data } = useQuery(GET_PLANS_QUERY);

  const handleSearch = event => {
    const value = event.target.value;
    setSearchText(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const hanldeCreateNew = () => {
    history.push('/create-plan');
  };

  if (!error && loading) return <div>Loading....</div>;

  return (
    <Styled.PlansWrapper>
      <Topbar
        searchValue={searchText}
        searchPlaceholder="Search plans."
        onSearch={handleSearch}
        onSubmit={handleSubmit}
      >
        <CreateBtn onClick={hanldeCreateNew}>
          <PlusIcon className="icon icon-small" />
          Add Plan
        </CreateBtn>
      </Topbar>
      <Styled.Plans>
        {data && data.plans.map(plan => <Plan key={plan.id} {...plan} />)}
      </Styled.Plans>
    </Styled.PlansWrapper>
  );
};

export default Plans;
