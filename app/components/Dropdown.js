import React, {Component} from 'react';
import onClickOutside from "react-onclickoutside";
import Search from "./SearchIssue";
import styled from 'styled-components';
import SearchRepository from './SearchRepositories';

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json')
const db = low(adapter)

const HeaderSelect = styled.div `
  width: 100%;
  padding: 10px;
  text-align: left;
`

const SelectRepo = styled.p `
  font-size: 0.8rem;
  margin: 0;
  cursor: pointer;
`

const ListRepo = styled.ul `
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #FFFFFF;
  li{
    margin-left: -20px;
    line-height: 2em;
    font-size: 0.9rem;
    font-weight: 300;
    cursor: default;
    text-align: left;
    list-style: none;
    opacity: 0.8;
    :hover{
      opacity: 1;
    }
  }
`

const Label = styled.label `
  margin-left: 35px;
  position: fixed;
  margin-top: 2px;
  font-size: 0.9rem;
  font-weight: 300;
`
const Option = styled.img `
  width: 18px;
  height: 18px;
  position: absolute;
  padding-left: 10px;
`


const FilterClosed = styled.form `
  float: right;
  text-align: right;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 8px;
  width: 45%;
  border: 1px solid #dfdfdf;
`

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listOpen: false,
      filterClosed: false,
      icon: this.props.icon,
      title: this.props.title,
      addBox: this.props.addBox,
      library: this.props.library
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
    const {listOpen, icon, title, addBox, library} = this.state;
    return (
      <HeaderSelect>
        {/* <FilterClosed>
            <label>
              <input name="isGoing" type="checkbox"/>
              closed
              closed
            </label>
          </FilterClosed> */}
        <div className="dd-header">
          <SelectRepo className="dd-header-title" onClick={this.toggleList}>
            {listOpen
              ? <i className="fas fa-angle-down 2x"/>
              : <i className="fas fa-angle-right 2x"/>}
              <Option src={icon}/><Label>{title}</Label>
          </SelectRepo>
        </div>
        {listOpen && <ListRepo className="dd-list">
          {library && list.map((item) => (
            <li
              className="dd-list-item"
              key={item.id}
              onClick={() => this.selectItem(item.title, item.url, item.id, item.key)}>{item.title} {item.selected && <i className="fas fa-check"/>}</li>
          ))}
          {addBox && <SearchRepository/>}
        </ListRepo>}
      </HeaderSelect>
    )
  }
}

export default onClickOutside(Dropdown);
