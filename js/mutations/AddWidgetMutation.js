import Relay from 'react-relay';

export default class AddWidgetMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on User { id }`
  };

  getMutation() {
    return Relay.QL`mutation { addWidget }`
  }

  getVariables() {
    return {
      name: this.props.name
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddWidgetPayload {
        viewer { widgets }
        newWidget
      }
    `
  }

  getOptimisticResponse() {
    return {
      'viewer': {'id': this.props.viewer.id },
      'newWidget': {
        'node': {
          'name': this.props.name
        }
      }
    }

  }
  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'viewer',
        parentID: this.props.viewer.id,
        connectionName: 'widgets',
        edgeName: 'newWidget',
        rangeBehaviors: {
          '': 'append'
        }
      }
    ]
  }
}