import { ComponentPropsWithRef } from 'react';
import { Icon } from 'react-feather';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';

const active = 'grey-200';
const placeholderActive = 'grey-600';
const disabled = 'grey-700';
const error = 'red-500';
const placeholderError = 'red-900';

const LabelWrapper = styled.label`
  display: inline-block;
  position: relative;
  padding: 0;
  padding: 1rem 0;
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
  height: 1px;
  position: absolute;
  bottom: 1rem;
  left: 0;
  background-color: ${p => p.theme.color[active]};
`;

const ErrorMessage = styled.span`
  color: ${p => p.theme.color[error]};
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${p => p.theme.fontSizes.xs};
  font-size: ${p => p.theme.fontSizes.xs};
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
    bottom: 1.35rem;
    left: 0;
    color: ${p => p.theme.color[active]};
  }

  & ~ .textinput-icon-right {
    position: absolute;
    bottom: 1.35rem;
    right: 0;
    color: ${p => p.theme.color[active]};
  }

  &::placeholder {
    color: ${p => p.theme.color[placeholderActive]};
  }

  &:focus {
    & ~ ${Underline} {
      box-shadow: 0 0 0 0.4px white;
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
      color: ${p => p.theme.color[placeholderError]}
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

    & ~ ${ErrorMessage} {
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

export const TextInput = (props: TextInputProps) => {
  const { LeftIcon, RightIcon, fieldName, error } = props;

  return (
    <LabelWrapper>
      <_Input {...props} type='text' data-is-error={!!error} />
      <FieldName>{fieldName}</FieldName>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {LeftIcon && (
        <LeftIcon className='textinput-icon textinput-icon-left' size={16} />
      )}
      {RightIcon && (
        <RightIcon className='textinput-icon textinput-icon-right' size={16} />
      )}
      <Underline />
    </LabelWrapper>
  );
};
