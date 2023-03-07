import PropTypes from "prop-types";

// Uncontrolled component
export default function Slider({ id, label, min, max }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type="range" min={min} max={max} id={id} />
    </div>
  );
}

Slider.defaultProps = {
  min: 0,
};

Slider.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number.isRequired,
};
