import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {connect} from 'react-redux'

import App from '../components/App'
import Button from '../components/Button'
import QuoteCard from '../components/QuoteCard'
import Error from './_error'

import Menubar from '../containers/Menubar'
import EditProfileModal from '../containers/EditProfileModal'

import {Container, media, fonts, colors, fontSize} from '../core/styled'

const imageSize = 230;

const ProfileContainer = styled.div`
  display: flex;

  & > div:nth-child(1) {
    width: ${imageSize}px;
    margin-right: 30px;
  }

  & > div:nth-child(2) {
    flex: 1;
  }

  ${media.desktop`
    display: block;

    & > div:nth-child(1) {
      width: 100%;
      margin-right: 0;
      margin-bottom: 20px;
      padding-bottom: 20px;

      border-bottom: 1px solid #ccc;
    }
  `}
`

const ProfileImage = styled.div`
  width: ${imageSize}px;
  height: ${imageSize}px;
  background: url(${props => props.src}) no-repeat center center;
  border: 1px solid ${colors.main};
  background-size: cover;
  border-radius: 5px;
`

const ProfileName = styled.div`
  font-family: ${fonts.normal};
  font-size: ${fontSize.big}rem;
  margin-top: 20px;
  color: ${colors.main};

  ${media.desktop`
    margin-top: 0;
  `}
`

const Bio = styled.div`
  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}rem;
  color: ${colors.content};
  margin-top: 10px;
  line-height: 25px;
`

const BioIcon = styled.div`
  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}rem;
  margin-top: 20px;
  color: ${colors.content};

  ${media.desktop`
    margin-top: 10px;
  `}

  & div {
    margin-top: 5px;
  }

  & i {
    width: 20px;
  }
`

const BioContainer = styled.div`
  position: sticky;
  top: 20px;

  ${media.desktop`
    position: static;
    display: flex;

    & > div:nth-child(1) {
      width: 90px;
      height: 90px;
      margin-right: 15px;
    }

    & > div:nth-child(2) {
      flex: 1;
    }
  `}

  ${media.tablet`
    & > div:nth-child(1) {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }
  `}
`

class ProfileView extends Component {
  state = {
    editProfileModal: false,
    profile: {},
  }

  static async getInitialProps({query, req, res}) {
    let id = null
    if (req === undefined) id = query.id
    else id = req.params.id
    // fetch api to get profile information
    const resProfile = await axios.get(`/api/user/profile?id=${id}`).then(res => res.data)
    if (resProfile.success) {
      return {profile: resProfile.payload, fbid: id}
    }
    // error user not found or something
    if (resProfile.error && res) res.statusCode = 404
    return {profile:{}, notfound: true}
  }

  componentWillMount = () => {
    this.setState({profile: this.props.profile})
  }

  closeModal = fbid => async() => {
    this.setState({editProfileModal: false})
    // fetch profile again and re-render
    const resProfile = await axios.get(`/api/user/profile?id=${fbid}`).then(res => res.data)
    if (resProfile.success) {
      this.setState({profile: resProfile.payload})
    }
  }

  render() {
    const {profile, notfound, user} = this.props
    // render error 404 notfound instead
    if (notfound) {
      return <Error statusCode={404} />
    }
    return (
      <div>
        <Menubar night/>

        {user.isUserLogin && user.userProfile.fbid === profile.fbid &&
          <EditProfileModal
            bio={profile.bio}
            profile={profile.profile_image}
            close={this.closeModal(this.props.fbid)}
            show={this.state.editProfileModal} />
        }

        <Container with-margin>
          <ProfileContainer>

            <div>
              <BioContainer>
                <ProfileImage src={profile.profile_image} />
                <div>
                  <ProfileName>{profile.display_name}</ProfileName>
                  <Bio>{this.state.profile.bio}</Bio>

                  {/* <BioIcon>
                    <div><i className="zmdi zmdi-case"></i> Founder at QuoteBook</div>
                    <div><i className="zmdi zmdi-pin"></i> Bangkok, Thailand</div>
                    <div><i className="zmdi zmdi-facebook-box"></i> Chun Rapeepat</div>
                    <div><i className="zmdi zmdi-link"></i> https://thechun.xyz</div>
                  </BioIcon> */}
                  {user.isUserLogin && user.userProfile.fbid === profile.fbid &&
                    <Button onClick={() => this.setState({editProfileModal: true})} inline link style={{'marginTop': '15px'}}>
                        <i className="zmdi zmdi-edit"></i> Edit Bio
                    </Button>
                  }
                </div>
              </BioContainer>
            </div>

            <div>
              <QuoteCard noprofile/>
              <QuoteCard noprofile/>
              <QuoteCard noprofile/>
              <QuoteCard noprofile/>
              <QuoteCard noprofile/>
              <QuoteCard noprofile/>
              <QuoteCard noprofile/>
              <QuoteCard noprofile/>
              <QuoteCard noprofile/>
            </div>

          </ProfileContainer>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default App(connect(mapStateToProps, null)(ProfileView))
