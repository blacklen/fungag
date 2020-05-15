import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import AuthsUtils from '../utils/auths'
import AuthsActions from '../redux/_auths-redux'

const logo = '../static/fungag-0.jpg'
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login : AuthsUtils.isAuthenticated(),
      menu: false,
      anchorEl: null,
    }
  }

  handleSignout = () => {
    AuthsUtils.logout();
    this.setState({ login: !this.state.login })
    this.props.logout()
    window.location.href = '/'
  }
  render() {
    const {login} = this.state;
    return (
      <Fragment>
        <nav className="navbar is-fixed-top container has-background-black is-flex" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link href="/">
              <img src={logo} id='logo'/>
            </Link>

            {/* <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a> */}
          </div>

          {login ? <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable" >
                  <a className="navbar-link has-text-warning">
                    More
                  </a>

                  <div className="navbar-dropdown has-background-black">
                    <a className="navbar-item has-text-warning" onClick = {() => Router.push('/myposts')}>
                      My posts
                    </a>
                    
                    <hr className="navbar-divider"/>
                    <a className="navbar-item has-text-warning" onClick = {this.handleSignout}>
                      Signout
                    </a>
                  </div>
                </div>

              <div className="navbar-item">
                <div className="buttons">
                  
                  <Link href='/addpost'>
                    <button className="button is-warning has-margin-right-10 is-outlined" >
                      Add Post</button></Link>
                </div>
              </div>  
              </div>
          </div> : <div className="navbar-end is-flex">
                <Link href='/login'>
                  <button className="button is-warning has-margin-right-10 has-margin-top-5 is-outlined" >
                    Sign in</button>
                </Link>
              </div>
              }
          
          </nav>
      </Fragment>
    )
  }
}

Header.propTypes = {
  data: PropTypes.object,
  logout: PropTypes.func
}

const mapStateToProps = state => {
  return {
    data: state.auths.data
  }
}

const mapDispatchToProps = dispatch => ({
  logout : () => dispatch(AuthsActions.logoutRequest())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header))
