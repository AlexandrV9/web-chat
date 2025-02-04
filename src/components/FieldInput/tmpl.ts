import cls from './styles.module.scss';

const tmpl = `
  <div class='${cls.fieldInput} {{className}}'>
    {{{input}}}
    <label for={{htmlFor}}>{{label}}</label>
    <span class=${cls.inputError}>{{textError}}</span>
  </div>
`;

export default tmpl;
