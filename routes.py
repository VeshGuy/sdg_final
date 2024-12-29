from flask import request, jsonify
from app import app, db
from models import Volunteer, NGO, Project, VolunteerTest, NGOTest
from werkzeug.security import generate_password_hash, check_password_hash

@app.route('/volunteers', methods=['POST'])
def create_volunteer():
    data = request.get_json()
    new_volunteer = Volunteer(**data)
    db.session.add(new_volunteer)
    db.session.commit()
    return jsonify(new_volunteer.to_json()), 201

@app.route('/ngos', methods=['POST'])
def create_ngo():
    data = request.get_json()
    new_ngo = NGO(**data)
    db.session.add(new_ngo)
    db.session.commit()
    return jsonify(new_ngo.to_json()), 201

@app.route('/projects', methods=['POST'])
def create_project():
    data = request.get_json()
    new_project = Project(**data)
    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_json()), 201

@app.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project.to_json() for project in projects]), 200

@app.route('/volunteers/<int:id>', methods=['GET'])
def get_volunteer(id):
    volunteer = Volunteer.query.get_or_404(id)
    return jsonify(volunteer.to_json()), 200

@app.route('/ngos/<int:id>', methods=['GET'])
def get_ngo(id):
    ngo = NGO.query.get_or_404(id)
    return jsonify(ngo.to_json()), 200

@app.route('/projects/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    return jsonify(project.to_json()), 200

@app.route('/volunteers/<int:id>', methods=['PUT'])
def update_volunteer(id):
    data = request.get_json()
    volunteer = Volunteer.query.get_or_404(id)
    for key, value in data.items():
        setattr(volunteer, key, value)
    db.session.commit()
    return jsonify(volunteer.to_json()), 200

@app.route('/ngos/<int:id>', methods=['PUT'])
def update_ngo(id):
    data = request.get_json()
    ngo = NGO.query.get_or_404(id)
    for key, value in data.items():
        setattr(ngo, key, value)
    db.session.commit()
    return jsonify(ngo.to_json()), 200

@app.route('/projects/<int:id>', methods=['PUT'])
def update_project(id):
    data = request.get_json()
    project = Project.query.get_or_404(id)
    for key, value in data.items():
        setattr(project, key, value)
    db.session.commit()
    return jsonify(project.to_json()), 200

@app.route('/volunteers/<int:id>', methods=['DELETE'])
def delete_volunteer(id):
    volunteer = Volunteer.query.get_or_404(id)
    db.session.delete(volunteer)
    db.session.commit()
    return '', 204

@app.route('/ngos/<int:id>', methods=['DELETE'])
def delete_ngo(id):
    ngo = NGO.query.get_or_404(id)
    db.session.delete(ngo)
    db.session.commit()
    return '', 204

@app.route('/projects/<int:id>', methods=['DELETE'])
def delete_project(id):
    project = Project.query.get_or_404(id)
    db.session.delete(project)
    db.session.commit()
    return '', 204

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json()
    unique_id = data.get('unique_id')
    password = generate_password_hash(data.get('password'))
    role = data.get('role')

    try:
        if role == 'volunteer':
            new_user = VolunteerTest(unique_id=unique_id, password=password)
        else:
            new_user = NGOTest(unique_id=unique_id, password=password)

        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Signup successful', 'user': new_user.to_json()}), 201
    except Exception as e:
        app.logger.error(f"Error during signup: {e}")
        return jsonify({'message': 'Signup failed', 'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    unique_id = data.get('unique_id')
    password = data.get('password')
    role = data.get('role')

    if role == 'volunteer':
        user = VolunteerTest.query.filter_by(unique_id=unique_id).first()
    else:
        user = NGOTest.query.filter_by(unique_id=unique_id).first()

    if user and check_password_hash(user.password, password):
        return jsonify({'message': 'Login successful', 'user': user.to_json()}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/volunteer/stats', methods=['GET'])
def volunteer_stats():
    # Implement logic to fetch volunteer stats
    stats = {
        'projects_working': 5,
        'proposals_sent': 10,
        'activity_status': 'Active',
        'verification_status': 'Approved'
    }
    return jsonify(stats), 200

@app.route('/ngo/stats', methods=['GET'])
def ngo_stats():
    # Implement logic to fetch NGO stats
    stats = {
        'projects_posted': 3,
        'number_volunteers_taken': 15,
        'operational_status': 'Active',
        'verification_status': 'Approved'
    }
    return jsonify(stats), 200

@app.route('/api/volunteer/stats', methods=['GET'])
def get_volunteer_stats():
    stats = {
        'projects_working': 5,
        'projects_applied': 10,
    }
    return jsonify(stats), 200

@app.route('/api/volunteer/details', methods=['GET'])
def get_volunteer_details():
    volunteer = {
        'name': 'John Doe',
        'picture': 'https://via.placeholder.com/150',
        'details': 'Experienced volunteer with a passion for environmental projects.'
    }
    return jsonify(volunteer), 200

@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = [
        {
            'project_id': 1,
            'title': 'Clean Water Initiative',
            'location': 'Rural Communities',
            'volunteers': 10,
            'progress': 50,
            'skills': ['Water Management', 'Community Outreach'],
            'goals': ['Provide clean water', 'Educate community'],
            'updates': [{'date': '2023-01-01', 'content': 'Project started'}]
        },
        {
            'project_id': 2,
            'title': 'Education for All',
            'location': 'Underserved Areas',
            'volunteers': 5,
            'progress': 30,
            'skills': ['Teaching', 'Fundraising'],
            'goals': ['Support education', 'Build schools'],
            'updates': [{'date': '2023-02-01', 'content': 'Fundraising started'}]
        }
    ]
    return jsonify(projects), 200