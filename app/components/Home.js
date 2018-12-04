// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import routes from '../constants/routes';
import Icon from '../logo.png';
import Issue from './Issue';
import SearchIssue from './SearchIssue';
import Sidebar from './Sidebar';
import Dropdown from './Dropdown';
import ReadIssue from './ReadIssue';
import ReadMarkdown from './ReadMarkdown';
import styles from './Home.css';
import Favorite from '../favorite.svg';

var electron = require('electron');
const app = electron.remote.app;
var userData = app.getPath('userData');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(userData + 'db.json')
const db = low(adapter)

let data1 = {
  "favorite": [
    {
      "id": 50837290,
      "full_name": "frontendbr/forum",
      "title": "forum",
      "url": "https://api.github.com/repos/frontendbr/forum",
      "key": "favorite"
    }
  ]
}

db
  .defaults(data1)
  .write()

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      favorite: '',
      isComments: false,
      userIssue: '',
      avatarIssue: '',
      titleIssue: '',
      textIssue: '',
      pageUrl: '',
      commentsData: '',
      dbTest: []
    };
    this.fetchRepo = this
      .fetchRepo
      .bind(this);
    this.renderComments = this
      .renderComments
      .bind(this);
  }

  fetchRepo = (url, id, key) => {
    fetch(url + "/issues?per_page=100")
      .then(response => response.json())
      .then(data => {
        this.setState({data});
      })
  }

  renderComments(url, title, text, avatar, user, pageUrl) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          commentsData: data,
          isComments: true,
          titleIssue: title,
          textIssue: text,
          avatarIssue: avatar,
          userIssue: user,
          pageUrl: pageUrl
        })
      })
  }

  render() {
    const issues = Object.keys(this.state.data);
    const commentsList = Object.keys(this.state.commentsData);
    const {
      userIssue,
      isComments,
      avatarIssue,
      titleIssue,
      textIssue,
      pageUrl
    } = this.state;

    return (
      <div className="container">
        <Sidebar newIssues={this.newIssues} fetchRepo={this.fetchRepo}/>
        <div className="container-issue">
          <div>
            {issues.map(key => <Issue
              key={key}
              number={this.state.data[key].number}
              title={this.state.data[key].title}
              text={this.state.data[key].body}
              user={this.state.data[key].user.login}
              status={this.state.data[key].state}
              avatar={this.state.data[key].user.avatar_url}
              issueUrl={this.state.data[key].comments_url}
              renderComments={this.renderComments}
              comments={this.state.data[key].comments}
              pageUrl={this.state.data[key].html_url}/>)}
          </div>
        </div>
        <div className="show-issue">
          {!isComments && <img className="logo" src={Icon} alt="logo"/>}
          {isComments && <ReadIssue
            user={userIssue}
            avatar={avatarIssue}
            title={titleIssue}
            text={textIssue}
            pageUrl={pageUrl}/>}
          {isComments && commentsList.map(key => <ReadIssue
            key={key}
            user={this.state.commentsData[key].user.login}
            avatar={this.state.commentsData[key].user.avatar_url}
            text={this.state.commentsData[key].body}
            isComment={this.state.isComments}/>)}
        </div>
      </div>
    );
  }
}
