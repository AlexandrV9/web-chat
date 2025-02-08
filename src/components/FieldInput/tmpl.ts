import cls from './styles.module.scss';

const tmpl = `
  <li class='${cls.fieldInput} {{className}}'>
    {{{input}}}
    <label for={{htmlFor}}>{{label}}</label>
    <span class=${cls.inputError}>{{textError}}</span>
  </li>
`;

export default tmpl;
