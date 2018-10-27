import React, { Fragment } from 'react';
import { Pane, Button } from 'evergreen-ui';
import LabsTable from './LabsTable/LabsTable.js';
import LabSideSheet from './LabSideSheet/LabSideSheet.js';

class Labs extends React.Component {
  render() {
    const {
      labs,
      openSideSheet,
      isSideSheetShow,
      closeSideSheet,
      onSubmit
    } = this.props;
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default Labs;
