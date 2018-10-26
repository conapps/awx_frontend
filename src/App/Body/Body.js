import React from 'react';
import { Pane, Button } from 'evergreen-ui';
import LabsTable from './LabsTable/LabsTable.js';
import LabSideSheet from './LabSideSheet/LabSideSheet.js';
export default Body;

function Body({
  isSideSheetShow,
  openSideSheet,
  closeSideSheet,
  labs,
  onSubmit
}) {
  return (
    <Pane display="flex" padding={16} width="100%" flexDirection="column">
      <Pane display="flex" padding={16} width="100%">
        <Button
          marginRight={16}
          intent="success"
          iconBefore="plus"
          onClick={openSideSheet}
        >
          Nuevo Laboratorio
        </Button>
        <LabSideSheet
          isShown={isSideSheetShow}
          close={closeSideSheet}
          onSubmit={onSubmit}
        />
      </Pane>
      <Pane display="flex" padding={16} width="100%">
        <LabsTable labs={labs} />
      </Pane>
    </Pane>
  );
}
