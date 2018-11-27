import React from 'react'
import styled from 'styled-components';
let searchTerm;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  color: #c4c4c4;
  outline: 0;
  margin-top: 20px;
  :hover{
    cursor: pointer;
  }
`

const SearchInput = styled.input`
  margin-top: 20px;
  margin-bottom: 20px;
  outline: 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #cccccc;
  padding: 5px;
  color: #c4c4c4;
  width: 100%;
  margin-left: -30px;
  font-size: 0.8rem;
`
const Repositories = styled.li`
  list-style: none;
  line-height: 1.6em;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  a{
    text-decoration: none;
    font-size: 0.8rem;
    color: #ffffff;
    i{
      cursor: pointer;
      opacity: 0.6;
      :hover {
        opacity: 1;
      }
    }
  }
`
const ContainerRepository = styled.ul`
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
      isNotFound: false
    };
  }

  addLibrary(id, title, url){
    const adapter = new FileSync('./db.json')
    const db = low(adapter)
    const library = this.props.library;
    let index = library.findIndex(val => val.id == id);
      if(index < 0) {
         db
          .get('favorite')
          .push(
            {
              id: id,
              title: title,
              url: url,
              key: "favorite"
            })
          .write()
          this.props.toggleList();
      } else {
          alert("item existente")
      }
  }

  render() {
    return (
      <div>
        <form>
          <SearchInput
            type="search"
            placeholder=" search repository..."
            aria-label="Search"
            ref={(input) => {
            this.searchBox = input;
          }} autoFocus/>
          <SearchButton type="submit" onClick={this.onClick} className="fa fa-search"></SearchButton>
        </form>
        <div>
          <ContainerRepository>
          { !this.state.isNotFound ? this
            .state
            .repositories
            .map((item, index) => (
              <Repositories key={index}>
                <a key={index}  onClick={() => this.addLibrary(item.id, item.name, item.url)} type="button" title={item.full_name + " ⭐️" + item.stargazers_count + " ⬇️" + item.forks }><i className="fa fa-plus fa-sm"/> {item.name}</a>
              </Repositories>
            )) : <p>Repository not found</p>}
          </ContainerRepository>
        </div>
      </div>
    );
  }

  onClick(event) {

    searchTerm = this.searchBox.value;
    const endpoint = `https://api.github.com/search/repositories?sort=stars&order=desc&q=${searchTerm}`;
    console.log(searchTerm);
    fetch(endpoint)
      .then(blob => blob.json())
      .then(response => {
        if( response.total_count != 0 ) {
          this.setState({repositories: response.items, isNotFound: false});
        }
        else {  this.setState({isNotFound: true})}
      });
    event.preventDefault();
  }
}

export default SearchRepository
