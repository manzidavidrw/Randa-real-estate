import React from "react";
import PlotCard from "./PlotCard";
import styles from "./PlotList.module.css";

const PlotList = ({ plots, displayAsList }) => {
  return (
    <div className={`${styles.list} ${displayAsList ? styles.listView : ''}`}>
      {plots.map((plot, index) => (
        <PlotCard key={index} plot={plot} displayAsList={displayAsList} />
      ))}
    </div>
  );
};

export default PlotList;
