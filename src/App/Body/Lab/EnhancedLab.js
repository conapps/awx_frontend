import compose from 'recompose/compose.js';
import lifecycle from 'recompose/lifecycle.js';
import withProps from 'recompose/withProps.js';
import withHandlers from 'recompose/withHandlers.js';
import withLoadingHandlers from '../../../common/handlers/withLoadingHandlers.js';
import withLabState from '../../../common/handlers/withLabState.js';
import labs from '../../../modules/labs.js';
import emitter from '../../../modules/emitter.js';
import Lab from './Lab.js';

const EnhancedLab = compose(
  withProps(({ match }) => ({
    id: match.params.id
  })),
  withLoadingHandlers(),
  withLabState(),
  withHandlers({
    setLab: ({ setLoadingState, setLabState }) => lab => {
      setLoadingState();
      setLabState();
      console.log(lab);
      emitter.emit('header:update', `Laboratorios / ${lab.data.name}`);
    }
  }),
  lifecycle({
    componentDidMount() {
      const { id } = this.props;
      labs.get(id);
      /** Subscribe to events */
      emitter.on(`labs:${id}:get:start`, this.props.setLoadingState);
      emitter.on(`labs:${id}:get:end`, this.props.setLab);
      emitter.emit('header:update', `Laboratorios / ${id}`);
    },

    componentWillUnmount() {
      const id = this.props.match.id;

      emitter.off(`labs:${id}:get:start`, this.props.setLoadingState);
      emitter.off(`labs:${id}:get:end`, this.props.setLab);
    }
  })
)(Lab);

EnhancedLab.displayName = 'enhance(Lab)';

export default EnhancedLab;
