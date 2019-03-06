// Importing Libraries
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Importing files
import * as actions from '../actions/index';
import Navbar from '../components/navbar';
const config = require('../../config');

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount() {
    this.props.actions.getItems();
  }

  renderItems(items) {
    if (items.length > 0) {
      return (
        <div>
          {items.map((item, i) => (
            <p key={i}>{item.title}</p>
          ))}
        </div>
      );
    } else {
      return (
        <p style={{ padding: "10px" }}>There are no news items available</p>
      );
    }
  }

  render() {
    return (
      <div className="main-body">
        <Navbar />
        <div className="left-side">
          <p style={{ padding: "10px" }}>Sidebar</p>
        </div>
        <div className="right-side">
          {this.props.items === null ? <p>Loading</p> : this.renderItems(this.props.items)}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);