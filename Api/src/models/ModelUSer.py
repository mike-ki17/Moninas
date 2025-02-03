# from .entities.User import User



from werkzeug.security import generate_password_hash, check_password_hash




class ModelUser():

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    @classmethod
    def get_user_by_username(cls, username):
        return cls.query.filter_by(username = username).first()


    # @classmethod
    # def login(self, db, user):
    #     try:
    #         cursor = db.connection.cursor()
    #         sql = """SELECT id, username, password FROM user 
    #                 WHERE username = '{}'""".format(user.username)
    #         cursor.execute(sql)
    #         row = cursor.fetchone()
    #         if row != None:
    #             user = User(row[0], row[1], User.check_password(row[2], user.password))
    #             return user
    #         else:
    #             return None
    #     except Exception as ex:
    #         raise Exception(ex)

    # @classmethod
    # def get_by_id(self, db, id):
    #     try:
    #         cursor = db.connection.cursor()
    #         sql = "SELECT id, username, fullname FROM user WHERE id = {}".format(id)
    #         cursor.execute(sql)
    #         row = cursor.fetchone()
    #         if row != None:
    #             return User(row[0], row[1], None, row[2])
    #         else:
    #             return None
    #     except Exception as ex:
    #         raise Exception(ex)