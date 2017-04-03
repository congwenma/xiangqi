import React from 'react';

var transformer = {
  powers: ['jump', 'shoot'],
  config: {height: 200, },
  isDecepticon: false,
}

class Control extends React.Component {
  render() {
    let value = this.props.model[this.props.attr];

    return (
      <label className="btn btn-primary">
        {this.props.label}
        <input type="checkbox" value={value} onChange={this.props.change} />
      </label>
    )
  }
}

class Transformer extends React.Component {
  render() {
    var m = this.props.model
    return (
      <div>
        Powers: {this.props.model.powers.join(', ')}
        Config: {JSON.stringify(this.props.model.config)}
        { this.props.model.isDecepticon && 
          <span>Mission: Kill all Autobots</span>
        }
      </div>
    )
  }
}

export default class TransformersApp extends React.Component {
  constructor() {
    super()
    this.state = {transformer: transformer};
  }

  render() {
    return (
      <div>
        <Control label='controls' 
          model={this.state.transformer} 
          attr='isDecepticon' 
          change={this.toggleDeception.bind(this)}/>

        <Transformer model={this.state.transformer}/>
      </div>
    )
  }

  toggleDeception() {
    this.state.transformer.isDecepticon = !this.state.transformer.isDecepticon;
    this.forceUpdate();
  }
}