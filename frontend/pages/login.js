import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Router,{ withRouter } from 'next/router'
import Layout from '../components/layout'
import AuthsActions from '../redux/_auths-redux'
import AuthsUtils from '../utils/auths'
import Head from 'next/head'
import {Grid } from '@material-ui/core';
import UserIcon from '@material-ui/icons/Person'
import PassIcon from '@material-ui/icons/Lock'
import Link from 'next/link'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password : ""
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      if (this.props.data.data) {
          // Router.push({
          //   pathname: '/',
          //   // query: { name: 'Someone' }
          // })
        window.location.href = '/'
        AuthsUtils.login(this.props.data.data.auth_token, this.props.data.data.id);
      }
    }
  }

  handleChange = e => {
    this.setState({[e.target.name] : e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state)
  }

  render() {
    const { username, password } = this.state
    return (
      <Layout {...this.props}>
        <Head>
          <title>{'Login'}</title>
        </Head>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '90vh'}}
        >

          <Grid item xs={3}>
            <div className="field">
              <label className="label has-text-warning">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-warning"
                  type="text"
                  placeholder="username"
                  value={username}
                  name='username'
                  onChange = {this.handleChange}
                />
              <span className="icon is-small is-left">
                <UserIcon/>
              </span>
              </div>
            </div>  

            <br />
            
            <div className="field">
              <label className="label has-text-warning">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-warning"
                  type="password"
                  placeholder="password"
                  value = {password} 
                  name='password'
                  onChange = {this.handleChange}
                />
              <span className="icon is-small is-left">
                <PassIcon/>
              </span>
              </div>
            </div>  

            <div className="field">
                <button onClick = {this.handleSubmit} className="button is-warning is-fullwidth is-outlined">
                  Login
                </button>
            </div>
            <p className=" has-text-white has-text-centered">New to Fungag?
               <Link href='/register'><a className='has-text-warning'> Join now! </a></Link></p>

          </Grid>   

        </Grid> 
        
      </Layout>
    )
  }
}

Login.propTypes = {
  history: PropTypes.object,
  login: PropTypes.func,
  processing: PropTypes.bool,
  data: PropTypes.object,
  error: PropTypes.object,
  shows: PropTypes.array
}

const mapStateToProps = state => {
  return {
    processing: state.auths.processing,
    data: state.auths.data,
    error: state.auths.error
  }
}

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(AuthsActions.loginRequest(data)) //{type: "LOGIN_REQUEST", data: data}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login))
