import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connectModal } from 'redux-modal'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import CloseIcon from '@material-ui/icons/Close'

class CommonSnackBar extends Component {
  constructor(props) {
    super(props);
    this.state = { message: [] };
  }

  static propTypes = {
    show: PropTypes.bool,
    info: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    handleHide: PropTypes.func.isRequired,
  }

  static getDerivedStateFromProps(props) {
    let massages = []
    Object.entries(props.info || {}).forEach(([key, value]) => {
      if (value instanceof Array) massages = massages.concat(`${key} : ` +  value)
      if (typeof value == 'string') massages.push(value)
    })
    return {
      message : massages
    }
  }

  render() {
    let { show, type, handleHide } = this.props
    let { message } = this.state
    return (
      <Snackbar
        className="snackbar"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={show && !!message}
        autoHideDuration={6000}
        onClose={handleHide}
      >
        <SnackbarContent
          className={`snackbar-content ${type}`}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className="message">
              {type=='success' && <CheckCircleIcon className="icon"/>}
              {type=='warning' && <WarningIcon className="icon"/>}
              {type=='error' && <ErrorIcon className="icon"/>}
              {type=='info' && <InfoIcon className="icon"/>}
              <label className='has-text-dark title is-6' style = {{textTransform: 'capitalize'}}>{
                message.map(item => <p key = {item}>{item}</p>)
              }</label>
            </span>
          }
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={handleHide}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Snackbar>
    )
  }
}

export default connectModal({ name: 'snackbar' })(CommonSnackBar)
