import graphene


class User(graphene.ObjectType):
    class Profile(graphene.ObjectType):
        class School(graphene.ObjectType):
            name = graphene.String()

        class College(graphene.ObjectType):
            name = graphene.String()
            _id = graphene.String(name='_id')

        class _Class(graphene.ObjectType):
            name = graphene.String()
            _id = graphene.String(name='_id')

        class Test(graphene.ObjectType):
            name = graphene.String()
            score = graphene.String()
            _id = graphene.String(name='_id')

        class Club(graphene.ObjectType):
            name = graphene.String()
            position = graphene.String()
            description = graphene.String()
            _id = graphene.String(name='_id')

        class JobInternship(graphene.ObjectType):
            position = graphene.String()
            company = graphene.String()
            description = graphene.String()
            _id = graphene.String(name='_id')

        class CommunityService(graphene.ObjectType):
            position = graphene.String()
            organization = graphene.String()
            hours = graphene.Float()
            description = graphene.String()
            _id = graphene.String(name='_id')

        class Award(graphene.ObjectType):
            name = graphene.String()
            organization = graphene.String()
            description = graphene.String()
            _id = graphene.String(name='_id')

        class Activity(graphene.ObjectType):
            name = graphene.String()
            description = graphene.String()
            activityId = graphene.String()

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
    posts = graphene.List(graphene.String)
    likedPosts = graphene.List(graphene.String)


class UserInputType(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String(required=True)
    firstName = graphene.String(required=True)
    lastName = graphene.String(required=True)


class Post(graphene.ObjectType):
    _id = graphene.String(name='_id', required=True)
    owner = graphene.String(required=True)
    title = graphene.String(required=True)
    likes = graphene.Int()
    content = graphene.String(required=True)
    image = graphene.String()
    timestamp = graphene.DateTime(required=True)
    user = graphene.Field(User)


class PostInputType(graphene.InputObjectType):
    owner = graphene.String(required=True)
    title = graphene.String(required=True)
    content = graphene.String(required=True)
    image = graphene.String()
