import React, { Component } from 'react';
const ReactMarkdown = require('react-markdown')
import styled from 'styled-components';

const Avatar = styled.img `
    width: 40px;
    height: 40px;
`

class ReadMarkdown extends React.Component {
  render() {

    return (
      <div>
        <p>{this.props.user}</p>
        <Avatar src={this.props.avatar}/>
        <ReactMarkdown source={this.props.text} />
        <hr/>
      </div>
    );
  }
}

export default ReadMarkdown
