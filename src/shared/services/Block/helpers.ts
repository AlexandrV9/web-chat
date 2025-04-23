import { PlainObject } from '@/types';
import { Block, BlockProps, store, STORE_EVENTS } from '..';

export const isBlock = (value: unknown): value is Block => {
  return value instanceof Block;
};

export function connect(Component: typeof Block, mapStateToProps: (state: PlainObject) => PlainObject) {
  return class extends Component {
    constructor(props: BlockProps) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(STORE_EVENTS.updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
