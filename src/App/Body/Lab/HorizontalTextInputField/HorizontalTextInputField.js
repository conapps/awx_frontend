import React from 'react';
import { Pane, Paragraph, TextInput } from 'evergreen-ui';

export default HorizontalTextInputField;

function HorizontalTextInputField(props) {
  const { label, marginBottom, ...rest } = props;
  return (
    <Pane display="flex" alignItems="center" marginBottom={marginBottom}>
      <Paragraph flex={1}>{label}</Paragraph>
      <TextInput {...rest} flex={3} />
    </Pane>
  );
}
