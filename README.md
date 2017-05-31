# Nodejs Login System with Passport

In this project I will be building a fully functional user authentication system with all main features, login,registration, password encryption, access control, etc.

# technologies used:
* Nodejs
* Express
* MongoDb
* PassportJs
* express-messages
* express-validator
* bcryptJs - for encryption
* Bootswatch - for UI


## Concepts learned
* Authentication Strategy:
  * a way to handle user authentication to system. PassportJs has over 300 strategies to implement, most common ones are localStartegy(authentication via username and password), and Facebook/Google authentication via Oauth.
* Serialization:
  * The process of converting and object into a stream of bytes in order to store the object or transmit it to memory, a database, or a file. Its main purpose is to save the state of an object in order to be able to recreate it when needed. the reverse process is called deserialization.
* ORM:
  * Object Relational Mapping/Mapper. An ORM use a SQL database driver to translate the object notation to relational notation. It maps between an Object Model and a Relational database.
* ODM:
  * Object Document Mapper/Mapping. An ODM maps between an Object Model and a Document database. It uses JSON or JSONB api to translate the object notation to Document notation.
* Flash messages:
  * It's a type of user data that is meant to be shown once and then destroyed. A flash message is a kind of temporary variable, more specifically, a temporary session for displaying error/warning/success... messages to the user. **connect-flash** is a common module for creating flash messages.
* Sanitization:
  * A process performed after form validation to make sure the input data doesn't contain code.
* Salt:
  * In cryptography, a **salt** is random data that is used as an additional input to a one-way function that hashes a password or passphrase. The primary function of **salts** is to defend against dictionary attacks or against its hashed equivalent, a pre-computed rainbow table attack.
