import os
import json
from graphql.core import graphql
from graphql.core.utils.introspection_query import introspection_query
from graphql.core.utils.schema_printer import print_schema


def update_schema(Schema):
    print('[~] Generating Schema Documents... ')

    result = graphql(Schema, introspection_query)
    if result.errors:
        print('[X] Error inspecting schema: ', result.errors)

    else:
        with open(os.path.join(os.path.dirname(__file__), '..', 'schema.json'), 'w') as fp:
            json.dump({'data': result.data}, fp, indent=2)

        print('[~] Wrote schema.json')

    with open(os.path.join(os.path.dirname(__file__), '..', 'schema.graphql'), 'w') as fp:
        fp.write(print_schema(Schema))

    print('[~] Wrote schema.graphql')

    print('[!] Done.')


if __name__ == '__main__':
    import sys
    sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
    from schema import Schema
    update_schema(Schema)
