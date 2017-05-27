import './Timer.css'
import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar'
import SvgIconFace from 'material-ui/svg-icons/action/face';
import SvgIconWatchLater from 'material-ui/svg-icons/action/watch-later';
import CircularProgress from 'material-ui/CircularProgress'

import theme from '../../../theme'

const SIZE = 65

class Timer extends React.Component {
  constructor(props) {
    super()
    this.state = { timer: props.stat.getTimer }
  }

  componentDidMount = () => 
    window.setInterval(
      () => this.setState({ timer: this.props.stat.getTimer }), 
      1000
    )

  render() {
    const { className } = this.props
    return <div className={`Timer ${className}`}>
      <Chip className="align-middle" style={{ borderRadius: 50 }}>
        <Avatar
          style={{ width: SIZE, height: SIZE }} 
          color={theme.palette.primary1Color}
          backgroundColor={theme.palette.clockCircleColor}
          icon={ <SvgIconWatchLater style={{ width: SIZE, height: SIZE }} /> } 
        />
        <h3 className="p2 m0" > {this.state.timer} </h3> 
      </Chip>
    </div>
  }
}

export default Timer;
