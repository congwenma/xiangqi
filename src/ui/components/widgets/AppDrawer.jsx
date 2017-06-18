import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

// icons
import DehazeIcon from 'material-ui/svg-icons/image/dehaze'
import RestartIcon from 'material-ui/svg-icons/action/settings-backup-restore'

// my
import Timer from './Timer';
// import Toggler from '../commons/Toggler'
import TogglerCard from '../commons/TogglerCard'

// Turn of
import {Card, CardHeader, CardText} from 'material-ui/Card';
import theme from '../../../theme'

import AnalyzeLoader from './AnalyzeLoader'

const Title = () =>
  <div>
    <h1 className="kaiti inline mr2 p1"
      style={{
        border: '1px outset white',
        boxShadow: 'white 2px 1px 1px'
      }}
    >象</h1>
    {/*TODO: come up with a good name for this*/}
    <h4 className="inline-block pl2">Chess.CN</h4>
  </div>


export default class AppDrawer extends React.Component {
  render() {
    const {
      onTouchTap, isOpen, className, isToggleable, chessgame, onAppUpdate
    } = this.props
    const { faction: playerFaction } = this.props.chessgame.activePlayer;
    const { primary1Color, accent1Color } = theme.palette

    return (
      <div className={className}>
        { isToggleable &&
          <RaisedButton label={<DehazeIcon />}
            onTouchTap={isToggleable && onTouchTap}
            className="zmid"
            style={{ marginLeft: 160 }}
          />
        }

        <Drawer open={isOpen}
          containerStyle={{zIndex: 0}}
          className="zmin"
        >
          <div className="p2"></div>
          <div className="px3"> <Title /> </div>
          <div className="px3 menu" style={{ paddingTop: 30 }}>
            <TogglerCard
              callback={onAppUpdate}
              model={this.props.chessgame.config}
              attr='svgAvatar'
            />
            <Card className="center my3"
              style={{ background: theme.palette.clockCircleColor }}
            >
              <CardHeader title="Turn of"
                textStyle={{ paddingRight: 0 }}
                style={{
                  background: theme.palette.clockCircleColor
                }}
              />
              <CardText className="mx-auto">
                <p style={{ color: playerFaction === 'red' ? accent1Color : primary1Color }}>{playerFaction === 'red' ? 'Player' : 'Computer'}</p>
                <AnalyzeLoader
                  style={{ background: playerFaction === 'red' ? accent1Color : theme.palette.primary1Color}}
                  toShow={playerFaction === 'black'}
                />
              </CardText>
            </Card>

            <Timer stat={this.props.chessgame.stat} className="pb3"/>
            <div className="pt1">
              <RaisedButton
                primary={true}
                fullWidth
                onClick={(...args) => this.props.chessgame.reset(...args)}
              >
                Reset <RestartIcon className="ml1" style={{ marginBottom: -7 }}/>
              </RaisedButton>

              { false &&
                <button className="btn" onClick={()=> {}}>Undo</button>
              }
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}