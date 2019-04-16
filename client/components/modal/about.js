import React from 'react';

export default class AboutModal extends React.Component {
  onClose(e) {
    this.props.onClose && this.props.onClose(e);
  }

  render() {
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-header">
            <h2>About</h2>
          </div>
          <div className="modal-body">
            <p>Version: {VERSION}</p>
          </div>
          <div className="modal-footer">
            <button onClick={(e) => { this.onClose(e) }}>Close</button>
          </div>
        </div>
      </div>
    )
  }
}