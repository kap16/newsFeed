// Importing Libraries
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Importing files
import * as actions from '../actions/index';
import AboutModal from '../components/modal/about.js'
import navbarStyle from '../css/default/navbar.css'
const config = require('../../config');

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header id="navbar">
          <div className="container">
            <div className="header-left">
              <h1><a href="/">newsFeed</a></h1>
            </div>
            <div className="header-right">
              <nav>
                <ul className="topnav">
                  <li><a href="/sources">Sources</a></li>
                  <li><a href="/settings">Settings</a></li>
                  <li><a href="#" onClick={this.props.actions.logout}>Logout</a></li>
                  <li><a href="#" onClick={this.props.actions.showAboutModal}>About</a></li>
                  {
                    this.props.modal.active && this.props.modal.type === actions.MODAL_ABOUT ?
                      <AboutModal
                        onClose={this.props.actions.hideModal}
                        show={this.props.modal.active} />
                      : null
                  }
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);