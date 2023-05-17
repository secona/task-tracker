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
      <div className='textinput__outer'>
        <div
          {...mc(
            {},
            'textinput',
            LeftIcon ? 'textinput--icon--left' : '',
            RightIcon ? 'textinput--icon--right' : ''
          )}
        >
          {LeftIcon && <LeftIcon size={16} color='var(--color-grey-300)' />}
          <input
            {...mc(
              otherProps,
              'textinput__input',
              error === undefined ? '' : 'textinput__input--error'
            )}
            ref={ref}
          />
          {RightIcon && <RightIcon size={16} color='var(--color-grey-300)' />}
          <fieldset className='textinput__fieldset'>
            {fieldName ? <legend>{fieldName}</legend> : ''}
          </fieldset>
        </div>
        {error !== undefined ? (
          <div className='textinput__error-list'>
            <ul>
              {error.message?.split('|').map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
);
