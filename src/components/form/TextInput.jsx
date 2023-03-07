import PropTypes from "prop-types";

export default function TextInput({ id, label }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} />
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
