from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Volunteer(db.Model):
    __tablename__ = 'volunteers'
    volunteer_id = db.Column(db.Integer, primary_key=True)
    unique_id = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    expertise = db.Column(db.JSON, nullable=False)
    availability = db.Column(db.JSON, nullable=False)
    currently_working = db.Column(db.Boolean, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    field_of_interest = db.Column(db.String(100), nullable=False)
    past_experience = db.Column(db.Text, nullable=True)
    certifications = db.Column(db.JSON, nullable=True)
    verification_status = db.Column(db.Enum('Pending', 'Approved', 'Rejected'), nullable=False)
    projects_working = db.Column(db.JSON, nullable=True)
    proposals_sent = db.Column(db.JSON, nullable=True)
    activity_status = db.Column(db.Enum('Active', 'Inactive'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_json(self):
        return {
            "volunteer_id": self.volunteer_id,
            "unique_id": self.unique_id,
            "password": self.password,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "expertise": self.expertise,
            "availability": self.availability,
            "currently_working": self.currently_working,
            "location": self.location,
            "field_of_interest": self.field_of_interest,
            "past_experience": self.past_experience,
            "certifications": self.certifications,
            "verification_status": self.verification_status,
            "projects_working": self.projects_working,
            "proposals_sent": self.proposals_sent,
            "activity_status": self.activity_status,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

class NGO(db.Model):
    __tablename__ = 'ngos'
    ngo_id = db.Column(db.Integer, primary_key=True)
    unique_id = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    sector = db.Column(db.JSON, nullable=False)
    verification_documents = db.Column(db.JSON, nullable=False)
    activity_report = db.Column(db.JSON, nullable=True)
    verification_status = db.Column(db.Enum('Pending', 'Approved', 'Rejected'), nullable=False)
    operational_status = db.Column(db.Enum('Active', 'Inactive'), nullable=False)
    projects_posted = db.Column(db.JSON, nullable=True)
    number_volunteers_taken = db.Column(db.Integer, nullable=True)
    review = db.Column(db.Text, nullable=True)
    un_ecosoc = db.Column(db.Enum('YES', 'NO'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_json(self):
        return {
            "ngo_id": self.ngo_id,
            "unique_id": self.unique_id,
            "password": self.password,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "country": self.country,
            "state": self.state,
            "city": self.city,
            "address": self.address,
            "sector": self.sector,
            "verification_documents": self.verification_documents,
            "activity_report": self.activity_report,
            "verification_status": self.verification_status,
            "operational_status": self.operational_status,
            "projects_posted": self.projects_posted,
            "number_volunteers_taken": self.number_volunteers_taken,
            "review": self.review,
            "un_ecosoc": self.un_ecosoc,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

class Project(db.Model):
    __tablename__ = 'projects'
    project_id = db.Column(db.Integer, primary_key=True)
    ngo_id = db.Column(db.Integer, db.ForeignKey('ngos.ngo_id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    project_type = db.Column(db.Enum('Type1', 'Type2', 'Type3'), nullable=False)
    description = db.Column(db.Text, nullable=False)
    required_skills = db.Column(db.JSON, nullable=False)
    commitment_type = db.Column(db.Enum('Remote', 'Physical', 'Both'), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    safe_for_women = db.Column(db.Boolean, nullable=False)
    progress_parameters = db.Column(db.JSON, nullable=False)
    progress_updates = db.Column(db.JSON, nullable=True)
    volunteer_accepted = db.Column(db.JSON, nullable=True)
    volunteers_requests = db.Column(db.JSON, nullable=True)
    funding_requirements = db.Column(db.Numeric(15, 2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_json(self):
        return {
            "project_id": self.project_id,
            "ngo_id": self.ngo_id,
            "title": self.title,
            "project_type": self.project_type,
            "description": self.description,
            "required_skills": self.required_skills,
            "commitment_type": self.commitment_type,
            "country": self.country,
            "state": self.state,
            "city": self.city,
            "safe_for_women": self.safe_for_women,
            "progress_parameters": self.progress_parameters,
            "progress_updates": self.progress_updates,
            "volunteer_accepted": self.volunteer_accepted,
            "volunteers_requests": self.volunteers_requests,
            "funding_requirements": self.funding_requirements,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

class VolunteerTest(db.Model):
    __tablename__ = 'volunteer_test'
    id = db.Column(db.Integer, primary_key=True)
    unique_id = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_json(self):
        return {
            "id": self.id,
            "unique_id": self.unique_id,
            "password": self.password,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

class NGOTest(db.Model):
    __tablename__ = 'ngo_test'
    id = db.Column(db.Integer, primary_key=True)
    unique_id = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_json(self):
        return {
            "id": self.id,
            "unique_id": self.unique_id,
            "password": self.password,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    