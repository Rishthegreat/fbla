import graphene
from pymongo import MongoClient
from bcrypt import hashpw, gensalt
from flask_jwt_extended import create_access_token

client = MongoClient("mongodb://localhost:27017/")
db = client["fbla"]


class User(graphene.ObjectType):
    _id = graphene.NonNull(graphene.String)
    email = graphene.NonNull(graphene.String)
    password = graphene.NonNull(graphene.String)
    firstName = graphene.NonNull(graphene.String)
    lastName = graphene.NonNull(graphene.String)


class UserType(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String(required=True)
    firstName = graphene.String(required=True)
    lastName = graphene.String(required=True)


class CreateUser(graphene.Mutation):
    class Arguments:
        userData = UserType(required=True)

    success = graphene.String()
    message = graphene.String()

    def mutate(self, info, userData):
        hashed_password = hashpw(userData['password'].encode('utf-8'), gensalt())
        userData['password'] = hashed_password.decode('utf-8')
        usersCollection = db["users"]
        if usersCollection.count_documents({"email": userData['email']}, limit=1) == 0:
            inserted_id = usersCollection.insert_one(userData).inserted_id
            userData['_id'] = str(inserted_id)
            return CreateUser(success=True, message=None)
        return CreateUser(success=False, message="Email Already Exists. Please Sign In")


class LoginUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    accessToken = graphene.String()
    user = graphene.Field(lambda: User)

    def mutate(self, info, email, password):
        usersCollection = db["users"]
        userData = usersCollection.find_one({"email": email})
        if userData and hashpw(password.encode('utf-8'), userData['password'].encode('utf-8')) == userData[
            'password'].encode('utf-8'):
            userData["_id"] = str(userData["_id"])
            accessToken = create_access_token(identity=userData['_id'])
            return LoginUser(accessToken=accessToken, user=User(**userData))
        return LoginUser(accessToken=None, user=None)


class Query(graphene.ObjectType):
    users = graphene.List(User)

    def resolve_users(self, info):
        usersCollection = db["users"]
        return list(usersCollection.find())


class Mutation(graphene.ObjectType):
    createUser = CreateUser.Field()
    loginUser = LoginUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
