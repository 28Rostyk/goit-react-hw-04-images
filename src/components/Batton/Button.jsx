import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ title, loadMore }) => (
  <button className={css.Button} onClick={loadMore} type="button">
    {title}
  </button>
);

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
