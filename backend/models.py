import graphene
from pymongo import MongoClient
from bcrypt import hashpw, gensalt
from flask_jwt_extended import create_access_token, jwt_required
from bson.objectid import ObjectId

client = MongoClient("mongodb://localhost:27017/")
db = client["fbla"]


class User(graphene.ObjectType):
    class Profile(graphene.ObjectType):
        class School(graphene.ObjectType):
            name = graphene.String()

        class College(graphene.ObjectType):
            name = graphene.String()

        class _Class(graphene.ObjectType):
            name = graphene.String()

        class Test(graphene.ObjectType):
            name = graphene.String()
            score = graphene.Int()

        class Club(graphene.ObjectType):
            name = graphene.String()
            position = graphene.String()
            description = graphene.String()

        class JobInternship(graphene.ObjectType):
            position = graphene.String()
            company = graphene.String()
            description = graphene.String()

        class CommunityService(graphene.ObjectType):
            position = graphene.String()
            organization = graphene.String()
            hours = graphene.Float()
            description = graphene.String()

        class Award(graphene.ObjectType):
            name = graphene.String()
            organization = graphene.String()
            description = graphene.String()

        class Activity(graphene.ObjectType):
            name = graphene.String()
            description = graphene.String()

        school = graphene.Field(School)
        colleges = graphene.List(College)
        classes = graphene.List(_Class)
        tests = graphene.List(Test)
        clubs = graphene.List(Club)
        jobsInternships = graphene.List(JobInternship)
        communityServices = graphene.List(CommunityService)
        awards = graphene.List(Award)
        activities = graphene.List(Activity)

    _id = graphene.String(name='_id', required=True)  # graphene auto camcelcases everything so overrides it
    email = graphene.String(required=True)
    password = graphene.String(required=True)
    firstName = graphene.String(required=True)
    lastName = graphene.String(required=True)
    profile = graphene.Field(Profile)


class UserInputType(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String(required=True)
    firstName = graphene.String(required=True)
    lastName = graphene.String(required=True)


class CreateUser(graphene.Mutation):
    class Arguments:
        userData = UserInputType(required=True)

    success = graphene.String()
    message = graphene.String()

    def mutate(self, info, userData):
        hashed_password = hashpw(userData['password'].encode('utf-8'), gensalt())
        userData['password'] = hashed_password.decode('utf-8')
        usersCollection = db["users"]
        if usersCollection.count_documents({"email": userData['email']}, limit=1) == 0:
            newUser = User(**userData)
            usersCollection.insert_one(userData)
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


class UpdateProfile(graphene.Mutation):
    success = graphene.Boolean()
    message = graphene.String()
    class Arguments:
        _id = graphene.String(required=True, name='_id')
        section = graphene.String(required=True)
        changes = graphene.JSONString(required=True)

    def mutate(self, info, _id, section, changes):
        print(_id)
        print(section)
        print(changes)
        usersCollection = db["users"]
        usersCollection.update_one({"_id": ObjectId(_id)}, {"$set": {"profile.school": {"name": "newname", "newfiled": "dfdfdf"}}})
        return UpdateProfile(success=True, message=None)

class Query(graphene.ObjectType):
    users = graphene.List(User)
    user = graphene.Field(User, _id=graphene.String(name='_id', required=True))

    @jwt_required()
    def resolve_users(self, info):
        usersCollection = db["users"]
        return list(usersCollection.find())

    @jwt_required()
    def resolve_user(self, info, _id):
        usersCollection = db["users"]
        userData = usersCollection.find_one({"_id": ObjectId(_id)})
        if userData:
            return User(**userData)
        return None


class Mutation(graphene.ObjectType):
    createUser = CreateUser.Field()
    loginUser = LoginUser.Field()
    updateProfile = UpdateProfile.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
