import React, {Component} from 'react';
import onClickOutside from "react-onclickoutside";
import styled from 'styled-components';

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json')
const db = low(adapter)

const HeaderSelect = styled.div `
  position: fixed;
  width: 320px;
`

const SelectRepo = styled.p `
  background: whitesmoke;
  font-size: 0.8rem;
  width: 50%;
  padding-left: 10px;
  margin: 0;
  color: #000;
  cursor: pointer;
`

const ListRepo = styled.ul `
  margin: 0;
  padding-top : 10px;
  padding-bottom: 10px;
  border: 1px solid #dfdfdf;
  background-color: #ffffff;
  li{
    margin-left: -20px;
    line-height: 1.8em;
    font-size: 0.8rem;
    cursor: default;
    text-align: left;
    list-style: none;
    :hover{
      background-color: #F6F8FA;
    }
  }
`

const Icon = styled.i `
  margin:10px;
  left: 10px;
  right: 10px;
`

const FilterClosed = styled.form `
  float: right;
  text-align: right;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 8px;
  background: whitesmoke;
  width: 45%;
  border: 1px solid #dfdfdf;
`

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listOpen: false,
      filterClosed: false,
      headerTitle: this.props.title
    }
  }

  handleClickOutside(e) {
    this.setState({listOpen: false})
  }

  selectItem = (title, url, id, stateKey) => {
    this.setState({
      headerTitle: title,
      listOpen: false
    }, this.props.fetchRepo(url, id, stateKey))
  }

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render() {
    const list = db
      .get('favorite')
      .value();
    const {listOpen, headerTitle} = this.state;
    return (
      <HeaderSelect>
        <FilterClosed>
            <label>
              <input name="isGoing" type="checkbox"/>
              closed
            </label>
          </FilterClosed>
        <div className="dd-header">
          <SelectRepo className="dd-header-title" onClick={this.toggleList}>
            {listOpen
              ? <Icon className="fas fa-angle-down 2x"/>
              : <Icon className="fas fa-angle-right 2x"/>}
              {headerTitle}
          </SelectRepo>
        </div>
        {listOpen && <ListRepo className="dd-list">
          {list.map((item) => (
            <li
              className="dd-list-item"
              key={item.id}
              onClick={() => this.selectItem(item.title, item.url, item.id, item.key)}>{item.title} {item.selected && <i className="fas fa-check"/>}</li>
          ))}
        </ListRepo>}
      </HeaderSelect>
    )
  }
}

export default onClickOutside(Dropdown);
