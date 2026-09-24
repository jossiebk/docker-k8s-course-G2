import os

from pymongo import MongoClient
from pymongo.errors import PyMongoError


class ReviewService:

    def __init__(self):
        self.mongo_url = os.getenv("MONGO_URL")
        self.client = None
        self.collection = None

        if self.mongo_url:
            self.client = MongoClient(
                self.mongo_url,
                serverSelectionTimeoutMS=2000
            )

            database = self.client["virtual_library"]
            self.collection = database["reviews"]

    def is_database_available(self):
        if self.client is None:
            return False

        try:
            self.client.admin.command("ping")
            return True
        except PyMongoError:
            return False

    def get_all(self):
        if not self.is_database_available():
            raise ConnectionError(
                "MongoDB no está disponible."
            )

        return list(
            self.collection.find(
                {},
                {"_id": 0}
            )
        )

    def get_by_id(self, review_id):
        if not self.is_database_available():
            raise ConnectionError(
                "MongoDB no está disponible."
            )

        return self.collection.find_one(
            {"id": review_id},
            {"_id": 0}
        )

    def create(self, review_data):

        if not self.is_database_available():
            raise ConnectionError(
                "MongoDB no está disponible."
            )

        last_review = self.collection.find_one(
            sort=[("id", -1)]
        )

        next_id = (
            1
            if last_review is None
            else last_review["id"] + 1
        )

        review = {
            "id": next_id,
            "tituloLibro": review_data["tituloLibro"],
            "nombreUsuario": review_data["nombreUsuario"],
            "calificacion": review_data["calificacion"],
            "comentario": review_data["comentario"]
        }

        self.collection.insert_one(review)

        return self.collection.find_one(
            {"id": next_id},
            {"_id": 0}
        )