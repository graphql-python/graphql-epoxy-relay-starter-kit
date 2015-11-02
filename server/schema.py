from time import sleep
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
    node = Relay.NodeField
    viewer = R.User

    def resolve_viewer(self, obj, args, info):
        return DataSource.fetch_node(User.T, 1, info)


class AddWidget(Relay.Mutation):
    """Adds a widget with a specific name."""
    class Input:
        name = R.String

    class Output:
        new_widget = R.WidgetEdge
        viewer = R.User

    def execute(self, obj, input, info):
        from database import create_widget
        widget = create_widget(DataSource, input.name)
        return self.Output(
            new_widget=DataSource.get_edge(Relay, widget)
        )


class DeleteWidget(Relay.Mutation):
    """Deletes a widget by node_id."""
    class Input:
        id = R.ID

    class Output:
        deleted_widget_id = R.ID
        viewer = R.User

    def execute(self, obj, input, info):
        widget = Relay.fetch_node(input.id, info)
        DataSource.remove(widget)

        return self.Output(
            deleted_widget_id=Relay.node_id_for(widget),
            viewer=DataSource.fetch_node(User.T, 1, info)
        )


class EditWidget(Relay.Mutation):
    """Updates the name of node_id on widget."""
    class Input:
        id = R.ID
        name = R.String

    class Output:
        widget = R.Widget

    def execute(self, obj, input, info):
        widget = Relay.fetch_node(input.id, info)
        widget.name = input.name
        return self.Output(
            widget=widget
        )


Schema = R.Schema(R.Query, R.Mutations)
