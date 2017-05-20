import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


const noop = () => {}

let dialogInstance = null

export default class DialogExampleAlert extends React.Component {
  constructor(props) {
    super(props)
    dialogInstance = this
    this.state = { open: false };
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  render() {
    const { 
      cancelText = 'Cancel', 
      confirmText = 'Confirm', 
      confirmCallback = noop, 
      mainText = 'Are you sure?',
    } = this.state
    const actions = [
      <FlatButton
        label={cancelText}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={confirmText}
        primary={true}
        onTouchTap={() => {
          confirmCallback()
          this.handleClose()
        }}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {mainText}
      </Dialog>
    );
  }
}

window.dialog = ({ 
  confirmText, 
  cancelText,
  mainText,
  confirmCallback,
} = {}) => {
  dialogInstance.setState({
    open: true,
    confirmText,
    cancelText,
    mainText,
    confirmCallback
  })
}