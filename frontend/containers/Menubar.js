import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import Button from '../components/Button'
import {Container, fonts, colors} from '../core/styled'

const MenubarContainer = styled.div`
  padding: 7px 0;
`

const Heading = styled.h1`
  margin: 0;
  left: 50%;
  cursor: pointer;
  position: relative;
  display: inline-block;
  transform: translateX(-50%);

  font-size: 2rem;
  font-family: ${fonts.header};
`

const SearchIcon = styled.div`
  position: absolute;
  cursor: pointer;
  left: 0;
  top: 0.5rem;

  font-size: 1.2rem;
`

const RightContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0.5rem;

  font-size: 1.2rem;
`

const ProfileImage = styled.img`
  width: 10px;
  height: 10px;
  transform: scale(2.5);
  border-radius: 50%;
`

const ProfileName = styled.span`
  margin-left: 15px;
`

class Menubar extends Component {
  state = {
    isAuthenticate: false,
  }

  render() {
    return (
      <MenubarContainer>
        <Container relative>

          <SearchIcon>
            <Button inline icon><i class="zmdi zmdi-search"></i></Button>
          </SearchIcon>

          {!this.state.isAuthenticate &&
            <RightContainer>
              <Button inline margin="0 10px">Sign in</Button>
              <Button inline regular>About QuoteBook</Button>
            </RightContainer>
          }

          {this.state.isAuthenticate &&
            <RightContainer>
              <Button icon inline margin="0 10px"><i class="zmdi zmdi-notifications-none"></i></Button>
              <Button inline>
                <ProfileImage src="https://cdn-images-1.medium.com/fit/c/64/64/1*FKjV0WBgu3xhpeUwOSaABQ.jpeg"/>
                <ProfileName>Chun Rapeepat</ProfileName>
              </Button>
            </RightContainer>
          }

          <Heading>QuoteBook</Heading>
        </Container>
      </MenubarContainer>
    )
  }
}

export default App(Menubar)
