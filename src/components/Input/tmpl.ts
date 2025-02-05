import cls from './styles.module.scss';

const tmpl = `
  <input 
  id={{id}}
  class='${cls.input} {{className}}'
  value='{{value}}'
  name={{name}}
  placeholder=" "
  type={{type}}
  />
`;

export default tmpl;
