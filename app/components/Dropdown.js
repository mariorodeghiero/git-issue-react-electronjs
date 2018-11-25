import React, {Component} from 'react';
import onClickOutside from "react-onclickoutside";
import styled from 'styled-components';
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

import Search from "./SearchIssue";
import SearchRepository from './SearchRepositories';
import Trash from '../../resources/garbage.svg'

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
  /* padding-bottom: 10px; */
  color: #FFFFFF;
  -webkit-animation: fadein 2s;
  -moz-animation: fadein 2s;
  -ms-animation: fadein 2s;
  -o-animation: fadein 2s;
  animation: fadein 2s;
  li{
    margin-left: -20px;
    line-height: 2em;
    font-size: 0.9rem;
    font-weight: 300;
    cursor: pointer;
    text-align: left;
    list-style: none;
    opacity: 0.8;
    :hover{
      opacity: 1;
    }
  }
  @keyframes fadein {
    from{opacity: 0.4;}
    to{opacity: 1;}
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
const TrashIcon = styled.img `
  width: 13px;
  height: 13px;
  opacity: 0.4;
  margin-left: -20px;
  margin-right: 20px;
  :hover {
    cursor: pointer;
    opacity: 1;
  }
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
      listOpen: false,
    }, this.props.fetchRepo(url, id, stateKey))
  }

  deleteItem = (title, url, id) => {
    const adapter = new FileSync('./db.json')
    const db = low(adapter)
    db.get('favorite')
      .remove({ id: id, title: title, url: url, select: false, key: "favorite" })
      .write()
    this.toggleList()
  }

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render() {
    const adapter = new FileSync('./db.json')
    const db = low(adapter)
    const list = db
      .get('favorite')
      .value();

    const {listOpen, icon, title, addBox, library} = this.state;
    return (
      <HeaderSelect>
        <div>
          <SelectRepo onClick={this.toggleList}>
            {listOpen
              ? <i className="fas fa-angle-down 2x"/>
              : <i className="fas fa-angle-right 2x"/>}
              <Option src={icon}/><Label>{title}</Label>
          </SelectRepo>
        </div>
        {listOpen && <ListRepo>
          {library && list.map((item) => (
            <li key={item.id}><TrashIcon src={Trash} onClick={() => this.deleteItem(item.title, item.url, item.id, item.key)} alt="trash icon"/><span onClick={() => this.selectItem(item.title, item.url, item.id, item.key)}>{item.title}</span></li>
          ))}
          {addBox && <SearchRepository/>}
        </ListRepo>}
      </HeaderSelect>
    )
  }
}

export default onClickOutside(Dropdown);
