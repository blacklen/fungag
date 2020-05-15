import React, { Component } from 'react'
import {connect} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import PropTypes from 'prop-types'
import CategoriesActions from '../redux/_categories-redux'
import Router ,{
    withRouter
} from 'next/router'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import { baseURL } from '../constants'

class Menu extends Component{
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            style: {
                textTransform: "capitalize",
                background: "#fadd56",
                color: "black"
            },
            selected: this.props.router.query.category
        }
    }
    
    componentDidMount() {
        this.props.getCategories({});
    }

    handleClick = (id) => {
        const href = '/categoryposts'
        Router.push({
            pathname: href,
            query: {
                category: id
            },
        })
        this.setState({
            selected : id
        })
    }
    
    render() {
        const { data } = this.props 
        let { style, selected } = this.state
        const categories = data.data ? data.data : []
        return (
            <Paper id='categoryMenu' className = "is-hidden-mobile">
                <MenuList className = 'has-background-black has-text-warning' >
                    {categories && categories.map(item =>
                            <MenuItem
                                key={item.name}
                                style = {
                                    item.id === ~~selected ? style : {
                                        textTransform: "capitalize"
                                    }
                                }
                                onClick = {
                                    () => this.handleClick(item.id)
                                }
                            >
                            <ListItemIcon>
                                <img style ={{ height: 35, backgroundSize: "cover"}} src={baseURL.BASE_URL + item.logo}/>
                            </ListItemIcon>
                            <Typography variant="inherit">{item.name}</Typography>
                            
                            </MenuItem>
                        )}
                </MenuList>
            </Paper>
        )
    }

}

Menu.propTypes = {
    data: PropTypes.object,
    getCategories : PropTypes.func
}
  
const mapStateToProps = state => {
    return {
      data: state.categories.data
    }
}
  
const mapDispatchToProps = dispatch => ({
    getCategories : (data)=> dispatch(CategoriesActions.getCategoriesRequest(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Menu))