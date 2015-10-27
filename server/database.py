from schema import User, Widget


def create_fixtures(db):
    db.add(User(id=1, name='Anonymous'))

    for id, name in enumerate(['What\'s-it', 'Who\'s-it', 'How\'s-it', 'Where\'s-it'], 1):
        db.add(Widget(id=id, name=name))
