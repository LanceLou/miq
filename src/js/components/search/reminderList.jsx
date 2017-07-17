/**
 * 搜索框提示remender组件
 */
import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Style from './index.scss';

const cx = classNames.bind(Style);

const RemenderList = (props) => {
  const reminderList = props.reminderList;
  const remindersClassName = cx({
    remenders: true,
  });
  return (
    <ul className={remindersClassName}>
      {reminderList.map(reminderItem => (
        <li key={reminderItem.id}>
          <button
            className={cx({ btn: true, remenderList_item: true, 'text-oneline_omit': true })}
            onClick={(ev) => { ev.stopPropagation(); props.selctReminderItem(reminderItem.text); }}
          >
            <span className={Style.clock} />
            { reminderItem.text }
            <span
              className={Style.close}
              onClick={(ev) => { ev.stopPropagation(); props.removeReminderItem(reminderItem.id); }}
              role="button"
              tabIndex={-5}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

RemenderList.propTypes = {
  reminderList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RemenderList;
