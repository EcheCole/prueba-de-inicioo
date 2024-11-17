from flask import Flask, render_template, request, redirect, url_for, session, flash  
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Clave secreta para manejar sesiones
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///task_manager.db'  # Ruta de la base de datos
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo de Usuario
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    tasks = db.relationship('Task', backref='owner', lazy=True)

# Modelo de Tarea
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Crear las tablas en la base de datos (ejecutar solo la primera vez)
with app.app_context():
    db.create_all()

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        
        if user and user.password == password:
            session['user_id'] = user.id
            session['username'] = user.username
            return redirect(url_for('home'))
        flash("Credenciales incorrectas, intenta de nuevo.", "error")
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        # Validaciones
        if User.query.filter_by(username=username).first():
            flash("El nombre de usuario ya está en uso.", "error")
        elif password != confirm_password:
            flash("Las contraseñas no coinciden.", "error")
        else:
            new_user = User(username=username, email=email, password=password)
            db.session.add(new_user)
            db.session.commit()
            flash("Cuenta creada con éxito. Inicia sesión.", "success")
            return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/home', methods=['GET', 'POST'])
def home():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    user = User.query.get(session['user_id'])
    
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        
        new_task = Task(title=title, description=description, user_id=user.id)
        db.session.add(new_task)
        db.session.commit()
    
    user_tasks = Task.query.filter_by(user_id=user.id).all()
    return render_template('home.html', username=user.username, tasks=user_tasks)

@app.route('/edit_task/<int:task_id>', methods=['GET', 'POST'])
def edit_task(task_id):
    if 'user_id' not in session:
        return redirect(url_for('login'))

    task = Task.query.get_or_404(task_id)
    
    if task.user_id != session['user_id']:
        return redirect(url_for('home'))

    if request.method == 'POST':
        task.title = request.form['title']
        task.description = request.form['description']
        db.session.commit()
        return redirect(url_for('home'))

    return render_template('edit_task.html', task=task)

@app.route('/delete_task/<int:task_id>', methods=['GET'])
def delete_task(task_id):
    if 'user_id' not in session:
        return redirect(url_for('login'))

    task = Task.query.get_or_404(task_id)
    
    if task.user_id != session['user_id']:
        return redirect(url_for('home'))

    db.session.delete(task)
    db.session.commit()
    return redirect(url_for('home'))

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/edit_profile', methods=['GET', 'POST'])
def edit_profile():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    user = User.query.get(session['user_id'])

    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']

        if User.query.filter_by(username=username).first() and username != user.username:
            flash("El nombre de usuario ya está en uso.", "error")
        else:
            user.username = username
            user.email = email
            db.session.commit()
            flash("Perfil actualizado con éxito.", "success")
            return redirect(url_for('home'))
    
    return render_template('edit_profile.html', user=user)

if __name__ == '__main__':
    app.run(debug=True)