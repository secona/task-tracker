import { mc } from '../../utils/mergeClassnames';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { Icon } from 'react-feather';
import { FieldError } from 'react-hook-form';

import './TextInput.scss';

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
      <label className='textinput textinput__label'>
        <input
          {...mc(
            otherProps,
            'textinput__input',
            !!error && 'textinput__input--error',
            !!LeftIcon && 'textinput__input--icon--left',
            !!RightIcon && 'textinput__input--icon--right'
          )}
          ref={ref}
        />
        <span className='textinput__fieldname'>{fieldName}</span>
        <span className='textinput__underline' />
        {error && (
          <ul className='textinput__error-list'>
            {error.message?.split('|').map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        )}
        {LeftIcon && (
          <LeftIcon
            className='textinput__icon textinput__icon--left'
            size={16}
          />
        )}
        {RightIcon && (
          <RightIcon
            className='textinput__icon textinput__icon--right'
            size={16}
          />
        )}
      </label>
    );
  }
);
