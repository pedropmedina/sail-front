import styled from 'styled-components/macro';

export const Request = styled.li`
  padding: 1rem;
  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  color: ${({ status }) =>
    status ? 'var(--color-almost-white)' : 'var(--color-light-grey)'};
  background-color: ${({ status }) =>
    status === 'PENDING'
      ? 'var(--color-warning)'
      : status === 'DENIED'
      ? 'var(--color-danger)'
      : status === 'ACCEPTED'
      ? 'var(--color-success)'
      : 'var(--color-almost-white)'};
  position: relative;
`;

export const RequestHeading = styled.h4`
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 0.5rem;

  b {
    text-transform: capitalize;
    font-weight: 700;
  }
`;

export const RequestImg = styled.img`
  width: 3rem;
  height: 3rem;
  display: inline-block;
  border-radius: 50%;
  border: 0.1rem solid var(--color-almost-white);
  padding: 0.2rem;
`;

export const RequestTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 300;
`;

export const RequestDesc = styled.p``;

export const RequestStatus = styled.p`
  font-size: 1.4rem;
  text-transform: lowercase;
  text-align: right;
  width: fit-content;
  position: absolute;
  top: 1.5rem;
  right: 5rem;
  padding: 0.2rem 1rem;
  border-radius: 2rem;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const RequestDate = styled.p``;

export const RequestBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  border: none;
  outline: none;
  background-color: transparent;
  color: var(--color-almost-white);
  cursor: pointer;

  :focus {
    + div {
      visibility: visible;
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const RequestPopup = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fff;
  border-radius: 0.5rem;
  visibility: hidden;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.2s;
  box-shadow: 0 0.3rem 1.3rem rgba(0, 0, 0, 0.1);
  z-index: 1;
  overflow: hidden;
`;

export const PopupBtn = styled.button`
  display: block;
  width: 15rem;
  padding: 1rem 1.5rem;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-light-grey);
  font-size: 1.6rem;
  cursor: pointer;

  :hover {
    background-color: ${({ action }) =>
      action === 'accept'
        ? 'var(--color-success)'
        : action === 'deny' || action === 'cancel'
        ? 'var(--color-danger)'
        : 'var(--color-less-white)'};
    color: #fff;
  }
`;
