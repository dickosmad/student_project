import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebase from '../../firebase'
import { Image, Menu, Icon,Dropdown,Button } from 'semantic-ui-react';


 class userDashboard extends Component {
  state = { 
    activeItem: 'home',
    user: null
    // user: this.props.currentUser

}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSignout = () => {
    firebase
    .auth()
    .signOut()
    .then(() => {
        console.log('Sign Out');
    })
  }

  render() {
       
    const { activeItem } = this.state
    // console.log(this.props.currentUser);

  return (
    <>
        <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{background:'linear-gradient(rgb(95, 12, 138), rgb(12, 4, 30))', fontSize:'1.2rem'  }}
        >
          <Menu.Item as='a'>
              {/* <span>
                <Image src={currentUser.photoURL} spaced='right' avatar />
                  {currentUser.displayName}
              </span> */}
            
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='square' />
            Dashboard
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='camera' />
            Channels
          </Menu.Item>
        </Menu>
        <Menu size='small'
         style={{background:'linear-gradient(rgb(95, 12, 138), rgb(12, 4, 30))', fontSize:'1rem' ,marginTop:'0' , marginLeft:'247px' ,color:'white' }}
        >
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />

        <Menu.Menu position='right'>
          <Dropdown item text='Connect'>
            <Dropdown.Menu>
              <Dropdown.Item>Sign Out</Dropdown.Item>
              <Dropdown.Item>Sign In</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Button primary onClick={this.handleSignout}>Sign Out</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
  </>
      )
    }
}

// const mapStateToProps = state =>({
//   currentUser: this.props.user.currentUser
// })

export default connect(null)(userDashboard)
