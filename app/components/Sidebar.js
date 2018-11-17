import React, {Component} from 'react';
import SearchRepository from './SearchRepositories';
import Dropdown from './Dropdown';
import Issue from './Issue';
import styled from 'styled-components';

const Wrapper = styled.div `
  max-height: 100vh;
  background: #001f3f;
  height: 100vh;
  padding: 10px;
  color: #FFF;
`
const Nav = styled.nav `
  transition: all 0.3s;
  ul {
    padding-left: 10px;
  li {
    list-style: none;
    a {
      padding: 10px;
      font-size: 1.1em;
      display: block;
      text-decoration: none;
      color: #fff;
      &:hover {
            filter: contrast(0.4);
            transition: all 0.3s;
      }
    }
  }
}
`

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Wrapper>
        <SearchRepository/>
      </Wrapper>
    );
  }
}

export default Sidebar;
