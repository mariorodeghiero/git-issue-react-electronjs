import React, {Component} from 'react';
import styled from 'styled-components';

import Dropdown from './Dropdown';
import Issue from './Issue';
import LogoIcon from '../logo.png';
import Favorite from '../favorite.svg';
import AddInbox from '../add-box.svg';
import { notSelect } from '../style-utils';

const Wrapper = styled.div `
  max-height: 100vh;
  text-align: center;
  background: #24292D;
  opacity: 0.98;
  height: 100vh;
  padding: 10px;
  color: #F0F2F3;
  ${notSelect()}
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
const Icon = styled.img `
  width: 25px;
  height: 25px;
  margin-top: 30px;
  padding: 10px;
  opacity: 0.7;
  :hover{
    opacity: 1;
    cursor: pointer;
  }
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
const CopyRight = styled.div `
  position: fixed;
  bottom: 0;
  padding: 10px;

  span {
    font-size: 0.7rem;
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
        <Logo src={LogoIcon} alt="logo"/>
        <Title>GitHub Issue</Title>
        <hr/>
         <Dropdown icon={Favorite} title={"Library"} library={true} fetchRepo={this.props.fetchRepo} />
         <Dropdown icon={AddInbox} title={"Add Library"} addBox={true} />
          <CopyRight>
            <span>© 2019 Mario Rodeghiero</span>
          </CopyRight>
      </Wrapper>
    );
  }
}

export default Sidebar;
