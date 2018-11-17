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
  border: 0 none;
  outline: 0;
  border-radius: 4px;
  /* float: right; */
`
const Repositories = styled.li`
  list-style: none;
  padding-bottom: 5px;
  a{
    text-decoration: none;
    color: #FFF;
    font-size: 0.8rem;
    :hover{
      cursor: pointer;
    }
  }
`
const ContainerRepository = styled.ul`
  max-height: 85vh;
  overflow: scroll;
  float:left;
  margin-left: -30px;
  ::-webkit-scrollbar {
    display: none;
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
