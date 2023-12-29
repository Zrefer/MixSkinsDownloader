import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router';

import UsersRespose from '../../types/api';
import { getUsers } from '../../utils/api';

import styles from './search-field.module.css';

const SearchField: FC = function SearchField() {
  const navigate = useNavigate();

  const { username } = useParams();
  const [value, setValue] = useState(username);

  const [usersResponse, setUsersResponse] = useState<UsersRespose>();
  const updateUsers = useCallback((search: string) => {
    getUsers(search)
      .then((response) => setUsersResponse(response))
      .catch(() => setUsersResponse(undefined));
  }, []);

  const [dropdown, showDropdown] = useState(false);
  const filteredUsers = useMemo(() => {
    if (!usersResponse) return [];
    if (!value || value.length < 2) return [];

    const users = usersResponse.results;
    const result = users.filter((user) =>
      user.toLowerCase().startsWith(value.toLowerCase()),
    );
    users.forEach((user) => {
      if (result.includes(user)) return;

      const userClean = user.toLowerCase().replace('-', '').replace('_', '');
      if (userClean.startsWith(value.toLowerCase())) result.push(user);
    });
    users.forEach((user) => {
      if (result.includes(user)) return;

      const userClean = user.toLowerCase().replace('-', '').replace('_', '');
      if (userClean.includes(value.toLowerCase())) result.push(user);
    });
    if (result.length === 1 && result[0] === value) return [];

    return result.slice(0, 20);
  }, [usersResponse, value]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const curVal = event.currentTarget.value;
    if (curVal.length >= 2) {
      if (
        (value && curVal.length - value.length <= 0) ||
        curVal.length === 2 ||
        usersResponse?.next
      ) {
        updateUsers(curVal);
      }
    }
    setValue(curVal);
  };

  const handleInputEnter: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (!value || event.code !== 'Enter') return;
    if (value.length < 4 || value.length > 16) return;

    const regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(value)) return;

    navigate(`/user/${event.currentTarget.value}`);
  };

  const handleBlur: FocusEventHandler = (event) => {
    const target = event.relatedTarget;
    if (target) {
      if (target.classList.contains(styles.dropDownItemBtn)) return;
      if (target.classList.contains(styles.field)) return;
    }
    showDropdown(false);
  };

  const handleArrowsSelect: KeyboardEventHandler = (event) => {
    if (event.code !== 'ArrowDown' && event.code !== 'ArrowUp') return;
    event.preventDefault();

    const target = event.target as HTMLElement;
    if (target.classList.contains(styles.field)) {
      const li = document.querySelector(
        `.${CSS.escape(styles.dropDownItem)}:${
          event.code === 'ArrowDown' ? 'first-child' : 'last-child'
        }`,
      ) as HTMLElement;
      if (!li) return;

      const btn = li.querySelector(
        `.${CSS.escape(styles.dropDownItemBtn)}`,
      ) as HTMLElement;
      if (btn) btn.focus();
    } else if (target.classList.contains(styles.dropDownItemBtn)) {
      const index = filteredUsers.indexOf((target as HTMLInputElement).value);
      if (index === -1) return;

      const newIndex = index + (event.code === 'ArrowDown' ? 1 : -1);
      if (newIndex >= filteredUsers.length || newIndex < 0) {
        const field = document.querySelector(
          `.${CSS.escape(styles.field)}`,
        ) as HTMLElement;
        if (field) field.focus();
        return;
      }

      const li = document.querySelector(
        `.${CSS.escape(styles.dropDownItem)}:nth-child(${newIndex + 1})`,
      ) as HTMLElement;
      if (!li) return;

      const btn = li.querySelector(
        `.${CSS.escape(styles.dropDownItemBtn)}`,
      ) as HTMLElement;
      if (btn) btn.focus();
    }
  };

  const handleItemClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const itemValue = event.currentTarget.value;
    setValue(itemValue);
    navigate(`/user/${itemValue}`);
    event.currentTarget.blur();
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.field}
        placeholder="Ник игрока"
        value={value || ''}
        onChange={handleChange}
        onKeyDown={(event) => {
          handleInputEnter(event);
          handleArrowsSelect(event);
        }}
        onFocus={() => showDropdown(true)}
        onBlur={handleBlur}
      />
      {filteredUsers.length > 0 && dropdown && (
        <ul className={styles.dropDown}>
          {filteredUsers.map((user) => (
            <li className={styles.dropDownItem} key={user}>
              <button
                type="button"
                className={styles.dropDownItemBtn}
                value={user}
                onBlur={handleBlur}
                onClick={handleItemClick}
                onKeyDown={handleArrowsSelect}
              >
                {user}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchField;
