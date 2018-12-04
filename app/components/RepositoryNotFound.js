import React from 'react';
import styled from 'styled-components';

const Warning = styled.div `
  color: #E3D8F1;
  position: absolute;
  margin-top: 10%;
  margin-left: -20px;
  text-align: center;
  font-size: 0.8rem;
`

const RepositoryNotFound = () => <Warning><i className="fas fa-exclamation-triangle fa-2x"/><h2>0 results found</h2><p>Sorry! We couldn't find any results.</p></Warning>;

export default RepositoryNotFound;
