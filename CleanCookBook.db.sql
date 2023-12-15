BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Recipe_FP" (
	"ID"	INTEGER,
	"Rname"	TEXT,
	"image"	TEXT,
	"description"	TEXT,
	"allergy_tags"	TEXT,
	"Dp_Tags"	TEXT,
	"Ctime"	NUMERIC,
	"calories"	INTEGER,
	PRIMARY KEY("ID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Recipe_Np" (
	"Rname"	TEXT,
	"instruction"	TEXT,
	"ratings"	INTEGER,
	"review"	TEXT,
	"ingredients"	TEXT,
	"image"	TEXT,
	"description"	TEXT,
	"allergy_tags"	TEXT,
	"dp_tags"	TEXT,
	"tips_tricks"	TEXT,
	"Ninfo"	TEXT,
	"cTime"	NUMERIC,
	"calorie"	INTEGER,
	PRIMARY KEY("Rname")
);
CREATE TABLE IF NOT EXISTS "MealPlan_FP" (
	"ID"	INTEGER,
	"RName"	INTEGER,
	"Dp_tags"	INTEGER,
	"allergy_tags"	INTEGER,
	"description"	INTEGER,
	PRIMARY KEY("ID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "educational" (
	"ID"	INTEGER,
	"article"	TEXT,
	"description"	TEXT,
	"Funfact"	TEXT,
	"NutriFact"	TEXT,
	PRIMARY KEY("ID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "AboutMe" (
	"height"	INTEGER,
	"Weight"	INTEGER,
	"age"	INTEGER,
	"gender"	TEXT,
	"address"	TEXT,
	"allergy"	TEXT,
	"DP"	INTEGER,
	"BMI"	INTEGER,
	"UserID"	INTEGER,
	"cookingTime"	TEXT,
	"DietMethod"	TEXT,
	"DietaryPreferance"	TEXT,
	"HealthGoal"	TEXT,
	FOREIGN KEY("UserID") REFERENCES "User"("UserID")
);
CREATE TABLE IF NOT EXISTS "User" (
	"Username"	TEXT,
	"password"	TEXT,
	"email"	TEXT,
	"UserID"	INTEGER,
	"FName"	TEXT,
	"LName"	TEXT,
	"gender"	TEXT,
	"dob"	INTEGER,
	PRIMARY KEY("UserID" AUTOINCREMENT)
);
INSERT INTO "AboutMe" VALUES (1.3,54,10,'Female',NULL,'nuts',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "AboutMe" VALUES (120,100,NULL,NULL,NULL,'{"allergy":"prawn"}',NULL,NULL,27,'{"isFifteen":"Less than 15"}','{"dietMethod":"Vegetarian"}','{"dietaryPreference":"Vegan"}','{"healthGoal":"Diet and Nutrition"}');
INSERT INTO "AboutMe" VALUES (160,100,NULL,NULL,NULL,'{"allergy":"Seafood"}',NULL,39.0625,28,'{"isFifteen":"Less than 15"}','{"dietMethod":"Vegetarian"}','{"dietaryPreference":"Gluten-Free"}','{"healthGoal":"Weight Loss"}');
INSERT INTO "AboutMe" VALUES (170,60,NULL,NULL,NULL,'{"allergy":"plastic"}',NULL,20.7612456747405,29,'{"isFifteen":"Less than 15"}','{"dietMethod":"Vegetarian"}','{"dietaryPreference":"Dairy-Free"}','{"healthGoal":"Weight Loss"}');
INSERT INTO "AboutMe" VALUES (101,100,NULL,NULL,NULL,'{"allergy":"hi"}',NULL,98.0296049406921,30,'{"isFortyFive":"45 to 60 minutes"}','{"dietMethod":"Vegetarian"}','{"dietaryPreference":"Gluten-Free"}','{"healthGoal":"Overall Health"}');
INSERT INTO "AboutMe" VALUES ('','',NULL,NULL,NULL,'{}',NULL,NULL,31,'{}','{}','{}','{}');
INSERT INTO "User" VALUES ('User1','p124','p@gmail.com',0,'John','Mehta',NULL,NULL);
INSERT INTO "User" VALUES ('user2','q123','q@gmail.com',3,NULL,NULL,NULL,NULL);
INSERT INTO "User" VALUES ('j','j','j',27,'j','j',NULL,NULL);
INSERT INTO "User" VALUES ('j','j','j',28,'j','j',NULL,NULL);
INSERT INTO "User" VALUES ('j','j','j',29,'j','j',NULL,NULL);
INSERT INTO "User" VALUES ('j','j','j',30,'j','j',NULL,NULL);
INSERT INTO "User" VALUES ('','','',31,'','',NULL,NULL);
COMMIT;
