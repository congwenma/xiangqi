import moment from 'moment';
import tools from 'surgeonkit'

export default class GameStat {
  constructor(props) {
    this.game = props.chessgame;
    
    this.currentMoveStartTime = 
      this.startTime = 
        this.currentTime = this.getTime();

    this.calculations();

    this.tick(); 
    this.timer = null;
  } 

  resetClock() {
     this.currentMoveStartTime = 
      this.startTime = 
        this.currentTime = this.getTime();
  }

  get getTimer() {
    let total_secs = this.timeElapsed / 1000;
    let hrs = Math.round(total_secs / 3600)
    let mins = Math.round(total_secs / 60)
    let secs = Math.round(total_secs % 60)

    this.timer = `${tools.zeroPad(hrs)}:${tools.zeroPad(mins)}:${tools.zeroPad(secs)}`;
    return this.timer;
  }

  get getCurrentMoveTimer() {
    let total_secs = this.currentMoveTimeElapsed / 1000;
    let hrs = Math.round(total_secs / 3600)
    let mins = Math.round(total_secs / 60)
    let secs = Math.round(total_secs % 60)
    
    this.currentMoveTimer = `${tools.zeroPad(hrs)}:${tools.zeroPad(mins)}:${tools.zeroPad(secs)}`;
    return this.currentMoveTimer;
  }

  currentMoveTimerReset() {
    this.currentMoveStartTime = this.getTime();
  }

  // for mocking in jasmine
  tick() {
    this.killClock = setInterval(()=> {
      this.currentTime = this.getTime();
      this.calculations();
    }, 1000);
  }

  getTime() {
    return (new Date()).getTime();
  }

  calculations() {
    this.timeElapsed = this.currentTime - this.startTime
    this.currentMoveTimeElapsed = this.currentTime - this.currentMoveStartTime;    
  }
}