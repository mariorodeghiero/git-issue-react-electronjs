import React, {Component} from 'react';
import SearchRepository from './SearchRepositories';
import Dropdown from './Dropdown';
import Issue from './Issue';
import Icon from '../logo.png';
import styled from 'styled-components';

const Wrapper = styled.div `
  max-height: 100vh;
  text-align: center;
  /* background: #24292D; */
  /* background: #aec1d4; */
  background: #3A5374;
  height: 100vh;
  padding: 10px;
  color: #F0F2F3;
`
const Title = styled.h1 `
  font-size: 1.6rem;
  text-align: center;
  font-weight: 300;
`
const Logo = styled.img `
  width: 50px;
  height: 50px;
  padding-top: 30px;
  margin: 0 auto;
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
        <Logo src={Icon} alt="logo"/>
        <Title>GitHub Issue</Title>
        <hr/>
        <SearchRepository/>
      </Wrapper>
    );
  }
}

export default Sidebar;
