import React, {Component} from 'react';
import styled from 'styled-components';
const ReactMarkdown = require('react-markdown')

const Avatar = styled.img `
    width: 40px;
    height: 40px;
`

class ReadMarkdown extends React.Component {
  render() {
    const {user, avatar, text} = this.props;
    return (
      <div>
        <p>{user}</p>
        <Avatar src={avatar}/>
        <ReactMarkdown source={text}/>
        <hr/>
      </div>
    );
  }
}

export default ReadMarkdown
