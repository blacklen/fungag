import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connectModal } from 'redux-modal'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = { message: [] };
    }

    static propTypes = {
        show: PropTypes.bool,
        handleHide: PropTypes.func.isRequired,
        handleDelete : PropTypes.func
    }
        
    handleDelete = e => {
        this.props.handleDelete(this.props.post_id)
        this.props.handleHide()
    }

    render() {
        let { show, handleHide } = this.props
        return (
        <div>
            <Dialog
                open={show}
                onClose={handleHide}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Do you really want to delete it?"}</DialogTitle>
                <DialogActions>
                <Button onClick={this.handleDelete} color="secondary" >
                    Delete
                </Button>
                <Button onClick={handleHide} color="primary" autoFocus>
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </div>
        )
    }
}

export default connectModal({ name: 'deleteConfirm' })(DeleteConfirm)
