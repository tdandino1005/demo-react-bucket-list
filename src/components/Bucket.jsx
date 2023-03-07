import PropTypes from "prop-types";
import Button from "./Button";

export default function Bucket({ bucket }) {
  return (
    <li
      className={`list-none space-x-2 ${bucket.isCompleted && "line-through"}`}
    >
      <span>{bucket.text}</span>
      <Button text="Edit" colorClass="bg-orange-500" />
      <Button text="🔥" colorClass="bg-red-500" />
    </li>
  );
}

Bucket.defaultProps = {
  bucket: {
    importance: 1,
    isCompleted: false,
  },
};

Bucket.propTypes = {
  bucket: PropTypes.exact({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    importance: PropTypes.number,
    isCompleted: PropTypes.bool,
  }),
};
