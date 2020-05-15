import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import Layout from '../components/layout'
import Head from 'next/head'
import {Grid } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish'
import CategoriesActions from '../redux/_categories-redux'
import PostsActions from '../redux/_posts-redux'


class AddPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: "",
      src: null,
      defaultSrc:"../static/default.jpg",
      title: "",
      selectedCategory : ""
    }
  }

  componentDidMount() {
    this.props.getCategories({});
  }

  handleChange = e => {
    let name = e.target.name, value = e.target.value, src = ''
    if (name === 'file') {
      var binaryData = [];
      binaryData.push(e.target.files[0]);
      value = e.target.files[0]
      src = window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }))
      this.setState({[name] : value, src : src})
    }
    else this.setState({[name] : value})
  }

  handleCancel = e => {
    e.preventDefault();
    Router.push({ pathname: '/'})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.posts !== this.props.posts) {
      if (this.props.posts.data) {
        window.location.href = '/'
      }
    }
  }

  handlePublish = e => {
    e.preventDefault();
    const postData = new FormData();
    let { title, selectedCategory, file } = this.state
    if(selectedCategory === "") selectedCategory = this.props.category.data[0].id
    postData.set("title", title)
    postData.set("image", file)
    postData.set("category", selectedCategory)
    this.props.createPost(postData)
  }

  render() {
    const { title, selectedCategory, src } = this.state
    const { category } = this.props 
    const categories = category.data ? category.data : []
    return (
      <Layout {...this.props}>
        <Head>
          <title>{'New Post'}</title>
        </Head>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '90vh'}}
        >

          <Grid item xs={6}>
            <div className="field">
              <label className="label has-text-warning">Title</label>
              <div className="control">
                <input
                  className="input is-warning has-padding-right-100"
                  type="text"
                  placeholder="title"
                  value={title}
                  name='title'
                  onChange = {this.handleChange}
                />
              </div>
            </div>   
            
            <div className="field">
              <label className="label has-text-warning">Category</label>
              <div className="control">
                <div className="select is-warning">
                  <select name = "selectedCategory" value={selectedCategory} onChange = {this.handleChange} >
                    {categories && categories.map(item => <option value = {item.id} key={item.name}>{item.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="field">
                <label className="label has-text-warning">Category</label>
                
                <div className="file is-small">
                  <label className="file-label">
                  <input className="file-input" type="file" name="file" onChange={this.handleChange}/>
                    <span className="file-cta">
                      <span className="file-icon">
                        <PublishIcon/>
                      </span>
                      <span className="file-label">
                        Choose a file…
                      </span>
                    </span>
                  </label>
                </div>
            </div>

            <div className="field">
              <img src={src}  style={{height : '300px' ,width : "500px", backgroundSize: 'cover' }}/>
            </div>

            <br/>

            <div className="field">
                  <button onClick = {this.handlePublish} className="button is-success is-outlined is-pulled-left">
                      Publish
                  </button>
                  <button onClick = {this.handleCancel} className="button is-danger is-outlined is-pulled-right">
                      Cancel
                  </button>
            </div>
          </Grid>  
        </Grid> 
      </Layout>
    )
  }
}

AddPost.propTypes = {
  history: PropTypes.object,
  getCategories: PropTypes.func,
  createPost : PropTypes.func,
  processing: PropTypes.bool,
  category: PropTypes.object,
  posts: PropTypes.object,
  auths: PropTypes.object,
  error: PropTypes.object,
  shows: PropTypes.array
}

const mapStateToProps = state => {
  return {
    processing: state.auths.processing,
    category: state.categories.data,
    auths: state.auths.data,
    posts : state.posts.data,
    error: state.auths.error,
  }
}

const mapDispatchToProps = dispatch => ({
  getCategories: (data) => dispatch(CategoriesActions.getCategoriesRequest(data)),
  createPost : (data) => dispatch(PostsActions.createPostRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddPost))
