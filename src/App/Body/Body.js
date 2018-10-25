import React from 'react';
import { Pane, Button } from 'evergreen-ui';
import LabTable from './LabTable/LabTable.js';
import LabSideSheet from './LabSideSheet/LabSideSheet.js';
export default Body;

function Body({ isSideSheetShow, openSideSheet, closeSideSheet }) {
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
        <LabSideSheet isShown={isSideSheetShow} close={closeSideSheet} />
      </Pane>
      <Pane display="flex" padding={16} width="100%">
        <LabTable />
      </Pane>
    </Pane>
  );
}
