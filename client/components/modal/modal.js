import React from 'react';

export default class Modal extends React.Component {
  onClose(e) {
    this.props.onClose && this.props.onClose(e);
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Modal Header</h2>
          </div>
          <div className="modal-body">
            <p>{this.props.modalText}</p>
          </div>
          <div className="modal-footer">
            <button onClick={(e) => { this.onClose(e) }}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }
}