import React from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import theme from '../../../theme'

export default class Toggler extends React.Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false };
  }

  handleToggle = (event, toggle) => {
    const { model, attr, callback } = this.props
    model[attr] = !model[attr]
    this.forceUpdate()
    callback()
  }

  render() {
    const { model, attr } = this.props
    return <Card 
      className="center" 
      style={{ background: theme.palette.clockCircleColor }}
    >
      <CardHeader title="Graphic Avatar" 
        textStyle={{ paddingRight: 0 }} 
        style={{ background: theme.palette.clockCircleColor }}
      />
      <CardText style={{ width: 80 }} className="mx-auto">
        <Toggle
          toggled={model[attr]}
          onToggle={this.handleToggle}
        />
      </CardText>
    </Card>
  }
}