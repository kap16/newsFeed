import React from 'react';
import PropTypes from 'prop-types';
import style from '../../css/default/modal.css';
const config = require('../../../config');

export default class EditSource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.sItem.title,
      link: this.props.sItem.link,
      desc: this.props.sItem.desc,
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
      var url = config.server.url + "/source/" + this.props.sItem._id
      var data = {
        "title": this.state.title,
        "link": this.state.link,
        "desc": this.state.desc
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Authorization": sessionStorage.getItem(config.sessionId),
          "Content-Length": Buffer.byteLength(data),
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(function (res) {
          console.log("Source was saved");
        })
        .then(this.closeModal)
        .catch(function (e) {
          console.log(e);
        });
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
