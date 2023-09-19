import type { Meta, StoryObj } from '@storybook/react';

import {AddItemForm} from "../AddItemForm";

const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    addItem: { action: 'click' },
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {

};

