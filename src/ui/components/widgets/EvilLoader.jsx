import './EvilLoader.scss'
import React, { Component } from 'react';

const EvilLoader = () =>
  <div className="evil-loader">
    <div className="circ">
      <div className="hands"></div>
      <div className="body"></div>
      <div className="head">
        <div className="eye"></div>
      </div>
    </div>
  </div>

export default EvilLoader
