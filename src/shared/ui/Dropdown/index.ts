import { Block } from '@/shared/services';
import styles from './Dropdown.module.scss';
import { clsx } from '@/shared/utils';

interface DropdownProps {
  Content: Block | string;
  Trigger: Block;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  closeOnClickOutside?: boolean;
  isOpen?: boolean;
}

export class Dropdown extends Block<DropdownProps> {
  constructor(props: DropdownProps) {
    super({
      ...props,
      isOpen: props.isOpen || false,
      position: props.position || 'bottom',
      closeOnClickOutside: props.closeOnClickOutside !== false,
    });

    this._handleDocumentClick = this._handleDocumentClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentDidMount() {
    this._addEventListeners();
  }

  componentDidUpdate(oldProps: DropdownProps, newProps: DropdownProps) {
    if (oldProps.isOpen !== newProps.isOpen) {
      this._toggleEventListeners(newProps.isOpen || false);
    }
    return true;
  }

  private _addEventListeners() {
    if (this.props.isOpen) {
      document.addEventListener('click', this._handleDocumentClick);
      document.addEventListener('keydown', this._handleKeyDown);
    }
  }

  private _removeEventListeners() {
    document.removeEventListener('click', this._handleDocumentClick);
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  private _toggleEventListeners(isOpen: boolean) {
    if (isOpen) {
      this._addEventListeners();
    } else {
      this._removeEventListeners();
    }
  }

  private _handleDocumentClick(e: MouseEvent) {
    if (!this.props.closeOnClickOutside) return;

    const target = e.target as HTMLElement;
    const dropdownElement = this.getContent();

    if (dropdownElement && !dropdownElement.contains(target)) {
      this.setProps({ isOpen: false });
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.props.isOpen) {
      this.setProps({ isOpen: false });
    }
  }

  private _toggleDropdown() {
    this.setProps({ isOpen: !this.props.isOpen });
  }

  render() {
    const { className, position = 'bottom', isOpen, Trigger } = this.props;

    Trigger.setProps({
      events: {
        click: (e: Event) => {
          e.stopPropagation();
          this._toggleDropdown();
        },
      },
    });

    return `
      <div class="${clsx(styles.root, className)}">
       {{{ Trigger }}}
        <div class="${clsx(styles.container, styles[position], { [styles.open]: isOpen })}">
          {{{ Content }}}
        </div>
      </div>
    `;
  }
}
