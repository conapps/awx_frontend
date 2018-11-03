import React, { Fragment } from 'react';
import { Pane, Spinner, Tablist, Tab } from 'evergreen-ui';
import ParticipantLabHeading from './ParticipantLabHeading/EnhancedParticipantLabHeading.js';
import ParticipantInformation from './ParticipantInformation/EnhancedParticipantInformation.js';
import JobStdout from './JobStdout/EnhancedJobStdout.js';
import LabDiagram from './LabDiagram/EnhancedLabDiagram.js';
import PodUpDialog from '../PodUpDialog/EnhancedPodUpDialog.js';
import PodDownDialog from '../PodDownDialog/EnhancedPodDownDialog.js';

export default Participant;

/** Constants */
const TABS = ['Stdout', 'Diagrama'];

function Participant({ isReady, activeTab, onSelectTab }) {
  if (isReady === false)
    return (
      <Pane width="100%" display="flex" justifyContent="center">
        <Spinner />
      </Pane>
    );

  return (
    <Fragment>
      <PodUpDialog />
      <PodDownDialog />
      <ParticipantLabHeading />
      <Pane width="100%" display="flex">
        <ParticipantInformation />
        <Pane display="flex" flexDirection="column" paddingLeft={8}>
          <Tablist>
            {TABS.map((tab, i) => (
              <Tab
                marginLeft={i === 0 ? 0 : 4}
                key={tab}
                id={tab}
                onSelect={() => onSelectTab(tab)}
                isSelected={activeTab === tab}
              >
                {tab}
              </Tab>
            ))}
          </Tablist>
          {activeTab === 'Stdout' && <JobStdout />}
          {activeTab === 'Diagrama' && <LabDiagram />}
        </Pane>
      </Pane>
    </Fragment>
  );
}
