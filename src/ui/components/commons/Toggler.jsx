import React from 'react';
import './Toggler.css'

class Toggler extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    window.Toggler = this;
    let value = this.props.model[this.props.attr];

    return (
      <div className="toggler">
        <div className="panel panel-default">
          <div className="panel-heading">{this.props.label}</div>
          <div className="panel-body">
            <label className="toggle block">
              <input type="checkbox"
                value={value}
                defaultChecked={value}
                onChange={this.handleChange.bind(this)}
              />
              <div className="toggle_shape"></div>
            </label>
          </div>
        </div>
      </div>
    )
  }

  handleChange() {
    this.props.model[this.props.attr] = !this.props.model[this.props.attr];
    this.forceUpdate()
    this.props.callback();
  }
}

export default Toggler;
