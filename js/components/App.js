import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    const { viewer, relay } = this.props;

    return (
      <div>
        <h1>Welcome, {viewer.name}</h1>

        <h1>Widget list (current count: {relay.variables.count})</h1>
        <ul>
          {viewer.widgets.edges.map(edge =>
              <li key={edge.node.id}>{edge.node.name} (ID: {edge.node.id})</li>
          )}
        </ul>
        {viewer.widgets.pageInfo.hasNextPage && <button onClick={() => {
          relay.setVariables({
            count: relay.variables.count + 1
          })
        }}>Show me more</button>}
        {relay.variables.count > 1 && <button onClick={() => {
          relay.setVariables({
            count: Math.max(1, relay.variables.count - 1)
          })
        }}>Show me less
        </button>}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
    count: 1
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        name
        widgets(first: $count) {
          edges {
            node {
              id,
              name,
            },
          }
          pageInfo {
            hasPreviousPage
            hasNextPage
          }
        },
      }
    `,
  },
});
