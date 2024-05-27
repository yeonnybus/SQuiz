from flask import Blueprint

v1_bp = Blueprint('main', __name__, url_prefix='/api/v1')


@v1_bp.route('/')
def index():
    return "AI server.v1 is running ... "




