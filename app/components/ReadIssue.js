import React, {Component} from 'react';
import Exclamation from '../exclamation.svg';
import CommentIcon from '../comment.svg';
const ReactMarkdown = require('react-markdown')

import styled from 'styled-components';

const Card = styled.div `
  border: 1px solid #d1d5da;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  width: 80%;
  margin: 0 auto;
`
const Header = styled.header `
  background-color: #F6F8FA;
  border-bottom: 1px solid #d1d5da;
  padding: 10px;
  display: grid;
  grid-template-columns: 80% 20%;
`
const User = styled.span `
  font-size: 0.6rem;
  float: right;
  clear: both;
  margin-top: 3px;
  text-align: right;
`
const Avatar = styled.img `
  width: 25px;
  height: 25px;
  border-radius: 3px;
  clear: both;
  float: right;
`

const Title = styled.h1 `
  font-size: 0.7rem;
  font-weight: 400;
  text-align: left;
`
const Icon = styled.img `
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
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
  text-align: left;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  p {
    max-width: 100%;
    overflow: auto;
    font-weight: 300;
  }
  a {
    text-decoration: none;
    color: #000;
    border-bottom: 1px solid #000000;
  }
  strong{
    font-weight: 400;
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
            <div>
              <Icon alt="icon" src={this.props.isComment == true ? CommentIcon : Exclamation}/>
              <Title>{this.props.title}</Title>
            </div>
            <div>
              <Avatar src={this.props.avatar} alt="Avatar"/>
              <User>@{this.props.user}</User>
            </div>
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
