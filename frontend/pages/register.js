import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Layout from '../components/layout'
import AuthsActions from '../redux/_auths-redux'
import Head from 'next/head'
import {Grid } from '@material-ui/core';
import UserIcon from '@material-ui/icons/Person'
import PassIcon from '@material-ui/icons/Lock'
import Link from 'next/link'
import { show } from 'redux-modal'
import { bindActionCreators } from 'redux'


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
        username: "",
        password: "",
        confirm_password : ""
    }
  }

  handleChange = e => {
    this.setState({[e.target.name] : e.target.value})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      if (this.props.data.messages) {
        this.props.show('snackbar', {
          type: 'success',
          info: { message: "Sign up success!! Pls sign in." }
        })
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.register(this.state);
    this.setState({
      username: "",
      password: "",
      confirm_password : ""
    })
  }

  render() {
    const { username, password, confirm_password } = this.state
    return (
      <Layout {...this.props}>
        <Head>
          <title>{'Register'}</title>
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
            
            <br/>

            <div className="field">
              <label className="label has-text-warning">Confirm Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-warning"
                  type="password"
                  placeholder="confirm password"
                  value = {confirm_password} 
                  name='confirm_password'
                  onChange = {this.handleChange}
                />
              <span className="icon is-small is-left">
                <PassIcon/>
              </span>
              </div>
            </div> 

            <div className="field">
                <button onClick = {this.handleSubmit} className="button is-warning is-fullwidth is-outlined">
                  Register
                </button>
            </div>
            <p className=" has-text-white has-text-centered">Already on Fungag?
               <Link href='/login '><a className='has-text-warning'> Sign in </a></Link></p>

          </Grid>   

        </Grid> 
        
      </Layout>
    )
  }
}

Register.propTypes = {
  history: PropTypes.object,
  register: PropTypes.func,
  processing: PropTypes.bool,
  data: PropTypes.object,
  error: PropTypes.object,
  shows: PropTypes.array,
  show: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.auths.processing,
    data: state.auths.data,
    error: state.auths.error
  }
}

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(AuthsActions.registerRequest(data)), //{type: "LOGIN_REQUEST", data: data}
  ...bindActionCreators({ show }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register))
