import PropTypes from "prop-types";

export default function TextInput({ id, label, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="rounded bg-gray-800 text-gray-200"
      />
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
