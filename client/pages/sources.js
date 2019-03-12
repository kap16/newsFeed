import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/index';
import EditSource from '../components/modal/editSource';
import Navbar from '../components/navbar';
import SourceItem from '../components/list/sourceItem';
import AddSource from '../components/modal/addSource';
const config = require('../../config');

class Sources extends React.Component {
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
          <table id="sources" className="table table-striped">
            <thead>
              <tr>
                <th>Check</th>
                <th>Source</th>
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
    return (
      <div>
        <Navbar />
        {
          this.props.modal.active && this.props.modal.type === actions.ADD_SOURCE ?
            <AddSource
              onClose={this.props.actions.hideModal}
              show={this.props.modal.active} />
            : null
        }
        <div style={{ paddingTop: "50px"}}>
          <button onClick={() => this.props.actions.showAddSourceModal()}>Add Source</button>
          {this.props.sources === null ? <p>Loading</p> : this.renderSources(this.props.sources)}
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

