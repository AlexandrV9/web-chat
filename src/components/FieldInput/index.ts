import { Block } from '../../services/Block';
import { Input, InputProps } from '../Input';

import tmpl from './tmpl';

interface FieldInputProps extends InputProps {
  label?: string;
  textError?: string; 
  className?: string;
}

export type IFieldInput = FieldInputProps;

export class FieldInput extends Block {
  constructor({ label, textError = '', className = '', ...otherProps }: FieldInputProps) {
    super({
      label,
      textError,
      htmlFor: otherProps.id,
      className,
      input: new Input(otherProps),
    });
  }
  
  render() {
    return tmpl;
  }
}
