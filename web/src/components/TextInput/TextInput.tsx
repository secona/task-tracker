import { ComponentPropsWithRef, forwardRef } from 'react';
import { Icon } from 'react-feather';
import { FieldError } from 'react-hook-form';
import { mc } from '../../utils/mergeClassnames';

import textInputCN from './TextInput.module.scss';

export interface TextInputProps extends ComponentPropsWithRef<'input'> {
  LeftIcon?: Icon;
  RightIcon?: Icon;
  fieldName?: string;
  error?: FieldError;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { LeftIcon, RightIcon, fieldName, error, ...otherProps } = props;

    return (
      <div className={textInputCN.outer}>
        <div
          {...mc(
            {},
            textInputCN.textInput,
            LeftIcon ? textInputCN.textInput_iconLeft : '',
            RightIcon ? textInputCN.textInput_iconRight : ''
          )}
        >
          {LeftIcon && <LeftIcon size={16} color='var(--color-grey-300)' />}
          <input
            {...mc(
              otherProps,
              textInputCN.input,
              error && textInputCN.input_error
            )}
            ref={ref}
          />
          {RightIcon && <RightIcon size={16} color='var(--color-grey-300)' />}
          <fieldset className={textInputCN.fieldset}>
            {fieldName ? <legend>{fieldName}</legend> : ''}
          </fieldset>
        </div>
        {error && (
          <div className={textInputCN.errorList}>
            <ul>
              {error.message?.split('|').map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);
