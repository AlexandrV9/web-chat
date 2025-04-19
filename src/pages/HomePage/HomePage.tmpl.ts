import cls from './HomePage.module.scss';

const tmpl = `
  <div div class="page-content">
    {{{LeftPanel}}}
    {{{MessageFeed}}}
  </div>
`;

export default tmpl;

// <div class=${cls.main}>
// <div class=${cls.fallbackContainer}>
//   <p>Выберите чат чтобы отправить сообщение</p>
// </div>
// </div>
