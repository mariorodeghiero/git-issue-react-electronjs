import React from 'react'
import styled from 'styled-components';

import RepositoryNotFound from './RepositoryNotFound';
let searchTerm;

const SearchButton = styled.button `
  background-color: transparent;
  border: none;
  color: #c4c4c4;
  outline: 0;
  margin-top: 20px;
  :hover {
    cursor: pointer;
  }
`

const SearchInput = styled.input `
  margin-bottom: 20px;
  outline: 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #cccccc;
  padding: 5px;
  color: #c4c4c4;
  width: 80%;
  margin-left: -30px;
  font-size: 0.8rem;
`
const Repositories = styled.li `
  list-style: none;
  line-height: 1.6em;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
  a {
    text-decoration: none;
    font-size: 0.8rem;
    color: #ffffff;
    i {
      cursor: pointer;
      opacity: 0.6;
      padding-right: 5px;
      :hover {
        opacity: 1;
      }
    }
  }
`
const ContainerRepository = styled.ul `
  max-height: 55vh;
  width: 100%;
  overflow-y: scroll;
  float:left;
  margin-left: -50px;
  ::-webkit-scrollbar {
    width: 0.2em;
  }
  ::-webkit-scrollbar-button {
    background: #ccc
  }
  ::-webkit-scrollbar-track-piece {
    background: #888
  }
  ::-webkit-scrollbar-thumb {
    background: #eee
  }
`

const electron = require('electron');

const app = electron.remote.app;
const userData = app.getPath('userData');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

class SearchRepository extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this
      .onClick
      .bind(this);
    this.state = {
      repositories: [],
      isNotFound: false,
      isAdd: false,
      addId: 0
    };
  }

  addLibrary(id, title, url, fullName) {
    const adapter = new FileSync(userData + 'db.json')
    const db = low(adapter)
    const library = db
      .get('favorite')
      .value();
    const index = library.findIndex(val => val.id == id);

    if (index == -1) {
      db
        .get('favorite')
        .push({id, title, url, fullName, key: "favorite"})
        .write()
      this.setState({addId: id})
    } else {
      alert("This repository already exists in your library.")
    }
  }

  render() {
    const adapter = new FileSync(`${userData}db.json`)
    const db = low(adapter)
    const {isAdd, isNotFound, addId, repositories} = this.state;
    return (
      <div>
        <form>
          <SearchInput
            type="search"
            placeholder="Search repository..."
            aria-label="Search"
            ref={(input) => {
            this.searchBox = input;
          }}
            autoFocus/>
          <SearchButton
            type="submit"
            onClick={this.onClick}
            className="fas fa-search fa-sm"/>
        </form>
        <div>
          <ContainerRepository>
            {!isNotFound
              ? repositories.map((item, index) => (
                <Repositories key={index}>
                  <a
                    key={index}
                    type="button"
                    title={`${item.full_name} ⭐️${item.stargazers_count} ⬇️${item.forks}`}><i
                    className={item.id === addId
                  ? "far fa-check-circle link-desable"
                  : "fas fa-plus fa-sm"}
                    onClick={() => this.addLibrary(item.id, item.name, item.url, item.full_name)}/> {item.name}
                  </a>
                </Repositories>
              ))
              : <RepositoryNotFound/>}
          </ContainerRepository>
        </div>
      </div>
    );
  }

  onClick(event) {
    searchTerm = this.searchBox.value;
    const endpoint = `https://api.github.com/search/repositories?sort=stars&order=desc&q=${searchTerm}`;
    fetch(endpoint)
      .then(blob => blob.json())
      .then(response => {
        if (response.total_count != 0) {
          this.setState({repositories: response.items, isNotFound: false});
        } else {
          this.setState({isNotFound: true})
        }
      });
    event.preventDefault();
  }
}

export default SearchRepository
