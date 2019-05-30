import React, {Component} from 'react';
import styled from 'styled-components';

import CommentIcon from '../comment.svg';

const Card = styled.div `
    padding: 10px;
    border-bottom: 1px solid #e2e5ec;
    display: grid;
    grid-template-columns: 80% 20%;
    background-color: #F6F8FA;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
}
`
const Title = styled.h1 `
    font-size: 0.7rem;
    text-align: left;
    font-weight: 400;
`
const User = styled.div `
    float: right;
    text-align: right;
`
const Avatar = styled.img `
    height: 25px;
    width: 25px;
    float: right;
    padding-bottom: 3px;
    border-radius: 4px;
    margin-top: 10px;
`
const Name = styled.p `
    font-size: 0.4rem;
`
const Status = styled.label `
    font-size: 0.5rem;
    background-color: ${props => props.status == 'open'
  ? "#88D498"
  : "#FF4136"};
    color: ${props => props.status == 'open'
    ? "#000000"
    : "#ffffff"};
    border-radius: 2px;
    box-shadow: inset 0 -1px 0 rgba(27,31,35,.12);
    font-weight: 300;
    padding: 3px 5px;
`
const Text = styled.p `
    font-size: 0.6rem;
    font-weight: 300;
    color: #517393;
    /* max-width: 50ch; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const Comments = styled.img `
    height: 15px;
    width: 15px;
    margin-top: 20px;
    margin-right: 5px;
`
const NumberOfComments = styled.span `
    font-size: 0.6rem;
    color: #000000;
    text-align: right;
`

class Issue extends Component {
  constructor(props) {
    super(props);
  }

  fetchCommentsUrl = (url, title, text, avatar, user, pageUrl) => {
    this
      .props
      .renderComments(url, title, text, avatar, user, pageUrl)
  }
  render() {
    const {
      issueUrl,
      title,
      text,
      avatar,
      user,
      pageUrl,
      number,
      label,
      status,
      comments
    } = this.props;
    return (
      <a
        onClick={() => this.fetchCommentsUrl(issueUrl, title, text, avatar, user, pageUrl)}>
        <Card >
          <div>
            <Title>#{number} {title}</Title>
            <Text>{text}</Text>
            <p>{label}</p>
            <Status status={status}>{status}</Status>
          </div>
          <div>
            <User >
              <Avatar className="avatar" src={avatar} alt="Avatar" title={"@" + user}/>
              <Name title={"@" + user}>@{user}</Name>
              <Comments src={CommentIcon} alt="comment icon"/>
              <NumberOfComments>{comments}</NumberOfComments>
            </User>
          </div>
        </Card>
      </a>
    )
  }
}
export default Issue;
