import React from 'react';
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color:  ${({theme}) => theme.bgLighter};
 height: 56px;
`

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   height: 100%;
   padding: 0 20px;
   justify-content: flex-end;
   position: relative;
`

const Search = styled.div`
  position: absolute;
  width: 40%;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`

const Input = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  font-size: 14px;
 
`

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 15px;  
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  //margin-top: 10px;
  cursor: pointer;
`



const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Search>
                    <Input placeholder="Search"/>
                    <SearchOutlinedIcon/>
                </Search>
                <Button><AccountCircleOutlinedIcon/> SIGN IN</Button>
            </Wrapper>
        </Container>
    );
};

export default Navbar;