import React, {Component} from 'react';
import styled from 'styled-components';

const Card = styled.div `
    padding: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e2e5ec;
    cursor: pointer;
    :hover{
      background-color: #F6F8FA;
      /* opacity: 0.7; */
    }
`
const Title = styled.h1 `
    font-size: 0.7rem;
    text-align: left;
`
const User = styled.div `
    float: right;
    text-align: right;
    clear:both;
`
const Avatar = styled.img `
    height: 30px;
    width: 30px;
    border-radius: 4px;
`
const Name = styled.p `
    font-size: 0.5rem;
`
const Status = styled.label`
    font-size: 0.6rem;
    background-color: ${props => props.status == 'open'
  ? "#2ECC40"
  : "#FF4136"};
    color: ${props => props.status == 'open'
    ? "#000"
    : "#FFF"};
    border-radius: 2px;
    box-shadow: inset 0 -1px 0 rgba(27,31,35,.12);
    font-weight: 400;
    padding: 3px 5px;
`
const Text = styled.p `
    font-size: 0.5rem;
    font-weight: 300;
    color: #999;
    max-width: 50ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

class Issue extends Component {
  constructor(props) {
    super(props);

  }

  fetchCommentsUrl = (url, title, text, avatar, user) => {
    this
      .props
      .renderComments(url, title, text, avatar, user)
  }
  render() {

    return (
      <a
        onClick={() => this.fetchCommentsUrl(this.props.issueUrl, this.props.title, this.props.text, this.props.avatar, this.props.user)}>
        <Card >
          <Title>#{this.props.number} {this.props.title}</Title>
          <User>
            <Avatar className="avatar" src={this.props.avatar} alt="Avatar"/>
            <Name>@{this.props.user}</Name>
          </User>
          <Text>{this.props.text}</Text>
          <p >{this.props.label}</p>
          <Status status={this.props.status}>{this.props.status}</Status>
        </Card>
      </a>
    )
  }
}
export default Issue;
