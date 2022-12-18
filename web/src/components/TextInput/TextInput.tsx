import { ComponentPropsWithRef, forwardRef } from 'react';
import { Icon } from 'react-feather';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';

const active = 'grey-400';
const disabled = 'grey-700';
const placeholderColor = 'grey-600';
const error = 'red-500';
const placeholderError = 'red-900';

const LabelWrapper = styled.label`
  display: inline-block;
  position: relative;
  padding: 0;
  padding: 1rem 0 0 0;
  min-height: 3.1rem;
`;

const FieldName = styled.span`
  font-size: ${p => p.theme.fontSizes.xs};
  color: ${p => p.theme.color[active]};
  position: absolute;
  top: 0;
  left: 0;
`;

const Underline = styled.span`
  width: 100%;
  height: 0.5px;
  position: absolute;
  top: 2.6rem;
  left: 0;
  background-color: ${p => p.theme.color[active]};
`;

const ErrorList = styled.ul`
  display: inline-block;
  color: ${p => p.theme.color[error]};
  padding: 0;
  margin: 0;
  margin-top: 4px;
  font-size: ${p => p.theme.fontSizes.xs};
  overflow: auto;
  list-style-position: inside;
`;

const _Input = styled.input<{
  LeftIcon?: Icon;
  RightIcon?: Icon;
}>`
  outline: none;
  box-sizing: border-box;
  width: 100%;
  border: none;
  padding: 0.25rem 0;
  background-color: transparent;
  color: white;
  font-family: inherit;
  ${p => p.LeftIcon && `padding-left: 1.25rem;`}
  ${p => p.RightIcon && `padding-right: 1.25rem;`}

  & ~ .textinput-icon-left {
    position: absolute;
    top: 1.25rem;
    left: 0;
    color: ${p => p.theme.color[active]};
  }

  & ~ .textinput-icon-right {
    position: absolute;
    top: 1.25rem;
    right: 0;
    color: ${p => p.theme.color[active]};
  }

  &::placeholder {
    color: ${p => p.theme.color[placeholderColor]};
  }

  &:focus {
    & ~ ${Underline} {
      box-shadow: 0 0 0 0.3px white;
      background-color: white;
    }
  }

  &[data-is-error='true'] {
    border-color: ${p => p.theme.color[error]};

    & ~ .textinput-icon {
      color: ${p => p.theme.color[error]};
    }

    & ~ ${Underline} {
      background-color: ${p => p.theme.color[error]};
    }

    & ~ ${FieldName} {
      color: ${p => p.theme.color[error]};
    }

    &::placeholder {
      color: ${p => p.theme.color[placeholderError]};
    }

    &:focus {
      border-color: ${p => p.theme.color[error]};

      & ~ ${Underline} {
        box-shadow: 0 0 0 0.4px ${p => p.theme.color[error]};
      }
    }
  }

  &:disabled {
    & ~ .textinput-icon {
      color: ${p => p.theme.color[disabled]};
    }

    & ~ ${Underline} {
      background-color: ${p => p.theme.color[disabled]};
    }

    & ~ ${FieldName} {
      color: ${p => p.theme.color[disabled]};
    }

    & ~ ${ErrorList} {
      color: ${p => p.theme.color[disabled]};
    }

    &::placeholder {
      color: ${p => p.theme.color[disabled]};
    }
  }
`;

export interface TextInputProps extends ComponentPropsWithRef<'input'> {
  LeftIcon?: Icon;
  RightIcon?: Icon;
  fieldName?: string;
  error?: FieldError;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { LeftIcon, RightIcon, fieldName, error } = props;

    return (
      <LabelWrapper>
        <_Input {...props} ref={ref} data-is-error={!!error} />
        <FieldName>{fieldName}</FieldName>
        <Underline />
        {error && (
          <ErrorList>
            {error.message?.split('|').map(v => (
              <li>{v}</li>
            ))}
          </ErrorList>
        )}
        {LeftIcon && (
          <LeftIcon className='textinput-icon textinput-icon-left' size={16} />
        )}
        {RightIcon && (
          <RightIcon
            className='textinput-icon textinput-icon-right'
            size={16}
          />
        )}
      </LabelWrapper>
    );
  }
);
