import React, { Fragment } from 'react';
import { Pane, Button, Spinner, Paragraph } from 'evergreen-ui';
import LabsTable from './LabsTable/LabsTable.js';
import LabSideSheet from '../LabSideSheet/LabSideSheet.js';

class Labs extends React.Component {
  render() {
    const {
      labs,
      index,
      openSideSheet,
      isSideSheetOpen,
      closeSideSheet,
      onSubmit,
      loading
    } = this.props;
    return (
      <Fragment>
        <LabSideSheet
          isShown={isSideSheetOpen}
          close={closeSideSheet}
          onSubmit={onSubmit}
        />
        <Pane
          display="flex"
          justifyContent="space-between"
          padding={16}
          width="100%"
        >
          <Button onClick={index} isLoading={loading}>
            Actualizar
          </Button>
          <Button intent="success" iconBefore="plus" onClick={openSideSheet}>
            Nuevo Laboratorio
          </Button>
        </Pane>
        <Pane
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={16}
          width="100%"
        >
          {loading === true ? (
            <Spinner />
          ) : labs.length === 0 ? (
            <Paragraph>No se han encontrado laboratorios.</Paragraph>
          ) : (
            <LabsTable labs={labs} />
          )}
        </Pane>
      </Fragment>
    );
  }
}

export default Labs;
