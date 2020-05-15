import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Router, { withRouter } from 'next/router'
import {Typography, Paper, Button} from '@material-ui/core'
import PostsActions from '../redux/_posts-redux'
import InfiniteScroll from "react-infinite-scroll-component"
import { baseURL } from '../constants'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import PropTypes from 'prop-types'
import AuthsUtils from '../utils/auths'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteConfirm from '../dialogs/delete-confirm'
import UpdatePost from '../dialogs/update-post'
import {
  show
} from 'redux-modal'
import {
  bindActionCreators
} from 'redux'

class SinglePost extends Component {
  constructor(props) {
    super(props)
      this.state = {
        items:  null,
        hasMore: true,
        page: 1,
        total: 0,
        update: false,
        categoryId: null
    }
  }

  componentDidMount() {
    Router.events.on("routeChangeComplete", url => {
      if (url !== '/addpost') {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('category');
        if (url.indexOf('/categoryposts') > -1) {
          this.props.getPostsByCategory({
            id: categoryId
          })
        }
      }
      });
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');
    const {
      myposts
    } = this.props
    if (!categoryId) {
      if (myposts) this.props.getUserPosts({
        id: localStorage.id_user
      })
      else this.props.getPosts({});
    }
  }
  
 
  componentDidUpdate(prevProps) {
    if (this.props.dataUpdate && (!prevProps.dataUpdate || prevProps.dataUpdate !== this.props.dataUpdate)) {
      let { items } = this.state;
      if (this.props.dataUpdate.message === 'delete') {
        var index = _.findIndex(items, {
          id: ~~this.props.dataUpdate.deletePost
        })
        items.splice(index, 1);
        this.setState({
          items: items
        })
      }
      else {
        var index = _.findIndex(items, {
          id: this.props.dataUpdate.data.id
        })
        items.splice(index, 1, this.props.dataUpdate.data);
        this.setState({
          items: items
        })
      }
      
      // Replace item at index using native splice
    }
    if (this.props.vote &&
      (!prevProps.vote || prevProps.vote.votePost !== this.props.vote.votePost ||
        prevProps.vote.actionVote !== this.props.vote.actionVote)) {
      let { items } = this.state;
      let id = localStorage.id_user
      let index = items.findIndex(item => item.id === this.props.vote.votePost)
      items[index].users_like = _.xor(items[index].users_like, [~~id])
      this.setState({items : items})
    }
      if (prevProps.posts.category_id !== this.props.posts.category_id
        || prevProps.posts.id_user !== this.props.posts.id_user
        || prevProps.posts.getPosts !== this.props.posts.getPosts
        || this.state.items === null) {
        this.setState({
          page: 1,
          items: this.props.posts.data.results,
          total: this.props.posts.data.count
        })
      }
      else if (this.props.posts.nextPage !== prevProps.posts.nextPage) {
        this.setState({
          items: this.state.items.concat(this.props.posts.data.results),
          total: this.props.posts.data.count
        })
      }
  }

  fetchMoreItems = ()=> {
    if (this.state.items.length >= this.state.total) {
      this.setState({ hasMore: false });
      return;
    }
  
    let { page } = this.state;
    let {myposts, categorypage} = this.props
    page = page + 1;
    setTimeout(() => {
      if (categorypage) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('category');
        this.props.getPostsByCategory({
          id: categoryId,
          page: page
        })
      }
      else if(!myposts) this.props.getPosts({ page: page })
      else this.props.getUserPosts({id : localStorage.id_user, page: page})
      this.setState({ page: page })
    }, 500);
  }

  handleVote = (vote, id) => {
    if (!AuthsUtils.isAuthenticated()) {
      Router.push({ pathname: '/login' })
      return;
    }
    this.props.votePost({
      post_id: id,
      action : vote
    })
    this.setState({update: !this.state.update})
  }

  onDelete = (post_id) => {
    this.props.show('deleteConfirm', {
      post_id: post_id,
      handleDelete : this.handleDelete
    })
  }

  onEdit = (post) => {
    this.props.show('updatePost', {
      post: post
    })
  }

  handleDelete = (post_id) => {
    this.props.deletePost({id: post_id})
  }

  render() {
    let { items, hasMore } = this.state
    let { myposts, dataUpdate } = this.props
    items = items === null ? [] : items
    return (
      <div>
        <DeleteConfirm />
        <UpdatePost/>
        {items.length ? <InfiniteScroll
          dataLength={items.length}
          next={this.fetchMoreItems}
          hasMore={hasMore}
          loader={<h1 className="title has-text-warning has-text-centered">Loading...</h1>}
          endMessage={
            <p className="has-text-warning has-text-centered">
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          >
          {items.map(post => {
            let disabled = post.users_like.includes(~~localStorage.id_user)
            return (
              <Paper style={{ background: "transparent" }} key={post.id} className='is-clearfix'>
                <br />
                <Typography className='is-pulled-left has-text-warning' variant="h5">
                  {post.title.substring(0, 40)}
                  {post.title.length > 40 ? "..." : ""}
                </Typography>
                
                {myposts ? <div className='is-pulled-right'>
                  <Button className='has-background-success' size='small' onClick={() => this.onEdit(post)} >
                    <EditIcon />
                  </Button>
                  <Button className='has-margin-left-10 has-background-danger' size='small' onClick={() => this.onDelete(post.id)} >
                    <DeleteIcon />
                  </Button>
                </div> : ""}
                  
                <br />
                <figure className="image is-5by3 has-margin-top-30">
                  <img src={baseURL.BASE_URL + post.image} />
                </figure>
                <Typography className='has-text-light has-margin-top-5'>{post.users_like.length} points</Typography>
                {!myposts ?
                  <>
                    <button disabled={disabled} className="is-outlined button is-info has-margin-right-10" onClick={() => this.handleVote(1, post.id)}><ArrowUpwardIcon /></button>
                    <button disabled={!disabled} className="is-outlined button is-danger has-margin-left-5" onClick={() => this.handleVote(0, post.id)}><ArrowDownwardIcon /></button>
                    <br />
                  </> : ""}
                <br />
              </Paper>
            )
          })}
        </InfiniteScroll> : ""}
        {!this.props.processing ? 
          "": <p className = "has-text-warning has-text-centered">
              <b>Loading....</b>
            </p>}
          {!items.length ? <p className = "has-text-warning has-text-centered">
              <b>Yay! You have seen it all!</b>
            </p> : ""}
      </div>
    )
  }
}

SinglePost.propTypes = {
  processing: PropTypes.bool,
  posts: PropTypes.object,
  getPosts: PropTypes.func,
  getUserPosts: PropTypes.func,
  votePost: PropTypes.func,
  deletePost : PropTypes.func,
  vote: PropTypes.object,
  show: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.auths.processing,
    posts: state.posts.data,
    vote: state.posts.vote,
    auth: state.auths.data.data,
    dataUpdate: state.posts.dataUpdate
  }
}

const mapDispatchToProps = dispatch => ({
  getPosts: data => dispatch(PostsActions.getPostsRequest(data)),
  getUserPosts: data => dispatch(PostsActions.getUserPostsRequest(data)),
  getPostsByCategory: data => dispatch(PostsActions.getPostsByCategoryRequest(data)),
  votePost: data => dispatch(PostsActions.votePostRequest(data)),
  deletePost : data => dispatch(PostsActions.deletePostRequest(data)),
  ...bindActionCreators({
    show
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SinglePost))
