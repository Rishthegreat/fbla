import datetime

import bson.objectid
import graphene
from pymongo import MongoClient
from bcrypt import hashpw, gensalt
from flask_jwt_extended import create_access_token, jwt_required
from bson.objectid import ObjectId
from skeleton import Post, User, UserInputType, PostInputType, SearchObject, BugReport, BugReportInputType, CollegeView

import csv

client = MongoClient("mongodb://localhost:27017/")
db = client["fbla"]




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
            #userData['_id'] = bson.objectid.ObjectId()
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
    updatedValue = graphene.JSONString()

    class Arguments:
        _id = graphene.String(required=True, name='_id')
        section = graphene.String(required=True)
        changes = graphene.JSONString(required=True)
        subsectionId = graphene.String()

    def mutate(self, info, _id, section, changes, subsectionId):
        usersCollection = db["users"]
        if subsectionId != "null":
            newChanges = {}
            for key, value in changes.items():
                newChanges[f'profile.{section}.$.{key}'] = value
            usersCollection.update_one({"_id": ObjectId(_id), f'profile.{section}._id': ObjectId(subsectionId)}, {"$set": newChanges})
        else:
            if (section == 'school'):
                usersCollection.update_one({"_id": ObjectId(_id)}, {"$set": {f'profile.{section}': changes}})
            else:
                changes['_id'] = bson.objectid.ObjectId()
                usersCollection.update_one({"_id": ObjectId(_id)}, {"$push": {f'profile.{section}': changes}})
                updatedValue = usersCollection.find_one({"_id": ObjectId(_id)}, {f'profile.{section}': {"$elemMatch": {"_id": changes['_id']}}})
                print(updatedValue)
        return UpdateProfile(success=True, message=None)

class UpdateMultipleProfile(graphene.Mutation):
    success = graphene.Boolean()
    message = graphene.String()
    class Arguments:
        _id = graphene.String(required=True, name='_id')
        section = graphene.String(required=True)
        changes = graphene.JSONString(required=True)

    def mutate(self, info, _id, section, changes):
        if section != "school":
            for i in range(0, len(changes)):
                if '_id' in changes[i]:
                    changes[i]["_id"] = ObjectId(changes[i]["_id"])
                else:
                    changes[i]["_id"] = bson.objectid.ObjectId()
        usersCollection = db["users"]
        usersCollection.update_one({"_id": ObjectId(_id)}, {"$set": {f'profile.{section}': changes}})
        return UpdateMultipleProfile(success=True, message=None)

class DeleteSection(graphene.Mutation):
    success = graphene.Boolean()
    message = graphene.String()
    class Arguments:
        _id = graphene.String(name='_id', required=True)
        section = graphene.String(required=True)
        subsectionId = graphene.String()
    def mutate(self, info, _id, section, subsectionId):
        usersCollection = db["users"]
        if subsectionId != 'null':
            usersCollection.update_one({"_id": ObjectId(_id)}, {"$pull": {f'profile.{section}': {"_id": ObjectId(subsectionId)}}})
        else:
            usersCollection.update_one({"_id": ObjectId(_id)}, {"$unset": {f'profile.{section}': None}})
        return DeleteSection(success=True, message=None)

class CreatePost(graphene.Mutation):
    success = graphene.Boolean()
    message = graphene.String()

    class Arguments:
        postData = PostInputType()

    def mutate(self, info, postData):
        postData["timestamp"] = datetime.datetime.now()
        postData["_id"] = bson.objectid.ObjectId()
        postData["likes"] = 0
        postsCollection = db["posts"]
        postsCollection.insert_one(postData)
        return CreatePost(success=True, message=None)

class CreateBugReport(graphene.Mutation):
    success = graphene.Boolean()
    message = graphene.String()
    class Arguments:
        bugReportData = BugReportInputType()
    def mutate(self, info, bugReportData):
        bugReportData["_id"] = bson.objectid.ObjectId()
        bugReportData["timestamp"] = datetime.datetime.now()
        bugReportData["owner"] = ObjectId(bugReportData["owner"])
        bugReportsCollection = db["bugReports"]
        bugReportsCollection.insert_one(bugReportData)
        return CreateBugReport(success=True, message=None)

class Query(graphene.ObjectType):
    users = graphene.List(User)
    user = graphene.Field(User, _id=graphene.String(name='_id', required=True))
    posts = graphene.List(Post, _id=graphene.String(name='_id', required=True), page=graphene.Int(required=False, default_value=None))
    search = graphene.Field(SearchObject, _id=graphene.String(name='_id', required=True), searchTerm=graphene.String(required=False, default_value=None), filters=graphene.JSONString(required=False, default_value=None))
    collegeList = graphene.List(CollegeView, _id=graphene.String(name='_id', required=True))
    def resolve_users(self, info):
        usersCollection = db["users"]
        return list(usersCollection.find())

    def resolve_collegeList(self, info, _id):
        usersCollection = db["users"]
        userFound = usersCollection.find_one({"_id": ObjectId(_id)})
        target_sat_composite = None
        if userFound:
            if "profile" in userFound:
                profile = userFound["profile"]
                if "tests" in profile:
                    testScores = userFound["profile"]["tests"]
                    if testScores and len(testScores) > 0:
                        for test in testScores:
                            if test["name"].upper() == "SAT":
                                target_sat_composite = int(test["score"])
                                break
        matching_schools = []
        if target_sat_composite is None:
            return None
        with open('FBLA_Scores.csv', 'r', encoding='utf-8-sig') as file:
            reader = csv.DictReader(file)
            for row in reader:
                sat_composite = int(row['SAT Composite'])
                if sat_composite <= target_sat_composite:
                    rate = row['Acceptance Rate']
                    if rate[-1] == '%':
                        rate = rate[:-1]
                    rate = float(rate)
                    school = CollegeView(
                        name=row['School Name'],
                        website=row['URL'],
                        acceptanceRate=rate,
                    )
                    matching_schools.append(school)
                if len(matching_schools) >= 10:
                    break
        return matching_schools

    @jwt_required()
    def resolve_user(self, info, _id):
        usersCollection = db["users"]
        userData = usersCollection.find_one({"_id": ObjectId(_id)})
        if userData:
            return User(**userData)
        return None
    @jwt_required()
    def resolve_posts(self, info, _id, page=None):
        postsCollection = db["posts"]
        # for now, just returning all posts, but later need to return by sorting, page, etc
        postsToReturn = postsCollection.find()
        usersCollection = db["users"]
        if postsToReturn:
            posts_list = list(postsToReturn)
            for i in range(0, len(posts_list)):
                user = usersCollection.find_one({"_id": ObjectId(posts_list[i]["owner"])})
                posts_list[i]["user"] = User(**user)
            return posts_list
        else:
            return None

    def resolve_search(self, info, _id, searchTerm=None, filters=None):
        postsCollection = db["posts"]
        usersCollection = db["users"]
        if searchTerm:
            regex_pattern = f'.*{searchTerm}.*'
            posts = postsCollection.find({
                "$or": [
                    {"title": {"$regex": regex_pattern, "$options": "i"}}
                ]
            })
            users = usersCollection.find({
                "$or": [
                    {"firstName": {"$regex": regex_pattern, "$options": "i"}},
                    {"lastName": {"$regex": regex_pattern, "$options": "i"}},
                    {"profile.school.name": {"$regex": regex_pattern, "$options": "i"}}
                ]
            })
            postsToSearch = list(posts)
            for i in range(0, len(postsToSearch)):
                user = usersCollection.find_one({"_id": ObjectId(postsToSearch[i]["owner"])})
                postsToSearch[i]["user"] = User(**user)
            return SearchObject(posts=postsToSearch, users=users)
        return None


class Mutation(graphene.ObjectType):
    createUser = CreateUser.Field()
    loginUser = LoginUser.Field()
    updateProfile = UpdateProfile.Field()
    deleteSection = DeleteSection.Field()
    updateMultipleProfile = UpdateMultipleProfile.Field()
    createBugReport = CreateBugReport.Field()
    createPost = CreatePost.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
