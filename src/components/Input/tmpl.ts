import cls from './styles.module.scss';

const tmpl = `
  <input 
    id={{id}}
    class='${cls.input} {{className}}'
    name={{name}}
    value={{value}}
    placeholder=" "
    type={{type}}
  />
`;

export default tmpl;
