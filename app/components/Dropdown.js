import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import styled, { keyframes } from 'styled-components';

import Search from './SearchIssue';
import { notSelect } from '../style-utils';
import SearchRepository from './SearchRepositories';

const HeaderSelect = styled.div`
  width: 100%;
  padding: 10px;
  text-align: left;
`;

const SelectRepo = styled.div`
  font-size: 0.8rem;
  margin: 0;
`;

const ListRepo = styled.ul`
  max-height: 58vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  padding-top: 20px;
  color: #ffffff;
  -webkit-animation: fadein 2s;
  -moz-animation: fadein 2s;
  -ms-animation: fadein 2s;
  -o-animation: fadein 2s;
  animation: fadein 2s;
  li {
    margin-left: ${props => (props.active === false ? '-30px' : '-50px')};
    line-height: 2em;
    list-style: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span {
      opacity: 0.9;
      font-size: 0.9rem;
      font-weight: 300;
      cursor: default;
      :hover {
        opacity: 1;
      }
    }
  }
  @keyframes fadein {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }
`;

const Label = styled.label`
  margin-left: 35px;
  position: fixed;
  margin-top: 2px;
  font-size: 0.9rem;
  font-weight: 300;
`;
const Option = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  padding-left: 10px;
  cursor: pointer;
`;
const animationName = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const MoveToTrash = styled.button`
  float: right;
  margin-top: -20px;
  margin-right: 20px;
  color: #ffffff;
  background-color: transparent;
  border: none;
  opacity: 0.4;
  :hover {
    opacity: ${props => (props.active === true ? '0.4' : '1')};
  }
  ${notSelect()}
`;
const TrashButton = styled.button`
  color: #ffffff;
  padding-left: 8px;
  padding-right: 8px;
  background-color: transparent;
  border: none;
  opacity: 0.4;
  display: ${props => (props.active === true ? 'inline-block' : 'none')};
  ${notSelect()}
`;

const CheckButton = styled.button`
  margin-left: 10px;
  background-color: red;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  padding: 2px 5px;
  cursor: pointer;
  animation: ${animationName} 1s;
  display: ${props => (props.active === true ? 'inline-block' : 'none')};
  ${notSelect()}
`;

const CancelButton = styled.button`
  background-color: green;
  border: none;
  border-radius: 4px;
  padding: 2px 7px;
  margin-right: 10px;
  color: #ffffff;
  cursor: pointer;
  animation: ${animationName} 1s linear;
  display: ${props => (props.active === true ? 'inline-block' : 'none')};
  ${notSelect()}
`;
const LinkButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  animation: ${animationName} 1s linear;
  color: #ffffff;
  display: ${props => (props.active !== true ? 'inline-block' : 'none')};
  ${notSelect()}
`;

const FilterClosed = styled.form`
  float: right;
  text-align: right;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 8px;
  width: 45%;
  border: 1px solid #dfdfdf;
`;

var electron = require('electron');
const app = electron.remote.app;
var userData = app.getPath('userData');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      filterClosed: false,
      icon: this.props.icon,
      title: this.props.title,
      addBox: this.props.addBox,
      library: this.props.library,
      active: false,
      linkActive: 0,
      newList: ''
    };

    this.deleteItem = this.deleteItem.bind(this);
  }

  handleClickOutside(e) {
    this.setState({ listOpen: false });
  }

  selectItem = (title, url, id, stateKey) => {
    this.setState(
      {
        headerTitle: title,
        linkActive: id
        // listOpen: false,
      },
      this.props.fetchRepo(url, id, stateKey)
    );
  };

  deleteItem = (title, url, id) => {
    const adapter = new FileSync(userData + 'db.json');
    const db = low(adapter);
    db.get('favorite')
      .remove({ id: id, title: title, url: url, key: 'favorite' })
      .write();
    this.setState(prevState => ({
      active: !prevState.active
    }));
  };
  cancelDelete = () => {
    this.setState(prevState => ({
      active: !prevState.active
    }));
  };

  toggleList = () => {
    const adapter = new FileSync(userData + './db/db.json');
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  };

  render() {
    const adapter = new FileSync(userData + 'db.json');
    const db = low(adapter);
    const list = db.get('favorite').value();

    const {
      listOpen,
      icon,
      title,
      addBox,
      library,
      active,
      linkActive
    } = this.state;
    return (
      <HeaderSelect>
        <div>
          <SelectRepo onClick={this.toggleList}>
            {listOpen ? (
              <i className="fas fa-angle-down 2x" />
            ) : (
              <i className="fas fa-angle-right 2x" />
            )}
            <Option src={icon} />
            <Label>{title}</Label>
          </SelectRepo>
        </div>
        {listOpen && (
          <ListRepo active={active}>
            {!addBox && (
              <MoveToTrash onClick={() => this.cancelDelete()} active={active}>
                <i className="far fa-trash-alt fa-lg" />
              </MoveToTrash>
            )}
            {library &&
              list.map(item => (
                <li key={item.id} title={item.fullName}>
                  <LinkButton
                    onClick={() =>
                      this.selectItem(item.title, item.url, item.id, item.key)
                    }
                    active={active}
                  >
                    <i
                      className={
                        item.id !== linkActive
                          ? 'fas fa-sign-in-alt fa-lg'
                          : 'fas fa-sign-in-alt fa-lg link-desable'
                      }
                    />
                  </LinkButton>
                  <CheckButton
                    onClick={() =>
                      this.deleteItem(item.title, item.url, item.id)
                    }
                    active={active}
                  >
                    <i className="fas fa-check fa-xs" />
                  </CheckButton>
                  <TrashButton active={active}>
                    <i className="fas fa-trash-alt" />
                  </TrashButton>
                  <CancelButton
                    onClick={() => this.cancelDelete()}
                    active={active}
                  >
                    <i className="fas fa-times fa-xs" />
                  </CancelButton>
                  <span>{item.title}</span>
                </li>
              ))}
            {addBox && (
              <SearchRepository toggleList={this.toggleList} library={list} />
            )}
          </ListRepo>
        )}
      </HeaderSelect>
    );
  }
}

export default onClickOutside(Dropdown);
