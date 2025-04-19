import { Block } from '@/shared/services';
import { Input, InputProps } from '../Input';

import styles from './FieldInput.module.scss';
import { clsx } from '@/shared/utils';

interface FieldInputProps extends InputProps {
  label?: string;
  textError?: string;
  className?: string;
  autocomplete?: boolean;
  validator?: (value: string) => string;
  onValid?: (value: boolean) => void;
}

export type IFieldInput = FieldInputProps;

export class FieldInput extends Block<FieldInputProps> {
  constructor({ label, textError = '', className = '', onValid, validator, id, ...props }: FieldInputProps) {
    super({
      label,
      textError,
      htmlFor: id,
      className,
      validator,
      input: new Input({
        id,
        className: clsx(styles.input),
        onBlur: (event: FocusEvent) => {
          const { target } = event as unknown as { target: { value: string } };

          if (!validator) return;

          const error = validator(target.value);

          this.setProps({ textError: error });
          onValid?.(!error);

          props?.onBlur?.(event);
        },
        ...props,
      }),
    });
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { className, htmlFor } = this.props;

    return `
      <div class='${clsx(styles.fieldInput, className)}'>
        <label 
          ${htmlFor ? 'for={{ htmlFor }} ' : ''}
          class=${styles.label}
        >
          {{label}}
        </label>
        {{{input}}}
        <span class=${styles.error}>{{ textError }}</span>
      </div>
    `;
  }
}
