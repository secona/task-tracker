import { ComponentPropsWithRef } from 'react';
import { Icon } from 'react-feather';
import styled from 'styled-components';

const inactiveColor = 'rgba(255, 255, 255, 0.16)';
const activeColor = '#ffffff';
const placeholderColor = 'rgba(255, 255, 255, 0.36)';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  padding: 0;

  & > .textinput-icon-left {
    position: absolute;
    bottom: 0.3rem;
    left: 0.25rem;
    color: ${activeColor};
  }

  & > .textinput-icon-right {
    position: absolute;
    bottom: 0.3rem;
    right: 0.25rem;
    color: ${activeColor};
  }
`;

const _Input = styled.input<{
  LeftIcon?: Icon;
  RightIcon?: Icon;
}>`
  border-width: 0 0 1px 0;
  border-color: ${inactiveColor};
  padding: 0.25rem;
  background-color: transparent;
  color: whitesmoke;
  ${p => p.LeftIcon && `padding-left: 1.5rem;`}
  ${p => p.RightIcon && `padding-right: 1.5rem;`}

  &::placeholder {
    color: ${placeholderColor};
    font-family: Poppins;
  }

  &:focus {
    outline: none;
    border-color: ${activeColor};
    ~ .textinput-icon {
      color: ${activeColor};
    }
  }
`;

export interface TextInputProps extends ComponentPropsWithRef<'input'> {
  LeftIcon?: Icon;
  RightIcon?: Icon;
}

export const TextInput = (props: TextInputProps) => {
  const { LeftIcon, RightIcon } = props;

  return (
    <Wrapper>
      <_Input {...props} type='text' />
      {LeftIcon && (
        <LeftIcon className='textinput-icon textinput-icon-left' size={16} />
      )}
      {RightIcon && (
        <RightIcon className='textinput-icon textinput-icon-right' size={16} />
      )}
    </Wrapper>
  );
};
