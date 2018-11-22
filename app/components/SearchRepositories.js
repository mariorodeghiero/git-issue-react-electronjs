import React from 'react'
import styled from 'styled-components';
let searchTerm;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  outline: 0;
  /* float: right; */
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
  border-bottom: 1px solid gray;
  padding: 5px;
  color: #ffffff;
  width: 100%;
  margin-left: -30px;
  text-align: center;
  font-size: 0.8rem;
`
const Repositories = styled.li`
  list-style: none;
  line-height: 1.6em;
  text-align: left;
  a{
    text-decoration: none;
    font-size: 0.8rem;
    color: #ffffff;
    :hover{
      cursor: pointer;
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


class SearchRepository extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this
      .onClick
      .bind(this);
    this.state = {
      repositories: []
    };
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
          }}/>
          <SearchButton type="submit" onClick={this.onClick} className="fa fa-search"></SearchButton>
        </form>
        <div>
          <ContainerRepository>
          {this
            .state
            .repositories
            .map((item, index) => (
              <Repositories>
                <a key={index} type="button"><i className="fa fa-plus fa-sm"/> {item.name}</a>
              </Repositories>
            ))}
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
        this.setState({repositories: response.items});
        console.log('repo: ', response)
      });
    event.preventDefault();

  }
}

export default SearchRepository
