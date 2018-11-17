import React, {Component} from 'react';
import Exclamation from '../exclamation.svg';
import CommentIcon from '../comment.svg';
const ReactMarkdown = require('react-markdown')

import styled from 'styled-components';

const Card = styled.div `
  border: 1px solid #d1d5da;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #586069;
`
const Header = styled.header `
  background-color: #F6F8FA;
  border-bottom: 1px solid #d1d5da;
  height: 45px;
  padding: 10px;
`
const User = styled.p `
  font-size: 0.7rem;
  float: right;
  clear:both;
  margin-top: 3px;
`
const Avatar = styled.img `
  width: 30px;
  height: 30px;
  border-radius: 3px;
  float: right;
`

const Title = styled.span `
  margin-top: 10px;
  margin-left: 10px;
  font-size: 1rem;
  font-weight: bold;
  float: left;
`
const Icon = styled.img `
 /* display: ${props => props.status == true
  ? "none"
  : "block"}; */
  margin-top: 10px;
  width: 20px;
  height: 20px;
  float: left;
`

const Text = styled.div `
  padding-right: 20px;
  padding-left: 20px;
  font-size: 0.7rem;
  line-height: 1.6em;
  width: inherit;
  height: inherit;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  p {
    max-width: 100%;
    overflow: auto;
  }
`
const Line = styled.div `
  height: 30px;
  width: 1px;
  padding-right: 20px;
  border-right: 1px solid #d1d5da;
`

class ReadIssue extends React.Component {
  render() {

    return (
      <div>
        {this.props.isComment && <Line/>}
        <Card>
          <Header>
            <Icon alt="icon" src={this.props.isComment == true ? CommentIcon : Exclamation}  status={this.props.isComment}/>
            <Title>{this.props.title}</Title>
            <Avatar src={this.props.avatar} alt="Avatar"/>
            <User>@{this.props.user}</User>
          </Header>
          <Text>
            <ReactMarkdown className="container-markdown"source={this.props.text}/>
          </Text>
        </Card>
      </div>
    );
  }
}

export default ReadIssue
