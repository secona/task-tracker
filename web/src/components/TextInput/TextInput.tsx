import { ComponentPropsWithRef } from 'react';
import { Icon } from 'react-feather';
import styled from 'styled-components';

const inactiveColor = 'rgba(255, 255, 255, 0.16)';
const activeColor = '#ffffff';
const placeholderColor = 'rgba(255, 255, 255, 0.36)';

const LabelWrapper = styled.label`
  display: inline-block;
  position: relative;
  padding: 0;
`;

const FieldName = styled.span`
  font-size: ${p => p.theme.fontSizes.xs};
  color: ${p => p.theme.color.grey};
`;

const _Input = styled.input<{
  LeftIcon?: Icon;
  RightIcon?: Icon;
}>`
  outline: none;
  box-sizing: border-box;
  width: 100%;
  border-width: 0 0 1px 0;
  border-color: ${inactiveColor};
  padding: 0.25rem 0;
  background-color: transparent;
  color: whitesmoke;
  font-family: inherit;
  ${p => p.LeftIcon && `padding-left: 1.25rem;`}
  ${p => p.RightIcon && `padding-right: 1.25rem;`}

  & ~ .textinput-icon-left {
    position: absolute;
    bottom: 0.35rem;
    left: 0;
    color: ${activeColor};
  }

  & ~ .textinput-icon-right {
    position: absolute;
    bottom: 0.35rem;
    right: 0;
    color: ${activeColor};
  }

  &::placeholder {
    color: ${placeholderColor};
  }

  &:focus {
    border-color: ${activeColor};
  }
`;

export interface TextInputProps extends ComponentPropsWithRef<'input'> {
  LeftIcon?: Icon;
  RightIcon?: Icon;
  fieldName?: string;
}

export const TextInput = (props: TextInputProps) => {
  const { LeftIcon, RightIcon, fieldName } = props;

  return (
    <LabelWrapper>
      <FieldName>{fieldName}</FieldName>
      <_Input {...props} type='text' />
      {LeftIcon && (
        <LeftIcon className='textinput-icon textinput-icon-left' size={16} />
      )}
      {RightIcon && (
        <RightIcon className='textinput-icon textinput-icon-right' size={16} />
      )}
    </LabelWrapper>
  );
};
