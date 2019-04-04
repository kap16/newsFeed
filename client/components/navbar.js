// Importing Libraries
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Importing files
import * as actions from '../actions/index';
import AboutModal from '../components/modal/about.js'
import navbarStyle from '../styles/default/navbar.css'
const config = require('../../config');

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var styleHead ={
      textDecoration: "none",
      float: "left"
    }

    return (
      <div id="navbar">
        <h1 style={styleHead}><a href="/">newsFeed</a></h1>
        <label htmlFor="toggle"><img src="../img/menu-24.png" alt="Menu" /></label>
        <input type="checkbox" id="toggle" />
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