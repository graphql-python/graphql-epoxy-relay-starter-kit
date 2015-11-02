from schema import User, Widget

_widget_id = 0


def create_fixtures(db):
    db.add(User(id=1, name='Anonymous'))

    for name in ['What\'s-it', 'Who\'s-it', 'How\'s-it', 'Where\'s-it']:
        create_widget(db, name)


def create_widget(db, name):
    global _widget_id
    _widget_id += 1
    widget = Widget(id=_widget_id, name=name)
    db.add(widget)
    return widget
