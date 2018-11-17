import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
    text-align: right;
    padding-right: 10px;
`

const Search = styled.input`
    width: 150px;
    margin-right: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    text-align: center;
    outline: 0;
`

const SearchIssue = (props) => {
    return (
        <div>
            <Form>
                <Search
                    type="search"
                    placeholder="  search issue..."
                    aria-label="Search" />
                    <i className="fa fa-search" aria-hidden="true" />
            </Form>
        </div>
    )
}

export default SearchIssue;
