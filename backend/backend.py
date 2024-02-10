from datetime import timedelta
from flask import Flask
from flask_cors import CORS
import models as md
from flask_graphql import GraphQLView
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'yooo this app is so cool'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)


app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view("graphql", schema=md.schema, graphql=True)
)


if __name__ == "__main__":
    app.run(debug=True, port=5000, host='localhost')
