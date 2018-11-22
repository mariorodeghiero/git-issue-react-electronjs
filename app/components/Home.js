// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import routes from '../constants/routes';
import Icon from '../logo.png'
import Issue from './Issue'
import Pagination from './Pagination'
import SearchIssue from './SearchIssue'
import Sidebar from './Sidebar'
import Dropdown from './Dropdown';
import ReadIssue from './ReadIssue';
import ReadMarkdown from './ReadMarkdown';
import styles from './Home.css';
import Favorite from '../favorite.svg';


const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json')
const db = low(adapter)

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
      commentsData: ''
    };
    this.fetchRepo = this
      .fetchRepo
      .bind(this);
    this.renderComments = this
      .renderComments
      .bind(this);
  }

  // componentDidMount() {
  // fetch('https://api.github.com/repos/frontendbr/forum/issues?per_page=100')
  // .then(response => response.json())     .then(data => { this.setState({data})
  //  })   console.log("Teste db: ", db) console.log("Teste dado: ",
  // db.get('favorite').value())   this.setState({ favorite: db .get('favorite')
  //   .value()   }) }

  newUrl() {
    db
      .get('favorite')
      .push({id: 3, url: 'url3'})
      .write()
  }

  fetchRepo = (url, id, key) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({data})
      })
  }

  renderComments(url, title, text, avatar, user) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          commentsData: data,
          isComments: true,
          titleIssue: title,
          textIssue: text,
          avatarIssue: avatar,
          userIssue: user
        })
      })
  }

  render() {
    const issues = Object.keys(this.state.data);
    const commentsList = Object.keys(this.state.commentsData);

    return (
      <div className="container">
        <Sidebar newIssues={this.newIssues} fetchRepo={this.fetchRepo}/>
        <div className="container-issue">
          <div className="issues">
            {issues.map(key => <Issue
              key={key}
              number={this.state.data[key].number}
              title={this.state.data[key].title}
              text={this.state.data[key].body}
              user={this.state.data[key].user.login}
              status={this.state.data[key].state}
              avatar={this.state.data[key].user.avatar_url}
              issueUrl={this.state.data[key].comments_url}
              renderComments={this.renderComments}/>)
}</div>
        </div>
        <div className="show-issue">
          {!this.state.isComments && <img className="logo" src={Icon} alt="logo"/>}
          {this.state.isComments && <ReadIssue
            user={this.state.userIssue}
            avatar={this.state.avatarIssue}
            title={this.state.titleIssue}
            text={this.state.textIssue}/>
}
          {this.state.isComments && commentsList.map(key => <ReadIssue
            key={key}
            user={this.state.commentsData[key].user.login}
            avatar={this.state.commentsData[key].user.avatar_url}
            text={this.state.commentsData[key].body}
            isComment={this.state.isComments}/>)
}
        </div>
      </div>
    );
  }
}
