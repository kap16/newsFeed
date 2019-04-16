import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
const config = require('../../../config');

class EditSource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.modal.data._id,
      title: this.props.modal.data.title,
      link: this.props.modal.data.link,
      desc: this.props.modal.data.desc,

      errors: {
        title: false,
        link: false,
        desc: false
      },
    };

    this.validate = this.validate.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(e) {
    this.props.onClose && this.props.onClose(e);
  }

  onEdit(e) {
    if (!this.canSubmit()) {
      e.preventDefault();
      console.log("Field errors")
    } else {  
      var data = {
        title: this.state.title,
        link: this.state.link,
        desc: this.state.desc,
        id: this.state.id
      }
      this.props.onSave(data);
    }
  }

  onTitleFieldChange(e) {
    this.setState({ title: e.target.value });
  }

  onLinkFieldChange(e) {
    this.setState({ link: e.target.value });
  }

  onDescFieldChange(e) {
    this.setState({ desc: e.target.value });
  }

  validate(title, link) {
    // true means invalid, so our conditions got reversed
    return {
      title: title.length === 0,
      link: link.length === 0,
    };
  }

  canSubmit() {
    const errors = this.validate(this.state.title, this.state.link)
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !(errors & isDisabled);
  }

  render() {
    const errors = this.validate(this.state.title, this.state.link)
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Edit Source</h2>
          </div>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Title"
              className={errors.title ? "error" : ""}
              value={this.state.title}
              onChange={(e) => this.onTitleFieldChange(e)} /><br /><br />
            <input
              type="text"
              className={errors.link ? "error" : ""}
              placeholder="URL"
              value={this.state.link}
              onChange={(e) => this.onLinkFieldChange(e)} />
            <div>
              <textarea rows="4"
                placeholder="Description (Optional)"
                value={this.state.desc}
                onChange={(e) => this.onDescFieldChange(e)} />
            </div>
          </div>
          <div className="modal-footer">
            <button
              disabled={isDisabled}
              onClick={(e) => { this.onEdit(e) }}>
              Save
            </button>
            <button onClick={this.closeModal}>
              Close
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditSource);