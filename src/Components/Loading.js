// src/components/Loading.js
import React from 'react';
import './styles.css';
import loaderIcon from '../assets/Icon.png';

export default function Loading() {
  return (
    <div className="loading-container">
      <img src={loaderIcon} alt="Loading…" className="loader-img" />
      <p>Getting your store assistant ready…</p>
    </div>
  );
}
