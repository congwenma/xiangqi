import './AnalyzeLoader.css'
import React, { Component } from 'react';

const AnalyzeLoader = ({ toShow }) =>
  <div className={`analyze-loader ${toShow ? 'thinking' : ''}`}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>

export default AnalyzeLoader
