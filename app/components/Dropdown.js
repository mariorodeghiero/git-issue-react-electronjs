import React, {Component} from 'react';
import onClickOutside from "react-onclickoutside";
import styled, {keyframes} from 'styled-components';
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

const SelectRepo = styled.div `
  font-size: 0.8rem;
  margin: 0;
`

const ListRepo = styled.ul `
  margin: 0;
  padding-top: 20px;
  color: #FFFFFF;
  -webkit-animation: fadein  2s;
  -moz-animation: fadein 2s;
  -ms-animation: fadein 2s;
  -o-animation: fadein 2s;
  animation: fadein 2s;
  li{
    margin-left: ${props => props.active === false ? "-30px" : "-50px"};
    line-height: 2em;
    list-style: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span{
      opacity: 0.9;
      font-size: 0.9rem;
      font-weight: 300;
      padding-left: 8px;
      :hover{
        opacity: 1;
      }
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
  cursor: pointer;
`
const animationName = keyframes `
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const MoveToTrash = styled.button `
  float: right;
  margin-top: -10px;
  margin-right: 20px;
  color: #ffffff;
  background-color: transparent;
  border: none;
  opacity: 0.4;
  :hover{
    opacity:  ${props => props.active === true ? "0.4" : "1"};
  }
  :focus {
    outline: 0;
  }
`
const TrashButton = styled.button `
  color: #ffffff;
  margin-left: 2px;
  margin-right: 2px;
  background-color: transparent;
  border: none;
  opacity: 0.4;
  cursor: default;
  display: ${props => props.active === true ? "inline-block" : "none"};
  :focus {
    outline: 0  ;
  }
`

const CheckButton = styled.button `
    margin-left: 2px;
    background-color: red;
    border: none;
    border-radius: 4px;
    color: #ffffff;
    padding: 2px 5px;
    cursor: pointer;
    animation: ${animationName} 1s;
    display: ${props => props.active === true ? "inline-block" : "none"};
`

const CancelButton = styled.button `
    background-color: green;
    border: none;
    border-radius: 4px;
    padding: 2px 7px;
    margin-right: 10px;
    color: #ffffff;
    cursor: pointer;
    animation: ${animationName} 1s linear;
    display: ${props => props.active === true ? "inline-block" : "none"};
`
const LinkButton = styled.button `
    background-color: transparent;
    color: #ffffff;
    border: none;
    cursor: pointer;
    animation: ${animationName} 1s linear;
    display: ${props => props.active === false ? "inline-block" : "none"};
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
      library: this.props.library,
      active: false
    }

    // this.cancelDelete = this.cancelDelete.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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
      .remove({ id: id, title: title, url: url, key: "favorite" })
      .write()
      this.setState(prevState => ({
      active: !prevState.active
    }))
    this.toggleList()
    console.log("test", title, id, url)
  }
  cancelDelete = () => {
    this.setState(prevState => ({
      active: !prevState.active
    }))
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
        {listOpen && <ListRepo active={this.state.active}>
         {!addBox &&
          <MoveToTrash onClick={() => this.cancelDelete()} active={this.state.active}>
				    <i className="far fa-trash-alt fa-lg"></i>
			    </MoveToTrash>}
          {library && list.map((item) => (
            <li key={item.id}>
            <LinkButton
                onClick={() => this.selectItem(item.title, item.url, item.id, item.key)}
                active={this.state.active}>
                <i className="fas fa-sign-in-alt fa-lg"></i>
            </LinkButton>
      <CheckButton onClick={() => this.deleteItem(item.title, item.url, item.id)} active={this.state.active}>
				<i className="fas fa-check fa-xs"></i>
			</CheckButton>
			<TrashButton active={this.state.active}>
				<i className="fas fa-trash-alt"></i>
			</TrashButton>
			<CancelButton onClick={() => this.cancelDelete()} active={this.state.active}>
				<i className="fas fa-times fa-xs"></i>
			</CancelButton>
      {console.log("state button", this.state.active)}
      <span>{item.title}</span></li>
          ))}
          {addBox && <SearchRepository toggleList={this.toggleList} library={list}/>}
        </ListRepo>}
      </HeaderSelect>
    )
  }
}

export default onClickOutside(Dropdown);

  // <TrashIcon src={Trash} onClick={() => this.deleteItem(item.title, item.url, item.id, item.key)} alt="trash icon" title="Delete"/>
