import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    connect
} from 'react-redux'
import { connectModal } from 'redux-modal'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CategoriesActions from '../redux/_categories-redux'
import {
    Grid
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish'
import {
    baseURL
} from '../constants'
import PostsActions from '../redux/_posts-redux'



class UpdatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            src: null,
            title: "",
            selectedCategory: null,
            categories: null
        };
    }

    static propTypes = {
        show: PropTypes.bool,
        handleHide: PropTypes.func.isRequired,
        handleDelete : PropTypes.func
    }

    componentDidMount() {
        this.props.getCategories({})
        const {post} = this.props
        this.setState({
            title: post.title,
            selectedCategory: post.category,
            src: baseURL.BASE_URL + post.image,
        })        
    }

    handleChange = e => {
        let name = e.target.name,
            value = e.target.value,
            src = ''
        if (name === 'file') {
            var binaryData = [];
            binaryData.push(e.target.files[0]);
            value = e.target.files[0]
            src = window.URL.createObjectURL(new Blob(binaryData, {
                type: "application/zip"
            }))
            this.setState({
                [name]: value,
                src: src
            })
        } else this.setState({
            [name]: value
        })
    }

    handleUpdate = e => {
        e.preventDefault();
        const postData = new FormData();
        let {
            title,
            selectedCategory,
            file
        } = this.state
        if (selectedCategory === null) selectedCategory = this.props.category.data[0].id
        postData.set("title", title)
        if(file)    postData.set("image", file)
        postData.set("category", selectedCategory)
        this.props.editPost({ postData : postData, id: this.props.post.id })
        this.props.handleHide();
    }

    render() {
        let { show, handleHide, category } = this.props
        let {selectedCategory, title, src} = this.state
        const categories = category.data ? category.data : []

        return (
        <Dialog
            open={show}
            onClose={handleHide}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle className = "has-background-warning" id="responsive-dialog-title">{"Edit Post"}</DialogTitle>
                <DialogContent >
                <Grid item xs={12}>
                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input
                                className="input has-padding-right-100"
                                type="text"
                                placeholder="title"
                                value={title}
                                name='title'
                                onChange = {this.handleChange}
                                />
                            </div>
                        </div>   
                        
                        <div className="field">
                            <label className="label">Category</label>
                            <div className="control">
                                <div className="select">
                                    <select
                                        name="selectedCategory"
                                        value={selectedCategory}
                                        onChange={this.handleChange}
                                    >
                                        {categories && categories.map(item =>
                                            <option value={item.id} key={item.name}>{item.name}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="field">
                            <label className="label">Category</label>
                            
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
                </Grid>  
            </DialogContent>
            <DialogActions className = "">
                <button onClick = {this.handleUpdate} className="button is-success is-outlined is-pulled-left">
                      Update
                  </button>
                  <button onClick = {handleHide} className="button is-danger is-outlined is-pulled-right">
                      Cancel
                  </button>
            </DialogActions>
        </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {
        category: state.categories.data,
        posts: state.posts.data,
        error: state.auths.error,
        dataUpdate : state.posts.dataUpdate
    }
}

const mapDispatchToProps = dispatch => ({
    getCategories: (data) => dispatch(CategoriesActions.getCategoriesRequest(data)),
    editPost: (data) => dispatch(PostsActions.editPostRequest(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (connectModal({
    name: 'updatePost'
})(UpdatePost))
