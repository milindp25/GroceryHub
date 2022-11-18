import React from 'react'
import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Search = styled.div`
margin-top : 1px;
margin-left : 10px;
margin-right : 100px;
display: flex;
` 

const SearchInput = styled.input`
  background-color: white;
  border: 10;
  border-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 18px;
  padding: 15px;
  height: 50px;
  width: 800px;
  focus {
    outline: none;
  }
`
const SerachIcon = styled.div`
  height: 60px;
  width: 50px;
  display: grid;
  place-items: center;
`
const DataResult = styled.div`
  margin-top: 5px;
  margin-right:20px;
  width: 800px;
  height: 200px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  overflow-y: auto;
`
const DataItem = styled.a`
    
`
const Span = styled.span`
width: 100%;
    height: 50px;
    display: flex;
    color: black;
    hover {
        background-color: lightgrey;
      }
text-decoration: none;
opacity: 1
`

const SearchBar = ({ placeholder, data }) => {

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
        console.log(value);
      return value.prod_name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div>
    <Search>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={wordEntered}
        onChange={handleFilter}
      />
      <SerachIcon>
        {filteredData.length === 0 ? (
          <SearchIcon style={{fontSize : "35px",color:"black"}} />
        ) : (
          <CloseIcon id="clearBtn" style={{fontSize : "35px",color:"black"}} onClick={clearInput} />
        )}
      </SerachIcon>
    </Search>
    {filteredData.length != 0 && (
      <DataResult>
        {filteredData.slice(0, 15).map((value, key) => {
          return (
            <Link to={`/product/${value.prod_id}`} state>
            <Span>
              <p>{value.prod_name} </p>
            </Span>
            </Link>
          );
        })}
      </DataResult>
    )}
  </div>
  )
}

export default SearchBar