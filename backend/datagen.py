from faker import Faker

fake = Faker()

def create_user():
    return {
        "email": fake.email(),
        "password": fake.password(),
        "firstName": fake.first_name(),
        "lastName": fake.last_name()
    }

def create_profile():
    return {
        "school": {
            "name": fake.company()
        },
        "colleges": [
            {
                "name": fake.company()
            }
        ],
        "classes": [
            {
                "name": fake.company()
            }
        ],
        "tests": [
            {
                "name": fake.job(),
                "score": fake.random_int(0, 100)
            }
        ],
        "clubs": [
            {
                "name": fake.company(),
                "position": fake.job(),
                "description": fake.text()
            }
        ],
        "jobsInternships": [
            {
                "position": fake.job(),
                "company": fake.company(),
                "description": fake.text()
            }
        ],
        "communityServices": [
            {
                "position": fake.job(),
                "organization": fake.company(),
                "hours": fake.random_int(0, 100),
                "description": fake.text()
            }
        ],
        "awards": [
            {
                "name": fake.company(),
                "organization": fake.company(),
                "description": fake.text()
            }
        ],
        "activities": [
            {
                "name": fake.company(),
                "description": fake.text()
            }
        ]
    }

print(create_user())
print(create_profile())