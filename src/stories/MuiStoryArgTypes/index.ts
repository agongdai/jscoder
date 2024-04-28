import { InputType } from '@storybook/types';

const muiStoryArgTypes: Record<string, InputType> = {
  variant: {
    control: 'inline-radio',
    options: ['outlined', 'contained', 'text'],
    description: 'Style variants',
  },
  color: {
    control: 'inline-radio',
    options: ['primary', 'secondary'],
    description: 'Predefined colors',
  },
  size: {
    control: 'inline-radio',
    options: ['large', 'medium', 'small'],
    description: 'Predefined sizes',
  },
};

export default muiStoryArgTypes;
