import cls from './styles.module.scss';

const tmpl = `
  <div class='${cls.messageBubble} {{className}}'>
    <div class=${cls.message}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Repudiandae, quod, nesciunt fugiat veritatis quo labore 
      eligendi mollitia rem vitae, error exercitationem quas! 
      Voluptatem eum nam nesciunt odit illum possimus natus.
    </div>

    <div class=${cls.meta}>
      <div class=${cls.status}></div>
      <div class=${cls.timeCreated}>10:10</div>
    </div>
  </div>
`;

export default tmpl;
