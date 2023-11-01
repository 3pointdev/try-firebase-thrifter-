import PropTypes from "prop-types";
import { ChangeEventHandler, useCallback, useEffect, useRef } from "react";
import styles from "./multiRangeSlider.module.css";

interface IProps {
  onChange: ChangeEventHandler;
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
}

function MultiRangeSlider({ min, max, minValue, maxValue, onChange }: IProps) {
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);
    console.log(minPercent, maxPercent);
    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxValue, getPercent]);

  return (
    <div className={styles.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        onChange={onChange}
        id={"min"}
        className={`${styles.thumb} ${styles.thumb_left}`}
        style={{ zIndex: minValue > max - 100 ? "5" : "" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        onChange={onChange}
        id={"max"}
        className={`${styles.thumb} ${styles.thumb_right}`}
      />

      <div className={styles.slider}>
        <div className={styles.slider__track} />
        <div ref={range} className={styles.slider__range} />
        <div className={styles.slider__left_value}>
          <input
            value={minValue}
            min={min}
            max={max}
            style={{
              width: "60px",
              height: "25px",
              border: "1px solid gray",
              borderRadius: "4px",
              textAlign: "center",
            }}
          />
        </div>
        <div className={styles.slider__right_value}>
          <input
            value={maxValue}
            min={min - 1}
            max={max}
            style={{
              width: "60px",
              height: "25px",
              border: "1px solid gray",
              borderRadius: "4px",
              textAlign: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
}

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
