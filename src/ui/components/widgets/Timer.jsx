import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super()
    this.state = {
      timer: props.stat.getTimer
    }
  }

  componentDidMount(){
    window.setInterval(function () {
      this.setState({timer: this.props.stat.getTimer})
    }.bind(this), 1000);
  }

  render() {
    return <div className={`timer ${this.props.className} text-center`}>
      <button className="btn btn-primary"> {this.state.timer} </button>
    </div>
  }
}


export default Timer;
