import cls from './styles.module.scss';

const tmpl = `
  <input 
    id={{id}}
    class='${cls.input} {{className}}'
    value='{{value}}'
    name={{name}}
    placeholder=" "
    type={{type}}
    autocomplete={{autocomplete}}
  />
`;

export default tmpl;
