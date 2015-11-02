import React from 'react';
import Relay from 'react-relay';
import AddWidgetMutation from '../mutations/AddWidgetMutation';
import DeleteWidgetMutation from '../mutations/DeleteWidgetMutation';
import EditWidgetMutation from '../mutations/EditWidgetMutation';

class App extends React.Component {
  render() {
    const { viewer } = this.props;

    return (
      <div>
        <h1>Welcome, {viewer.name}</h1>

        <h1>Recently Created Widgets:</h1>
        <ul>
          {viewer.widgets.edges.map(edge =>
              <li key={edge.node.id}>
                <button onClick={() => this.deleteWidget(edge.node)}>&times;</button>
                <a href='#' onClick={() => this.editWidget(edge.node)}>{edge.node.name}</a> ID: {edge.node.id})
                {this.props.relay.hasOptimisticUpdate(edge.node) ? '(optimistic updated)' : '(synced to server)'}
              </li>
          )}
        </ul>
        <h1>Add new widget</h1>

        <form onSubmit={this._handleSubmit}>
          <input
            placeholder="Widget name..."
            ref="newWidgetName"
            type="text"
            />
        </form>
      </div>
    );
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    Relay.Store.update(
      new AddWidgetMutation({
        viewer: this.props.viewer,
        name: this.refs.newWidgetName.value
      })
    );
    this.refs.newWidgetName.value = '';
  };

  deleteWidget(widget) {
    Relay.Store.update(
      new DeleteWidgetMutation({
        viewer: this.props.viewer,
        widget: widget
      })
    );
  }

  editWidget(widget) {
    const newName = prompt('new name?');
    if (newName)
      Relay.Store.update(
        new EditWidgetMutation({
          widget: widget,
          name: newName
        })
      );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        name
        widgets(last: 15) {
          edges {
            node {
              ${EditWidgetMutation.getFragment('widget')}
              id,
              name,
            },
          }
          pageInfo {
            hasPreviousPage
            hasNextPage
          }
        },
        ${AddWidgetMutation.getFragment('viewer')}
        ${DeleteWidgetMutation.getFragment('viewer')}
      }
    `
  }
});
