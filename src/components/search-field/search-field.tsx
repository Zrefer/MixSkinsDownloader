import { FC, KeyboardEventHandler } from 'react';
import { useNavigate } from 'react-router';

import styles from './search-field.module.css';

const SearchField: FC = function SearchField() {
  const navigate = useNavigate();

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code !== 'Enter') return;

    const { value } = event.currentTarget;
    if (value.length < 4 || value.length > 16) return;

    const regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(value)) return;

    navigate(`/user/${event.currentTarget.value}`);
  };

  return (
    <input
      type="text"
      className={styles.field}
      placeholder="Ник игрока"
      onKeyDown={handleKeyDown}
    />
  );
};
export default SearchField;
