import { Block } from '..';

interface TestButtonProps {
  type?: 'submit' | 'button';
  text?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}
class TestButton extends Block<TestButtonProps> {
  constructor({ type = 'button', text = '', disabled = false, onClick }: TestButtonProps) {
    super({
      type,
      text,
      disabled,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <button 
        id='test-block' 
        type='{{ type }}' 
        ${this.props.disabled ? 'disabled' : ''}
      >
        {{ text }}
      </button>
    `;
  }
}

describe('Block', () => {
  it('check correct render markup', () => {
    const text = 'next';
    const buttonElement = new TestButton({ text }).getContent();

    expect(buttonElement?.textContent?.trim()).toEqual(text);
  });

  it('check getProps', () => {
    const text = 'next';
    const Button = new TestButton({ text });

    expect(Button.getPropValue('text')).toEqual(text);
  });

  it('check setProps', () => {
    let text = 'next';
    const Button = new TestButton({ text });

    text = 'prev';
    Button.setProps({ text });

    expect(Button.getPropValue('text')).toEqual(text);
  });

  it('check hide', () => {
    const Button = new TestButton({ text: 'next' });

    Button.hide();

    expect(Button.getContent()?.classList.contains('hide')).toEqual(true);
  });

  it('check show', () => {
    const Button = new TestButton({ text: 'next' });

    Button.hide();
    Button.show();

    expect(Button.getContent()?.classList.contains('hide')).toEqual(false);
  });

  it('check correct react to an event', () => {
    const mockClickHandler = jest.fn();

    const buttonElement = new TestButton({
      text: 'test',
      onClick: mockClickHandler(),
    }).getContent();

    buttonElement?.click();

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
