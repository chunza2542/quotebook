import React, {Component} from 'react'
import styled from 'styled-components'

import Modal from '../components/Modal'
import Button from '../components/Button'
import {Textarea, Input} from '../components/Input'
import {SpanSuccess, SpanError, SpanWaiting} from '../components/Span'

import * as request from '../core/request'
import {fonts, fontSize, media, colors} from '../core/styled'

const Container = styled.div`
  background: white;
  width: 700px;
  border-radius: 5px;

  ${media.desktop`
    width: 90vw;
  `}
`

const Heading = styled.h1`
  margin: 0;
  font-weight: normal;
  font-family: ${fonts.header};
  font-size: ${fontSize.big}rem;
  color: ${colors.main};
  background: ${colors.background};
  padding: 10px 0;
  text-align: center;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

const Content = styled.div`
  display: flex;
  padding: 20px;

  & > div:nth-child(2) {
    flex: 1;
  }

  ${media.tablet`
    padding: 10px;
  `}
`

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  background: url(${props => props.src}) no-repeat center center;
  background-size: cover;
  border-radius: 3px;
  margin-right: 20px;

  ${media.tablet`
    display: none;
  `}
`

const Footer = styled.div`
  margin-top: 20px;
  font-family: ${fonts.normal};
  color: ${colors.content};
  font-size: ${fontSize.small}rem;

  & > div {
    float: right;
  }
`

// max charaters
const limitChars = 200

// EditProfileModal Component
// - `bio` :: default bio string
// - `profile` :: profile image url
export default class extends Component {
  state = {
    bio: this.props.bio,
    waiting: false,
    response: {},
  }

  handleChange = event => {
    // reset state when user is typing
    this.setState({response:{}, waiting: false})
    if (event.target.value.length < limitChars) {
      this.setState({bio: event.target.value})
    }
  }

  handleSubmit = event => {
    this.setState({waiting: true})
    // request to update bio
    request.withToken(`/api/user/updateBio`, {bio: this.state.bio})
      .then(response => {
        this.setState({response, waiting: false})
      })
    // render toast message
    event.preventDefault()
  }

  render() {
    const props = this.props
    return (
      <Modal {...props}>
        <Container>
          <Heading>Edit Bio</Heading>
          <Content>
            <ProfileImage src={props.profile}/>
            <div>
              <form onSubmit={this.handleSubmit}>
                <Textarea onChange={this.handleChange} value={this.state.bio} placeholder="Say what you think..." />
                <Footer>
                  {this.state.bio.length} / {limitChars} chars
                  <div>
                    {!this.state.waiting && !this.state.response.error && !this.state.response.success &&
                      <Button success>Update</Button>
                    }
                    {this.state.waiting &&
                      <SpanWaiting />
                    }
                    {this.state.response.error &&
                      <SpanError>Something Went Wrong.</SpanError>
                    }
                    {this.state.response.success &&
                      <SpanSuccess>Sucessfully Update!</SpanSuccess>
                    }
                  </div>
                </Footer>
              </form>
            </div>
          </Content>
        </Container>
      </Modal>
    )
  }
}
