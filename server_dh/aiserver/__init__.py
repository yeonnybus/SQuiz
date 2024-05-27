from flask import Flask


def create_app():
    app = Flask(__name__)

    from .views import main_views, quiz_views, summary_views
    main_views.v1_bp.register_blueprint(quiz_views.quiz_bp)  # /api/v1/quiz
    main_views.v1_bp.register_blueprint(summary_views.summary_bp)  # /api/v1/summary
    app.register_blueprint(main_views.v1_bp)

    return app
