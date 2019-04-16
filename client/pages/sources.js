import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/index';
import EditSource from '../components/modal/editSource';
import Navbar from '../components/navbar';
import SourceItem from '../components/list/sourceItem';
import AddSource from '../components/modal/addSource';
const config = require('../../config');

export class Sources extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.renderSources = this.renderSources.bind(this);
  }

  componentDidMount() {
    this.props.actions.getSources();
  }

  renderSources(sources) {
    if (sources.length > 0) {
      return (
        <div>
          {
            this.props.modal.active && this.props.modal.type === actions.EDIT_SOURCE ?
              <EditSource
                onClose={this.props.actions.hideModal}
                onSave={this.props.actions.updateSource}
                show={this.props.modal.active} />
              : null
          }
          <table id="sources-table" className="table table-striped">
            <thead>
              <tr>
                <th>Source</th>
                <th>Added</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source, i) => (
                <SourceItem key={i} source={source} />
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <p className="no-result">There are no sources</p>
      );
    }
  }

  render() {
    var sources = this.props.sources; 
    return (
      <div className="main-body">
        <Navbar />
        {
          this.props.modal.active && this.props.modal.type === actions.ADD_SOURCE ?
            <AddSource
              onClose={this.props.actions.hideModal}
              onSave={this.props.actions.addSource}
              show={this.props.modal.active}
              />
            : null
        }
        <div>
          <button onClick={() => this.props.actions.showAddSourceModal()}>Add Source</button>
          {sources === null ? <p>Loading</p> : this.renderSources(sources)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Sources);

