import Relay from 'react-relay';

export default class EditWidgetMutation extends Relay.Mutation {
  static fragments = {
    widget: () => Relay.QL`fragment on Widget { id }`
  };

  getMutation() {
    return Relay.QL`mutation { editWidget }`
  }

  getVariables() {
    return {
      id: this.props.widget.id,
      name: this.props.name
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on EditWidgetPayload {
        widget { name }
      }
    `
  }

  getOptimisticResponse() {
    return {
      widget: {
        id: this.props.widget.id,
        name: this.props.name
      }
    };
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: { widget: this.props.widget.id }
      }
    ]
  }
}