import styles from './UserItem.module.scss';

export const tmpl = `
  <li class=${styles.item}>
    {{{ Text }}}
    {{{ ActionButton }}}
  </li> 
`;
