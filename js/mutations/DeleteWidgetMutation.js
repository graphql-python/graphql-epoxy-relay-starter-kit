import Relay from 'react-relay';

export default class DeleteWidgetMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on User { id }`
  };

  getMutation() {
    return Relay.QL`mutation { deleteWidget }`
  }

  getVariables() {
    return {
      id: this.props.widget.id
    }
  }

  getOptimisticResponse() {
    return {
      'deletedWidgetId': this.props.widget.id,
      'viewer': {
        'id': this.props.viewer.id
      }
    }

  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeleteWidgetPayload {
        deletedWidgetId
        viewer { widgets }
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'viewer',
        parentID: this.props.viewer.id,
        connectionName: 'widgets',
        deletedIDFieldName: "deletedWidgetId"
      }
    ]
  }
}