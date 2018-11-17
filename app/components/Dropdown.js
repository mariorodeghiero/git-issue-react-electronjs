import React, {Component} from 'react';
import onClickOutside from "react-onclickoutside";
import styled from 'styled-components';

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json')
const db = low(adapter)

const HeaderSelect = styled.div `
  position: fixed;
  height: 35px;
  width: 250px;
`

const SelectRepo = styled.p `
  font-size: 0.8rem;
  padding: 10px;
  margin: 0;
  color: #000;
  cursor: pointer;
`

const ListRepo = styled.ul `
  text-align: left;
  margin: 0;
  padding-right: 20px;
  padding-bottom: 10px;
  li{
    font-size: 0.8rem;
    text-align: left;
    list-style: none;
  }
`

const Icon = styled.i `
  position: relative;
  left: 10px;
`

const FilterClosed = styled.form `
  float: right;
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
        <div className="dd-header">
          <SelectRepo className="dd-header-title" onClick={this.toggleList}>
            {headerTitle}
            {listOpen
              ? <Icon className="fas fa-angle-up 2x"/>
              : <Icon className="fas fa-angle-down 2x"/>}
          </SelectRepo>
        </div>
        {listOpen && <ListRepo className="dd-list">
          <FilterClosed>
            <label>
              <input name="isGoing" type="checkbox"/>
              closed
            </label>
          </FilterClosed>
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
