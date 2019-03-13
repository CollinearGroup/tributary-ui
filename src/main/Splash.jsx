import React from 'react';
import logo from '../assets/tributary-logo-vertical.svg';
import timeSeriesIcon from '../assets/time-series.png';
import apiIcon from '../assets/api.png';
import apiPortalIcon from '../assets/api-portal.png';
import collinearLogo from '../assets/CollinearDataLogo.png';

export const Splash = () => {
  return (
    <div className="splash-container">
      <img className="vertical-logo" alt="vertical Tributary logo" src={logo} />
      <h3 className="tagline">Data Visualizer &amp; Curated API Portal</h3>
      <div className="details-container">
        <div className="detail-card">
          <img
            className="detail-card-icon"
            alt="time series icon"
            src={timeSeriesIcon}
          />
          <h4 className="detail-card-header">visualize time series</h4>
          <p className="detail-card-text">
            Quickly and easily visualize different sets of time series data
          </p>
        </div>
        <div className="detail-card">
          <img className="detail-card-icon" alt="api icon" src={apiIcon} />
          <h4 className="detail-card-header">connect your own api</h4>
          <p className="detail-card-text">
            Hook up your own API to analyze trends and relationships in the data
          </p>
        </div>
        <div className="detail-card">
          <img
            className="detail-card-icon"
            alt="API portal icon"
            src={apiPortalIcon}
          />
          <h4 className="detail-card-header">explore our catalog</h4>
          <p className="detail-card-text">
            Choose from our curated selection of APIs to find correlations
          </p>
        </div>
      </div>
      <p className="starter-text">Select a datasource to get started</p>
      <div className="attribution-container">
        <p className="attribution-text">Developed by</p>
        <a
          href="https://www.collineargroup.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            className="attribution-logo"
            alt="Collinear logo"
            src={collinearLogo}
          />
        </a>
      </div>
    </div>
  );
};
