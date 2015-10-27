from flask import Flask, request, abort, jsonify
from graphql.core import graphql as run_graphql
from schema import Schema, DataSource
from database import create_fixtures

create_fixtures(DataSource)
app = Flask(__name__)


@app.route('/graphql', methods=['POST'])
def graphql():
    data = request.get_json(force=True)
    query = data.get('query') or abort(400)
    variables = data.get('variables')

    result = run_graphql(Schema, request=query, args=variables)
    data = {'data': result.data}
    if result.errors:
        data['errors'] = result.errors

    return jsonify(**data)


if __name__ == '__main__':
    from scripts.update_schema import update_schema

    update_schema(Schema)
    app.run(port=8080, debug=True)
