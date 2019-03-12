// Importing Libraries
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Importing files
import * as actions from '../actions/index';
import FilterFeed from '../components/modal/filterFeed';
import FeedItem from '../components/list/feedItem';
import Navbar from '../components/navbar';
const config = require('../../config');

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

    this.renderItems = this.renderItems.bind(this);
    this.renderMoreOptions = this.renderMoreOptions.bind(this);
  }

  componentDidMount() {
    this.props.actions.getItems();
    this.props.actions.getSources();
  }

  renderItems(items) {
    if (items.length > 0) {
      return (
        <div className="container">
          {items.map((item, i) => (
            <FeedItem key={i} item={item} />
          ))}
        </div>
      );
    } else {
      return (
        <p style={{ padding: "10px" }}>There are no news items available</p>
      );
    }
  }

  renderMoreOptions(items) {
    if (items.length > 1) {
      return (
        <button onClick={() => this.props.actions.showFilterFeedModal()}>Filter</button>
      );
    }
  }

  render() {
    return (
      <div className="main-body">
        <Navbar />
        {
          this.props.modal.active && this.props.modal.type === actions.FILTER_FEED ?
            <FilterFeed
              onClose={this.props.actions.hideModal}
              show={this.props.modal.active} />
            : null
        }
        <div id="feeds" className="right-side" style={{ padding: "10px" }} >
          {this.props.sources === null ? null : this.renderMoreOptions(this.props.sources)}
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