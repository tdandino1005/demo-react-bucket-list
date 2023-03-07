import PropTypes from "prop-types";

// Uncontrolled component
export default function Slider({ id, label, min, max }) {
  return (
    <div className="flex items-center">
      <label htmlFor={id} className="mr-2">
        {label}
      </label>
      <input type="range" min={min} max={max} id={id} defaultValue={min} />
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
