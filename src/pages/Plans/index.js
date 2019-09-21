/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import { GET_PLANS_QUERY, SEARCH_QUERY } from '../../graphql/queries';

import * as Styled from './styled';
import { CreateBtn } from '../../stylesShare';

import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';

import Plan from '../../components/Plan';
import Topbar from '../../components/Topbar';

const Plans = ({ history }) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const { error, loading, data } = useQuery(GET_PLANS_QUERY);
  const client = useApolloClient();

  useEffect(() => {
    let timeout = undefined;

    // clear existing timeout
    clearTimeout(timeout);
    // set new timeout
    timeout = setTimeout(async () => {
      const { data } = await client.query({
        query: SEARCH_QUERY,
        variables: { searchText: searchText }
      });
      if (data) {
        setResults(data.search);
      } else {
        setResults([]);
      }
    }, 400);

    // get rid of timeout on unmounting
    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  const handleSearch = event => {
    const value = event.target.value;
    setSearchText(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleCreate = () => {
    history.push('/create-plan');
  };

  if (!error && loading) return <div>Loading....</div>;

  return (
    <Styled.PlansWrapper>
      <Topbar
        value={searchText}
        placeholder="Search plans, pins, and friends (e.g., weekend at the park, Whole Foods, Joe)"
        results={results}
        onSearch={handleSearch}
        onSubmit={handleSubmit}
      >
        <CreateBtn onClick={handleCreate}>
          <PlusIcon className="icon icon-small" />
          Add Plan
        </CreateBtn>
      </Topbar>
      <Styled.Plans>
        {data && data.plans.map(plan => <Plan key={plan._id} {...plan} />)}
      </Styled.Plans>
    </Styled.PlansWrapper>
  );
};

export default Plans;
