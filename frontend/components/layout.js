import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Footer from './footer'
import { withTranslation } from 'react-i18next'

class Layout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { t, children, noFooter } = this.props
    return (
      <div className='container'>
        <Header t={t} />
        <div className="sub-body">
          {children}
        </div>
        {!noFooter && <Footer t={t} />}
      </div>
    )
  }
}

Layout.propTypes = {
  t: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  noFooter: PropTypes.bool,
}

Layout.defaultProps = {
  noFooter: false
}

export default withTranslation()(Layout)
