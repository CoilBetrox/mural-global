from app.services.response_service import ResponseService
from app.services.topic_service import TopicService


def test_create_topic_strips_content(app):
    with app.app_context():
        topic = TopicService.create_topic("  tema con espacios  ")
        assert topic.id is not None
        assert topic.content == "tema con espacios"
        assert topic.likes == 0


def test_like_topic_increments_counter(app):
    with app.app_context():
        topic = TopicService.create_topic("tema para likes")

        updated_once = TopicService.like_topic(topic.id)
        first_like_count = updated_once.likes
        updated_twice = TopicService.like_topic(topic.id)
        second_like_count = updated_twice.likes

        assert first_like_count == 1
        assert second_like_count == 2


def test_create_response_returns_none_when_topic_not_found(app):
    with app.app_context():
        response = ResponseService.create_response(9999, "respuesta")
        assert response is None
