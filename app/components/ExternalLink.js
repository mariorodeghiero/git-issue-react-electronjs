import React from 'react';
import styled from 'styled-components';

const Link = styled.a `
    color: #c4c4c4;
    text-decoration: none;
    position: fixed;
    right: 10px;
    :hover {
      color: #000000;
    }
`

const ExternalLink = (props) => <Link href={props.url} title="External Link"><i className="fas fa-external-link-alt"/></Link>;

export default ExternalLink;
