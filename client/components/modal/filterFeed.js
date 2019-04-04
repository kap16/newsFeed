import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions/index.js';
import style from '../../styles/default/modal.css';
import SourceItem from '../../components/list/sourceItem';
const config = require('../../../config');

class FilterFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
 
    };

    this.renderSources = this.renderSources.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(e) {
    this.props.onClose && this.props.onClose(e);
  }

  onSubmit(e) {
    
  }

  componentDidMount() {
    this.props.actions.getSources();
  }

  renderSources(sources) {
    if (sources.length > 0) {
      return (
        <div>
          <table className="filter-modal table table-striped">
            <thead>
              <tr>
                <th>Check</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source, i) => (
                <SourceItem displayOn="home" key={i} source={source} />
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <p className="filter-modal no-result">There are no sources</p>
      );
    }
  }

  render() {
    return (
      <div className="modal-backdrop">
        <div className="filterFeedModal-content">
          <div className="modal-header">
            <h2>Filter news feed</h2>
          </div>
          <div className="modal-body">
            {this.props.sources === null ? <p>Loading</p> : this.renderSources(this.props.sources)}
          </div>
          <div className="modal-footer">
            <button onClick={(e) => { this.Submit(e) }}>Add</button>
            <button onClick={this.closeModal}>Close</button>
          </div>
        </div>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterFeed);