from epoxy import TypeRegistry
from epoxy.contrib.relay import RelayMixin
from epoxy.contrib.relay.data_source.memory import InMemoryDataSource

DataSource = InMemoryDataSource()
R = TypeRegistry()
Relay = R.Mixin(RelayMixin, DataSource)


class User(R.Implements[Relay.Node]):
    """A person who uses our app."""
    name = R.String
    widgets = Relay.Connection('Widget', R.Widget, description="A person's collection of widgets.")


class Widget(R.Implements[Relay.Node]):
    """A shiny widget."""
    name = R.String(description="The name of the widget")


class Query(R.ObjectType):
    node = Relay.Node
    viewer = R.User

    def resolve_viewer(self, obj, args, info):
        return DataSource.fetch_node(User.T, 1, info)


Schema = R.Schema(R.Query)
